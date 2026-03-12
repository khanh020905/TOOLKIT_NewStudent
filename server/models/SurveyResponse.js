import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  answers: [
    {
      questionId: { type: Number, required: true },
      answer: { type: String, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("SurveyResponse", surveyResponseSchema);
