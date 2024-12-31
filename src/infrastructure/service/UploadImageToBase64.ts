import multer from "multer";
import * as fs from "fs/promises";
import * as path from "path";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../../domain/exceptions/BadRequestError";
import AdminFindUnitImageByIdUnitUseCase from "../../application/usecase/unitImage/AdminFindUnitImageByIdUnitUseCase";

// Direktori default untuk menyimpan file sementara
const DEFAULT_UPLOAD_DIR = path.join(__dirname, "../../public/uploads");

// Konfigurasi multer untuk penyimpanan file sementara
const upload = multer({
  dest: DEFAULT_UPLOAD_DIR, // Menyimpan file sementara di folder uploads
});

export const uploadImageToBase64 = upload.single("file"); // Middleware untuk menerima 1 file dengan key 'file'

/**
 * Middleware untuk mengonversi gambar yang diunggah menjadi Base64
 * Setelah dikonversi, data Base64 disimpan di req.body.base64
 */
export const convertImageToBase64 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const {id_unit} = req.body;

    if (!file) {
     throw new BadRequestError ("No file uploaded");
    }

    if(!id_unit){
      throw new BadRequestError ("No file uploaded");
    }

    // Lokasi file sementara
    const tempFilePath = file.path;

    // Baca file sebagai buffer
    const fileBuffer = await fs.readFile(tempFilePath);

    // Konversi buffer menjadi Base64
    const base64String = fileBuffer.toString("base64");

    // Tambahkan Base64 ke body request agar bisa diteruskan ke controller
    req.body.image = base64String;
    req.body.id_unit = id_unit;

    // Hapus file sementara setelah konversi
    await fs.unlink(tempFilePath);

    next(); // Lanjutkan ke controller
  } catch (error) {
    next(error); // Pass error ke handler error
  }
};
