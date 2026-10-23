import mongoose, { type InferSchemaType, type Model } from "mongoose";

const machineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    model: { type: String, trim: true, maxlength: 120, default: "" },
    /** "/api/media/<id>" for uploaded photos, or a "/img/..." path for bundled ones. Empty = no photo. */
    image: { type: String, trim: true, default: "" },
    alt: { type: String, trim: true, maxlength: 200, default: "" },
    order: { type: Number, default: 0, index: true },
    /** set on machines imported from the built-in list, so importing twice never duplicates */
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

export type MachineDoc = InferSchemaType<typeof machineSchema>;
export const Machine: Model<MachineDoc> =
  (mongoose.models.Machine as Model<MachineDoc> | undefined) ?? mongoose.model<MachineDoc>("Machine", machineSchema);
