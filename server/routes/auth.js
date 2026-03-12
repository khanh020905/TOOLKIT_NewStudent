import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "aitoolkit-secret-2024";

// Middleware to verify token
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Chưa đăng nhập." });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Token không hợp lệ." });
  }
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { studentId, name, email, password } = req.body;
    if (!studentId || !name || !email || !password) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin." });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Mật khẩu tối thiểu 6 ký tự." });
    }

    const existing = await User.findOne({ $or: [{ studentId }, { email }] });
    if (existing) {
      return res
        .status(409)
        .json({ error: "MSSV hoặc email đã được đăng ký." });
    }

    const user = await User.create({ studentId, name, email, password });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        studentId: user.studentId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = MSSV or email
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ error: "Vui lòng nhập MSSV/email và mật khẩu." });
    }

    const user = await User.findOne({
      $or: [{ studentId: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(401).json({ error: "Tài khoản không tồn tại." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Mật khẩu không đúng." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        studentId: user.studentId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// GET /api/auth/me — get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "Không tìm thấy user." });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server." });
  }
});

export default router;
