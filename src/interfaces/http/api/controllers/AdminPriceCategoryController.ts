import AdminCreatePriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminCreatePriceCategoryUseCase";
import AdminDeletePriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminDeletePriceCategoryUseCase";
import AdminFindAllPriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminFindAllPriceCategoryUseCase";
import AdminUpdatePriceCategoryUseCase from "../../../../application/usecase/priceCategory/AdminUpdatePriceCategoryUseCase";
import { Request, Response, NextFunction } from "express";
import { priceCategorySchema } from "../validations/priceCategory/priceCategorySchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";


export default class AdminPriceCategoryController {

  constructor(
    private adminCreatePriceCategoryUseCase: AdminCreatePriceCategoryUseCase,
    private adminDeletePriceCategoryUseCase: AdminDeletePriceCategoryUseCase,
    private adminFindAllPriceCategoryUseCase: AdminFindAllPriceCategoryUseCase,
    private adminUpdatePriceCategoryUseCase: AdminUpdatePriceCategoryUseCase
  ) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = priceCategorySchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const id = `priceCategory-${nanoid(16)}`
      const createdPriceCategory = await this.adminCreatePriceCategoryUseCase.execute(id, req.body.name);
      return res.status(201).json({
        status: "success",
        message: "Price category created successfully",
        data: {
          createdPriceCategory
        }
      })
    } catch (error) {
      next(error)
    }

  }

  async update(req: Request, res: Response, next: Function) {
    try {
      const { id } = req.params
      if (!id) {
        throw new BadRequestError("Id value must be available")
      }
      const { error } = priceCategorySchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const updatedPriceCategory = await this.adminUpdatePriceCategoryUseCase.execute(id, req.body.name)
      return res.status(200).json({
        status: "success",
        message: "Price category updated successfully",
        data: {
          updatedPriceCategory
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
      await this.adminDeletePriceCategoryUseCase.execute(id)
      return res.status(200).json({
        status: "success",
        message: "Price category deleted successfully"
      })
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllPriceCategory = await this.adminFindAllPriceCategoryUseCase.execute()
      return res.status(200).json({
        status: "success",
        data: {
          findAllPriceCategory
        }
      })
    } catch (error) {
      next(error)
    }
  }
}