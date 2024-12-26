import { Router } from "express";
import PriceCategoryRepositoryPrisma from "../../../../infrastructure/repository/PriceCategoryRepositoryPrisma";
import AdminCreatePriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminCreatePriceCategoryUseCase";
import AdminUpdatePriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminUpdatePriceCategoryUseCase";
import AdminDeletePriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminDeletePriceCategoryUseCase";
import AdminFindAllPriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminFindAllPriceCategoryUseCase";
import AdminPriceCategoryController from "../controllers/AdminPriceCategoryController";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

const priceCategoryRepository = new PriceCategoryRepositoryPrisma();
const adminCreatePriceCategoryUseCase = new AdminCreatePriceCategoryUseCase(priceCategoryRepository);
const adminUpdatePriceCategoryUseCase = new AdminUpdatePriceCategoryUseCase(priceCategoryRepository);
const adminDeletePriceCategoryUseCase = new AdminDeletePriceCategoryUseCase(priceCategoryRepository);
const adminFindAllPriceCategoryUseCase = new AdminFindAllPriceCategoryUseCase(priceCategoryRepository);

const adminPriceCategoryController = new AdminPriceCategoryController(
  adminCreatePriceCategoryUseCase,
  adminDeletePriceCategoryUseCase,
  adminFindAllPriceCategoryUseCase,
  adminUpdatePriceCategoryUseCase
);

router.post("/", adminMiddleware, async (req, res, next) => {
  await adminPriceCategoryController.create(req, res, next)
})
router.put("/:id", adminMiddleware, async (req, res, next) => {
  await adminPriceCategoryController.update(req, res, next)
})
router.delete("/:id", adminMiddleware, async (req, res, next) => {
  await adminPriceCategoryController.delete(req, res, next)
})
router.get("/", adminMiddleware, async (req, res, next) => {
  await adminPriceCategoryController.findAll(req, res, next)
})

export default router;