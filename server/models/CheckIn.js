import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  checkedInAt: { type: Date, default: Date.now },
});

export default mongoose.model("CheckIn", checkInSchema);
