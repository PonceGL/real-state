import mongoose, { Document, Model, Types } from "mongoose";

import { IProperty } from "@/app/api/property/models/property.entity";

export interface IClient extends Document {
  email: string;
  name?: string;
  phone?: string;
  propertiesOfInterest?: Types.ObjectId[] | IProperty[];
  tags?: string[];
}

const ClientSchema = new mongoose.Schema<IClient>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    propertiesOfInterest: [
      {
        type: Types.ObjectId,
        ref: "Property",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
