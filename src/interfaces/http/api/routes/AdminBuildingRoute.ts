import { Router } from "express";
import AdminBuildingController from "../controllers/AdminBuildingController";
import BuildingRepositoryPrisma from "../../../../infrastructure/repository/BuildingRepositoryPrisma";
import AdminCreateBuildingUseCase from "../../../../application/usecase/building/AdminCreateBuildingUseCase";
import AdminUpdateBuildingUseCase from "../../../../application/usecase/building/AdminUpdateBuildingUseCase";
import AdminDeleteBuildingUseCase from "../../../../application/usecase/building/AdminDeleteBuildingUseCase";
import AdminFindAllBuildingUseCase from "../../../../application/usecase/building/AdminFindAllBuildingUseCase";
import CategoryRepositoryPrisma from "../../../../infrastructure/repository/CategoryRepositoryPrisma";
import adminMiddleware from "../middlewares/adminMiddleware";
import authMiddleware from "../middlewares/authMiddleware";


const router = Router();
const categoryRepository = new CategoryRepositoryPrisma();
const buildingRepository = new BuildingRepositoryPrisma();
const adminCreateBuildingUseCase = new AdminCreateBuildingUseCase(buildingRepository,categoryRepository);
const adminUpdateBuildingUseCase = new AdminUpdateBuildingUseCase(buildingRepository);
const adminDeleteBuildingUseCase = new AdminDeleteBuildingUseCase(buildingRepository);
const adminFindAllBuildingUseCase = new AdminFindAllBuildingUseCase(buildingRepository);
const adminBuildingController = new AdminBuildingController(
  adminCreateBuildingUseCase,
  adminUpdateBuildingUseCase,
  adminDeleteBuildingUseCase,
  adminFindAllBuildingUseCase
);

router.post("/", adminMiddleware, async (req, res, next) => {
  await adminBuildingController.create(req, res, next)
})
router.put("/:id", adminMiddleware, async (req, res, next) => {
  await adminBuildingController.update(req, res, next)
})
router.delete("/:id", adminMiddleware, async (req, res, next) => {
  await adminBuildingController.delete(req, res, next)
})

router.get("/", authMiddleware, async (req, res, next) => {
  await adminBuildingController.findAll(req, res, next)
})

export default router