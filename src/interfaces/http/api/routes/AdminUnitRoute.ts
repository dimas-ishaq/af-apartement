import { Router } from "express";
import AdminUnitController from "../controllers/AdminUnitController";
import AdminCreateUnitUseCase from "../../../../application/usecase/unit/AdminCreateUnitUseCase";
import AdminUpdateUnitUseCase from "../../../../application/usecase/unit/AdminUpdateUnitUseCase";
import AdminDeleteUnitUseCase from "../../../../application/usecase/unit/AdminDeleteUnitUseCase";
import AdminFindAllUnitUseCase from "../../../../application/usecase/unit/AdminFindAllUnitUseCase";
import AdminFindUnitByBuildingNameUseCase  from "../../../../application/usecase/unit/AdminFindUnitByBuildingNameUseCase";
import UnitRepositoryPrisma from "../../../../infrastructure/repository/UnitRepositoryPrisma";
import BuildingRepositoryPrisma from "../../../../infrastructure/repository/BuildingRepositoryPrisma";
import adminMiddleware from "../middlewares/adminMiddleware";
const router = Router();
const unitRepository = new UnitRepositoryPrisma();
const buildingRepository = new BuildingRepositoryPrisma();
const adminCreateUnitUseCase = new AdminCreateUnitUseCase(unitRepository, buildingRepository);
const adminUpdateUnitUseCase = new AdminUpdateUnitUseCase(unitRepository,buildingRepository);
const adminDeleteUnitUseCase = new AdminDeleteUnitUseCase(unitRepository);
const adminFindAllUnitUseCase = new AdminFindAllUnitUseCase(unitRepository);
const adminFindUnitByBuildingNameUseCase = new AdminFindUnitByBuildingNameUseCase(buildingRepository,unitRepository);
const adminUnitController = new AdminUnitController(
    adminCreateUnitUseCase,
    adminUpdateUnitUseCase,
    adminDeleteUnitUseCase,
    adminFindAllUnitUseCase,
    adminFindUnitByBuildingNameUseCase
)

router.post("/", adminMiddleware, async (req, res, next) => {
  await adminUnitController.create(req, res, next)
})
router.put("/:id", adminMiddleware, async (req, res, next) => {
  await adminUnitController.update(req, res, next)
})
router.delete("/:id", adminMiddleware, async (req, res, next) => {
  await adminUnitController.delete(req, res, next)
});

router.get("/", adminMiddleware, async (req, res, next) => {
  await adminUnitController.findAll(req, res, next)
})
router.get("/building/:name", adminMiddleware, async (req, res, next) => {
  await adminUnitController.findByBuildingName(req, res, next)
})

export default router