import express from "express";
import SurveyResponse from "../models/SurveyResponse.js";
import GameResult from "../models/GameResult.js";
import CheckIn from "../models/CheckIn.js";

const router = express.Router();

// POST /api/survey — save survey response
router.post("/survey", async (req, res) => {
  try {
    const { studentId, name, email, answers } = req.body;
    if (!studentId || !name || !email || !answers?.length) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc." });
    }
    const response = await SurveyResponse.create({
      studentId,
      name,
      email,
      answers,
    });
    res.status(201).json({ success: true, id: response._id });
  } catch (err) {
    console.error("Survey error:", err);
    res.status(500).json({ error: "Lỗi server khi lưu khảo sát." });
  }
});

// POST /api/game-result — save mini game result
router.post("/game-result", async (req, res) => {
  try {
    const { studentId, name, score, totalQuestions, timeTaken } = req.body;
    if (!studentId || !name || score == null || !totalQuestions) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc." });
    }
    const result = await GameResult.create({
      studentId,
      name,
      score,
      totalQuestions,
      timeTaken,
    });
    res.status(201).json({ success: true, id: result._id });
  } catch (err) {
    console.error("Game result error:", err);
    res.status(500).json({ error: "Lỗi server khi lưu kết quả game." });
  }
});

// POST /api/checkin — check-in (prevents duplicates)
router.post("/checkin", async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    if (!studentId || !name || !email) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc." });
    }

    // Check for existing check-in
    const existing = await CheckIn.findOne({ studentId });
    if (existing) {
      return res.status(409).json({
        error: "Bạn đã check-in rồi!",
        alreadyCheckedIn: true,
        checkedInAt: existing.checkedInAt,
      });
    }

    const checkin = await CheckIn.create({ studentId, name, email });
    res.status(201).json({ success: true, id: checkin._id });
  } catch (err) {
    console.error("Check-in error:", err);
    res.status(500).json({ error: "Lỗi server khi check-in." });
  }
});

// GET /api/stats — simple stats
router.get("/stats", async (_req, res) => {
  try {
    const [surveyCount, gameCount, checkinCount] = await Promise.all([
      SurveyResponse.countDocuments(),
      GameResult.countDocuments(),
      CheckIn.countDocuments(),
    ]);
    res.json({ surveyCount, gameCount, checkinCount });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

export default router;
