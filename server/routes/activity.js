import express from "express";
import { authMiddleware } from "./auth.js";
import Activity from "../models/Activity.js";

const router = express.Router();

// POST /api/activity — log an activity (requires auth)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, details } = req.body;
    if (!type) return res.status(400).json({ error: "Thiếu loại hoạt động." });

    const activity = await Activity.create({
      userId: req.userId,
      type,
      details: details || "",
    });
    res.status(201).json({ success: true, id: activity._id });
  } catch (err) {
    console.error("Activity log error:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// GET /api/activity — get user's activity history (requires auth)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(activities);
  } catch (err) {
    console.error("Activity fetch error:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// GET /api/activity/stats — get activity summary (requires auth)
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId });
    const stats = {
      total: activities.length,
      plagiarism_check: activities.filter((a) => a.type === "plagiarism_check")
        .length,
      citation_generate: activities.filter(
        (a) => a.type === "citation_generate",
      ).length,
      survey_complete: activities.filter((a) => a.type === "survey_complete")
        .length,
      game_complete: activities.filter((a) => a.type === "game_complete")
        .length,
      checkin: activities.filter((a) => a.type === "checkin").length,
      quiz_complete: activities.filter((a) => a.type === "quiz_complete")
        .length,
      video_watch: activities.filter((a) => a.type === "video_watch").length,
      course_read: activities.filter((a) => a.type === "course_read").length,
    };
    res.json(stats);
  } catch (err) {
    console.error("Activity stats error:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

export default router;
