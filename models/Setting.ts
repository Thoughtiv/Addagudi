import mongoose, { type InferSchemaType, type Model } from "mongoose";

/** Single document (key: "site") holding the contact details shown across the website. */
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    address: { type: String, trim: true, maxlength: 400, default: "" },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    mobile: { type: String, trim: true, maxlength: 40, default: "" },
    email: { type: String, trim: true, lowercase: true, maxlength: 200, default: "" },
  },
  { timestamps: true },
);

export type SettingDoc = InferSchemaType<typeof settingSchema>;
export const Setting: Model<SettingDoc> =
  (mongoose.models.Setting as Model<SettingDoc> | undefined) ?? mongoose.model<SettingDoc>("Setting", settingSchema);
