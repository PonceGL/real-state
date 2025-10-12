import mongoose, { Model } from "mongoose";

import { IProperty, Property } from "@/app/api/property/models/property.entity";

export interface IOtherProperty extends IProperty {
  additionalFeatures?: {
    key: string;
    value: string;
  }[];
  features: string[];
  frontageMeters?: number;
  depthMeters?: number;
  topography?: "plano" | "ascendente" | "descendente" | "irregular";
  hasServices?: boolean;
  plotSize?: number;
}

const otherSchema = new mongoose.Schema<IOtherProperty>({
  additionalFeatures: [
    {
      _id: false,
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  features: [{ type: String }],
  frontageMeters: { type: Number },
  depthMeters: { type: Number },
  topography: {
    type: String,
    enum: ["plano", "ascendente", "descendente", "irregular"],
  },
  hasServices: { type: Boolean },
  plotSize: { type: Number },
});

export const OtherProperty: Model<IOtherProperty> =
  Property.discriminators?.Other ||
  Property.discriminator<IOtherProperty>("Other", otherSchema);
