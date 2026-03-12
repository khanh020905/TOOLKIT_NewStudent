import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: [
      "plagiarism_check",
      "citation_generate",
      "survey_complete",
      "game_complete",
      "checkin",
      "quiz_complete",
      "video_watch",
      "course_read",
    ],
    required: true,
  },
  details: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", activitySchema);
