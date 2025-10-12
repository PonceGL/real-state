/* eslint-disable @typescript-eslint/ban-ts-comment */
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import z from "zod";

const imageUrl = "https://ejemplo.com/imagen-de-propiedad.jpg";
const currentAltText = "foto de una sala";

const MODEL = "gpt-4o";

export const PROMPTS = {
  AIMEGES: {
    SYSTEM:
      "Eres un experto agente inmobiliario senior experto en marketing inmobiliario. Tu especialidad es optimizar los listados de propiedades para maximizar su atractivo y alcance. Tu tarea es revisar imágenes propuestas para publicaciones de propiedades. Clasifica cada imagen en una de las siguientes categorías: [mala, funcional, buena, excelente]. Proporciona una explicación concisa, entre 50 y 200 caracteres, que justifique tu clasificación. Si la imagen no recibe una clasificación positiva, ofrece consejos sobre cómo mejorarla. Utiliza el texto alternativo de la imagen para entender el contexto y asegúrate de comentar si el texto tiene sentido o no. Incluye siempre la clasificación de la imagen y un análisis del texto alternativo.",
    USER: `Analiza la siguiente imagen de una propiedad y su texto alternativo actual.
            
            Texto alternativo actual: "{##}"

            Tu tarea es:
            1. Evaluar la calidad de la imagen (iluminación, ángulo, composición) como si fueras a usarla para un listado premium.
            2. Dar feedback constructivo sobre la imagen.
            3. Analizar si el texto alternativo actual es efectivo para SEO y accesibilidad. Debe describir la escena de forma clara y atractiva.
            4. Si el texto actual es pobre o insuficiente, genera un texto alternativo nuevo y optimizado. Si es bueno, mejóralo aún más.
            
            Responde únicamente con el formato JSON solicitado.`,
  },
  DESC: {
    SYSTEM:
      "Eres un copywriter experto especializado en el sector inmobiliario. Tu misión es transformar datos de propiedades en descripciones que motivan a la acción. Usas un lenguaje vívido, destacas los beneficios clave y estructuras el texto para una lectura fácil y atractiva.",
    USER: `
      Basado en los siguientes datos de una propiedad, realiza dos tareas:
      1. Evalúa la "Descripción Actual del Usuario". Si está vacía, califícala como 'inexistente'.
      2. Crea una "Descripción Sugerida" completamente nueva y mejorada. Debe ser persuasiva, detallada y profesional. Utiliza los datos proporcionados para resaltar los puntos de venta únicos de la propiedad.

      {#pCtxt#}

      Descripción Actual del Usuario: "{#uDsc#}"

      Ahora, proporciona tu análisis y la nueva descripción en el formato JSON solicitado.
    `,
  },
};

export const realEstateImageAnalysisSchema = z.object({
  imageQuality: z
    .enum(["mala", "funcional", "buena", "excelente"])
    .describe(
      "La calificación objetiva de la calidad de la imagen (composición, iluminación, resolución)."
    ),
  imageFeedback: z
    .string()
    .describe(
      "Comentarios detallados sobre por qué la imagen recibió esa calificación y cómo podría mejorarse."
    ),
  altTextAnalysis: z.object({
    isSufficient: z
      .boolean()
      .describe(
        "Indica si el texto alternativo proporcionado es suficientemente descriptivo y funcional."
      ),
    feedback: z
      .string()
      .describe(
        "Explicación de por qué el texto alternativo es o no es suficiente."
      ),
  }),
  suggestedAltText: z
    .string()
    .describe(
      "El texto alternativo nuevo o mejorado. Debe ser descriptivo, conciso y optimizado para SEO y accesibilidad."
    ),
});

export const propertyDescriptionSchema = z.object({
  descriptionQuality: z
    .enum(["mala", "regular", "buena", "excelente", "inexistente"])
    .describe(
      "Calificación de la descripción proporcionada por el usuario. 'inexistente' si no se proveyó ninguna."
    ),
  feedback: z
    .string()
    .describe(
      "Comentarios constructivos sobre la descripción actual, explicando sus puntos débiles y fuertes."
    ),
  suggestedDescription: z.object({
    title: z
      .string()
      .describe(
        "Un título o encabezado atractivo y optimizado para SEO que reemplace al título actual si es necesario."
      ),
    body: z
      .string()
      .describe(
        "El cuerpo principal de la descripción, redactado de forma persuasiva y detallada, utilizando técnicas de copywriting inmobiliario."
      ),
    callToAction: z
      .string()
      .describe(
        'Una frase final o llamada a la acción para incentivar el contacto. Ejemplo: "¡Agenda una visita hoy mismo y enamórate de tu futuro hogar!"'
      ),
  }),
});

export async function analyzeImage() {
  const { object } = await generateObject({
    model: openai(MODEL),

    system: PROMPTS.AIMEGES.SYSTEM,

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: PROMPTS.AIMEGES.USER.replace("{##}", currentAltText),
          },
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],

    schema: realEstateImageAnalysisSchema,
  });

  return object;
}

// @ts-ignore
function formatPropertyDataForAI(propertyData, imageAltTexts = []): string {
  let context = `
        --- INICIO DE DATOS DE LA PROPIEDAD ---
        - Título Actual: ${propertyData.title}
        - Tipo de Propiedad: ${propertyData.propertyType}
        - Tipo de Transacción: ${propertyData.transactionType}
        - Precio: ${propertyData.price.value.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
        - Ubicación: ${propertyData.location.address}, ${
    propertyData.location.city
  }, ${propertyData.location.state}.
        - Superficie del Terreno: ${
          propertyData.plotSize || "No especificado"
        } m²
        - Superficie de Construcción: ${
          propertyData.constructionSqMeters || "No especificado"
        } m²
        - Recámaras: ${propertyData.bedrooms || "No especificado"}
        - Baños: ${propertyData.bathrooms || "No especificado"}
        - Estacionamiento: ${
          propertyData.garageSpaces || "No especificado"
        } espacios
        - Características: ${
          propertyData.features && propertyData.features.length > 0
            ? propertyData.features.join(", ")
            : "No especificadas"
        }
    `;

  if (
    propertyData.additionalFeatures &&
    propertyData.additionalFeatures.length > 0
  ) {
    context += `- Características Adicionales:\n`;
    // @ts-ignore
    propertyData.additionalFeatures.forEach((feat) => {
      context += `  - ${feat.key}: ${feat.value}\n`;
    });
  }

  if (imageAltTexts.length > 0) {
    context += `- Descripción de las imágenes (textos alternativos): ${imageAltTexts.join(
      "; "
    )}\n`;
  }

  context += `--- FIN DE DATOS DE LA PROPIEDAD ---\n`;
  return context;
}

export async function analyzeAndGenerateDescription(
  // @ts-ignore
  propertyData,
  imageAltTexts = []
) {
  const propertyContext = formatPropertyDataForAI(propertyData, imageAltTexts);
  const currentUserDescription = propertyData.description || "";

  const { object } = await generateObject({
    model: openai(MODEL),

    system: PROMPTS.DESC.SYSTEM,

    prompt: PROMPTS.DESC.USER.replace("{#pCtxt#}", propertyContext).replace(
      "{#uDsc#}",
      currentUserDescription
    ),

    schema: propertyDescriptionSchema,
  });

  return object;
}
