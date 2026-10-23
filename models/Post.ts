import mongoose, { type InferSchemaType, type Model } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 120 },
    excerpt: { type: String, trim: true, maxlength: 300, default: "" },
    /** Markdown */
    content: { type: String, required: true, maxlength: 60000 },
    coverImage: { type: String, trim: true, default: "" },
    coverAlt: { type: String, trim: true, maxlength: 200, default: "" },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

export type PostDoc = InferSchemaType<typeof postSchema>;
export const Post: Model<PostDoc> =
  (mongoose.models.Post as Model<PostDoc> | undefined) ?? mongoose.model<PostDoc>("Post", postSchema);
