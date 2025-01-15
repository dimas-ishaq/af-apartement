import AdminCreateBuildingUseCase from "../../../../application/usecase/building/AdminCreateBuildingUseCase";
import AdminUpdateBuildingUseCase from "../../../../application/usecase/building/AdminUpdateBuildingUseCase";
import AdminDeleteBuildingUseCase from "../../../../application/usecase/building/AdminDeleteBuildingUseCase";
import AdminFindAllBuildingUseCase from "../../../../application/usecase/building/AdminFindAllBuildingUseCase";
import { Request, Response, NextFunction } from "express";
import { buildingSchema,updateBuildingSchema } from "../../../../interfaces/http/api/validations/building/buildingSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";

export default class AdminBuildingController {
  constructor(
    private adminCreateBuildingUseCase: AdminCreateBuildingUseCase,
    private adminUpdateBuildingUseCase: AdminUpdateBuildingUseCase,
    private adminDeleteBuildingUseCase: AdminDeleteBuildingUseCase,
    private adminFindAllBuildingUseCase: AdminFindAllBuildingUseCase

  ) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = buildingSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `building-${nanoid(16)}`
      const createdBuilding = await this.adminCreateBuildingUseCase.execute(id, req.body);
      return res.status(201).json({
        status: "success",
        message: "Building created successfully",
        data: {
          buildingId: createdBuilding.id,
          categoryId: createdBuilding.categoryId,
          name: createdBuilding.name,
          createdAt: createdBuilding.createdAt,
          updatedAt: createdBuilding.updatedAt
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new BadRequestError("Id value must be available")
      }
      const {categoryId, name} = req.body;
      if(!categoryId && !name){
        throw new BadRequestError("Name or categoryId value must be available")
      }
      const { error } = updateBuildingSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message)
      }
      const updatedBuilding = await this.adminUpdateBuildingUseCase.execute(id, req.body.name, req.body.categoryId);
      return res.status(200).json({
        status: "success",
        message: "Building updated successfully",
        data: {
          updatedBuilding
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) {
        throw new BadRequestError("Id value must be available")
      }
      await this.adminDeleteBuildingUseCase.execute(id)
      return res.status(200).json({
        status: "success",
        message: "Building deleted successfully"
      })
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllBuilding = await this.adminFindAllBuildingUseCase.execute();
      const buildingMap = findAllBuilding?.map(building => {
        return {
          buildingId: building.id,
          categoryId: building.categoryId,
          name: building.name,
          createdAt: building.createdAt,
          updatedAt: building.updatedAt
        }
      })
      return res.status(200).json({
        status: "success",
        data: buildingMap
      })
    } catch (error) {
      next(error)
    }
  }
}