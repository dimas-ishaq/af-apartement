import { Router } from "express";
import CategoryRepositoryPrisma from "../../../../infrastructure/repository/CategoryRepositoryPrisma";
import AdminCreateCategoryUseCase from "../../../../application/usecase/category/AdminCreateCategoryUseCase";
import AdminUpdateCategoryUseCase from "../../../../application/usecase/category/AdminUpdateCategoryUseCase";
import AdminDeleteCategoryUseCase from "../../../../application/usecase/category/AdminDeleteCategoryUseCase";
import AdminFindAllCategoryUseCase from "../../../../application/usecase/category/AdminFindAllCategoryUseCase";
import AdminCategoryController from "../controllers/AdminCategoryController";
import adminMiddleware from "../middlewares/adminMiddleware";
import authMiddleware from "../middlewares/authMiddleware";


const router = Router();
const categoryRepository = new CategoryRepositoryPrisma();
const adminCreatePriceCategoryUseCase = new AdminCreateCategoryUseCase(categoryRepository);
const adminUpdateCategoryUseCase = new AdminUpdateCategoryUseCase(categoryRepository);
const adminDeleteCategoryUseCase = new AdminDeleteCategoryUseCase(categoryRepository);
const adminFindAllCategoryUseCase = new AdminFindAllCategoryUseCase(categoryRepository);
const adminCategoryController = new AdminCategoryController(
  adminCreatePriceCategoryUseCase,
  adminUpdateCategoryUseCase,
  adminDeleteCategoryUseCase,
  adminFindAllCategoryUseCase);

router.post("/", adminMiddleware, async (req, res, next) => {
  await adminCategoryController.create(req, res, next)
})

router.put("/:id", adminMiddleware, async (req, res, next) => {
  await adminCategoryController.update(req, res, next)
})

router.delete("/:id", adminMiddleware, async (req, res, next) => {
  await adminCategoryController.delete(req, res, next)
})

router.get("/", authMiddleware, async (req, res, next) => {
  await adminCategoryController.findAll(req, res, next)
})

export default router;