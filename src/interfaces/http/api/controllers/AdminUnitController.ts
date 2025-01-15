
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { unitSchema, updateUnitSchema,findUnitByName } from "../validations/unit/unitSchema";
import { nanoid } from "nanoid";
import AdminCreateUnitUseCase from "../../../../application/usecase/unit/AdminCreateUnitUseCase";
import AdminUpdateUnitUseCase from "../../../../application/usecase/unit/AdminUpdateUnitUseCase";
import AdminDeleteUnitUseCase from "../../../../application/usecase/unit/AdminDeleteUnitUseCase";
import AdminFindAllUnitUseCase from "../../../../application/usecase/unit/AdminFindAllUnitUseCase";
import AdminFindUnitByBuildingNameUseCase from "../../../../application/usecase/unit/AdminFindUnitByBuildingNameUseCase";

export default class AdminUnitController {
  constructor(
    private adminCreateUnitUseCase: AdminCreateUnitUseCase,
    private adminUpdateUnitUseCase: AdminUpdateUnitUseCase,
    private adminDeleteUnitUseCase: AdminDeleteUnitUseCase,
    private adminFindAllUnitUseCase: AdminFindAllUnitUseCase,
    private adminFindUnitByBuildingNameUseCase: AdminFindUnitByBuildingNameUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = unitSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const id = `unit-${nanoid(16)}`;
      const createdUnit = await this.adminCreateUnitUseCase.execute(id, req.body);
      return res.status(201).json({
        status: "success",
        message: "Unit created successfully",
        data: {
          unitId: createdUnit.id,
          buildingId: createdUnit.buildingId,
          name: createdUnit.name,
          status: createdUnit.status,
          createdAt: createdUnit.createdAt,
          updatedAt: createdUnit.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Unit id is required");
      }
      const { error } = updateUnitSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const { buildingId, name, status } = req.body;

      if (!buildingId && !name && !status) {
        throw new BadRequestError(
          "buildingId, name or status value must be available"
        );
      }
      const updatedUnit = await this.adminUpdateUnitUseCase.execute(id, buildingId, name, status);
      return res.status(200).json({
        status: "success",
        message: "Unit updated successfully",
        data: {
          unitId: updatedUnit.id,
          buildingId: updatedUnit.buildingId,
          name: updatedUnit.name,
          status: updatedUnit.status,
          createdAt: updatedUnit.createdAt,
          updatedAt: updatedUnit.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      if(!id){
        throw new BadRequestError("Unit id is required")
      }
      await this.adminDeleteUnitUseCase.execute(id);
      return res.status(200).json({
        status: 'success',
        message: 'Unit deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const units = this.adminFindAllUnitUseCase.execute();
      return res.status(200).json({
        status: "success",
        message: "Units found successfully",
        data: units,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByBuildingName(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.query.name as string
      const {error} = findUnitByName.validate(req.query)
      if(error){
        throw new BadRequestError(error.message)
      }
      const unit = await this.adminFindUnitByBuildingNameUseCase.execute(name);
      return res.status(200).json({
        status: "success",
        message: "Unit found successfully",
        data: unit,
      });
    } catch (error) {
      next(error);
    }
  }
}
