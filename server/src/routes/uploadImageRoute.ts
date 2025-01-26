import { Router, Request, Response, RequestHandler } from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Error file uploading type"));
    }
  },
});

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const uploadHandler: RequestHandler = async (
  req: MulterRequest,
  res: Response,
) => {
  if (!req.file) {
    res.status(400).json({ error: "Error File upload" });
    return;
  }
  const file = req.file;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `uploads/${Date.now().toString()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    res.status(200).json({
      message: "Upload successfully",
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
    });
  } catch (error) {
    console.error("Error File upload", error);
    res.status(500).json({ error: "Error File upload" });
  }
};

router.post("/upload", upload.single("image"), uploadHandler);

export default router;
