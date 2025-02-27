import express from "express";
import { generateVideoCallLink } from "../controllers/videoCallController.js"; // ✅ Correct import

const router = express.Router();

router.post("/generate-link", generateVideoCallLink);

export default router;
