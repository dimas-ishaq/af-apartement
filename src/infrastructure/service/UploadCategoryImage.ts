import multer from "multer";
import * as path from "path";
import * as fs from "fs/promises";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../../domain/exceptions/BadRequestError";
import CategoryRepository from "../../domain/repository/CategoryRepository";

export default class UploadCategoryImage {
  private upload: multer.Multer;

  // Konstruktor menerima categoryRepository sebagai dependensi
  constructor(private categoryRepository: CategoryRepository) {
    // Direktori untuk menyimpan file
    const UPLOAD_DIR = path.join(__dirname, "../../public/uploads/category");

    // Konfigurasi Multer
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); // Menyimpan file di folder UPLOAD_DIR
      },
      filename: (req, file, cb) => {
        // Menambahkan timestamp agar nama file unik
        const categoryName = (req.body.name || "unknown-category").replace(
          /\s+/g,
          "-"
        );
        const uniqueName = `${categoryName}-${Date.now()}-${file.originalname.replace(
          /\s+/g,
          "-"
        )}`;
        cb(null, uniqueName);
      },
    });

    // Menyusun instance multer dengan storage dan limits
    this.upload = multer({
      storage,
      limits: {
        fileSize: 2 * 1024 * 1024, // Batas ukuran file 2 MB (dalam byte)
      },
    });
  }

  // Middleware untuk upload gambar kategori
  public uploadCategoryImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const uploadMiddleware = this.upload.single("image"); // Middleware Multer untuk satu file

    uploadMiddleware(req, res, async (err) => {
      if (err) {
        // Tangani error dari Multer
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_FILE_SIZE"
        ) {
          return next(new BadRequestError("File is too large, maximum 2 MB."));
        }
        return next(err);
      }

      try {
        const { name } = req.body; // Nama kategori yang dikirim dalam body request
        const file = req.file;

        if (!file) {
          throw new BadRequestError("No file uploaded");
        }

        if (!name) {
          throw new BadRequestError("Category name cannot be empty");
        }

        // Cek apakah nama kategori sudah ada di dalam repository
        const existingCategory = await this.categoryRepository.findByName(name);
        if (existingCategory) {
          throw new BadRequestError(
            `A category with the name ‘${name}’ already exists`
          );
        }

        // Buat URL untuk file
        const fileUrl = `/api/category/images/${file.filename}`;

        // Simpan URL file di body request agar dapat diteruskan ke controller
        req.body.image = fileUrl;

        console.log("File uploaded:", fileUrl);

        next();
      } catch (error) {
        if (req.file) {
          await fs.unlink(req.file.path);
        }
        next(error); // Pass error ke handler error
      }
    });
  };

  public updateCategoryImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const uploadMiddleware = this.upload.single("image"); // Middleware Multer untuk satu file

    uploadMiddleware(req, res, async (err) => {
      if (err) {
        // Tangani error dari Multer
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_FILE_SIZE"
        ) {
          return next(new BadRequestError("File is too large, maximum 2 MB."));
        }
        return next(err);
      }

      try {
        const { id } = req.params;
        const { name } = req.body; // Ambil ID dan nama kategori dari body
        const file = req.file;

        if (!id) {
          throw new BadRequestError("Category ID cannot be empty");
        }

        // Cek apakah kategori dengan ID yang diberikan ada
        const category = await this.categoryRepository.findById(id);
        if (!category) {
          throw new BadRequestError(`Category with ID '${id}' not found`);
        }

        // Cek apakah nama kategori dikirimkan, lalu update
        if (name) {
          category.name = name;
        }

        // Cek apakah file baru dikirimkan
        if (file) {
          const newFileUrl = `/api/category/images/${file.filename}`;

          // Hapus gambar lama jika ada
          if (category.image) {
            const oldFilePath = path.join(
              __dirname,
              "../../public/uploads/category",
              path.basename(category.image)
            );
            try {
              await fs.unlink(oldFilePath);
            } catch (e: any) {
              console.error("Error deleting old file:", e.message);
            }
          }

          // Update URL gambar baru
          req.body.image = newFileUrl;
          next();
        }
      } catch (error) {
        if (req.file) {
          await fs.unlink(req.file.path); // Hapus file baru jika ada error
        }
        next(error); // Pass error ke handler error
      }
    });
  };

  public deleteCategoryImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestError("Category ID cannot be empty");
      }
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new BadRequestError(`Category with ID '${id}' not found`);
      }
      if(category.image){
        const oldFilePath = path.join(
          __dirname,
          "../../public/uploads/category",
          path.basename(category.image)
        );
        try {
          await fs.unlink(oldFilePath);
          req.body.image = null;
          next();
        } catch (e: any) {
          console.error("Error deleting old file:", e.message);
        }
      }
    } catch (error) {
      next(error);
    }
  };
}
