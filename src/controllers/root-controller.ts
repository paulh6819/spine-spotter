import { Router } from "express";
import { processImageSSE } from "./process-image-handler.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//sanity check
router.get("/hello", (_req, res) => {
  res.json({ serverMessage: "hello world" });
});

router.post("/process-image", upload.single("image"));

//server side events
router.post("/process-image-stream", upload.single("image"), processImageSSE);

export default router;
