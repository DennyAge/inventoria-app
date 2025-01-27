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
      throw Error("Only images type ");
    }
  },
});

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

const uploadHandler: RequestHandler = async (
  req: MulterRequest,
  res: Response,
) => {
  if (!req.files || req.files.length === 0) {
    res.status(400).json({ error: "No files uploaded" });
    return;
  }

  try {
    const fileUrls = await Promise.all(
      req.files.map(async (file) => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `uploads/${Date.now().toString()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      }),
    );

    res.status(200).json({
      message: "Files uploaded successfully",
      fileUrls,
    });
  } catch (error) {
    console.error("Error uploading files", error);
    res.status(500).json({ error: "Error uploading files" });
  }
};

router.post("/upload", upload.array("images", 4), uploadHandler);

export default router;
