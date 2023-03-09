import mongoose, { model, Schema } from "mongoose";

const ShortenedUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  short_code: {
    type: String,
    required: true,
    unique: true,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  analytics: [
    {
      browser: String,
      location: String,
      language: String,
      visit_time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const ShortenedUrl = model("ShortenedUrl", ShortenedUrlSchema);
