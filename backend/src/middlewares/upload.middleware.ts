import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagen no válido. Use JPG, PNG o WEBP"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});
