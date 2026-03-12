import mongoose from "mongoose";

const gameResultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number, required: true }, // in seconds
  completedAt: { type: Date, default: Date.now },
});

export default mongoose.model("GameResult", gameResultSchema);
