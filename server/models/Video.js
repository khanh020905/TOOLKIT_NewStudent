import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: {
    type: String,
    enum: ["citation", "paraphrase", "ai-usage", "plagiarism", "other"],
    default: "other",
  },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: String, default: "Admin" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", videoSchema);
