import mongoose, { type InferSchemaType, type Model } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 60 },
    /** scrypt$<salt hex>$<hash hex> */
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export type AdminDoc = InferSchemaType<typeof adminSchema>;
export const Admin: Model<AdminDoc> =
  (mongoose.models.Admin as Model<AdminDoc> | undefined) ?? mongoose.model<AdminDoc>("Admin", adminSchema);
