
import { cn } from "@/lib/styles/utils";

describe("cn", () => {
	it("debe combinar clases correctamente", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("debe ignorar valores falsy", () => {
		expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
	});

	it("debe manejar objetos con claves verdaderas", () => {
		expect(cn({ foo: true, bar: false }, "baz")).toBe("foo baz");
	});

	it("debe fusionar clases de tailwind correctamente", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
	});

	it("debe retornar una cadena vacía si no hay clases", () => {
		expect(cn()).toBe("");
	});
});
