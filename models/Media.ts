import mongoose, { type InferSchemaType, type Model } from "mongoose";

/** Uploaded images are stored here (already resized/re-encoded) and served from /api/media/<id>. */
const mediaSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    width: Number,
    height: Number,
    size: Number,
    filename: { type: String, default: "" },
  },
  { timestamps: true },
);

export type MediaDoc = InferSchemaType<typeof mediaSchema>;
export const Media: Model<MediaDoc> =
  (mongoose.models.Media as Model<MediaDoc> | undefined) ?? mongoose.model<MediaDoc>("Media", mediaSchema);
