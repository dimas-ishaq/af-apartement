import { Router } from "express";
import PriceRepositoryPrisma from "../../../../infrastructure/repository/PriceRepositoryPrisma";
import AdminPriceController from "../controllers/AdminPriceController";
import AdminCreatePriceUseCase from "../../../../application/usecase/price/AdminCreatePriceUseCase";
import AdminUpdatePriceUseCase from "../../../../application/usecase/price/AdminUpdatePriceUseCase";
import AdminDeletePriceUseCase from "../../../../application/usecase/price/AdminDeletePriceUseCase";
import AdminFindAllPriceUseCase from "../../../../application/usecase/price/AdminFindAllPriceUseCase";
import adminMiddleware from "../middlewares/adminMiddleware";
import authMiddleware from "../middlewares/authMiddleware";


const router = Router();
const priceRepository = new PriceRepositoryPrisma();
const adminCreatePriceUseCase = new AdminCreatePriceUseCase(priceRepository);
const adminUpdatePriceUseCase = new AdminUpdatePriceUseCase(priceRepository);
const adminDeletePriceUseCase = new AdminDeletePriceUseCase(priceRepository);
const adminFindAllPriceUseCase = new AdminFindAllPriceUseCase(priceRepository);
const adminPriceController = new AdminPriceController(
  adminCreatePriceUseCase,
  adminUpdatePriceUseCase,
  adminDeletePriceUseCase,
  adminFindAllPriceUseCase
);

router.post("/", adminMiddleware, async (req, res, next) => {
  await adminPriceController.create(req, res, next)
})
router.put("/:id", adminMiddleware, async (req, res, next) => {
  await adminPriceController.update(req, res, next)
})
router.delete("/:id", adminMiddleware, async (req, res, next) => {
  await adminPriceController.delete(req, res, next)
})
router.get("/", authMiddleware, async (req, res, next) => {
  await adminPriceController.findAll(req, res, next)
});

export default router;