import AdminCreatePriceUseCase from "../../../../application/usecase/price/AdminCreatePriceUseCase";
import AdminUpdatePriceUseCase from "../../../../application/usecase/price/AdminUpdatePriceUseCase";
import AdminDeletePriceUseCase from "../../../../application/usecase/price/AdminDeletePriceUseCase";
import AdminFindAllPriceUseCase from "../../../../application/usecase/price/AdminFindAllPriceUseCase";
import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { priceSchema, updatePriceSchema } from "../validations/price/priceSchema";


export default class AdminPriceController {
  constructor(
    private adminCreatePriceUseCase: AdminCreatePriceUseCase,
    private adminUpdatePriceUseCase: AdminUpdatePriceUseCase,
    private adminDeletePriceUseCase: AdminDeletePriceUseCase,
    private adminFindAllPriceUseCase: AdminFindAllPriceUseCase,
  ) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = priceSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `price-${nanoid(16)}`;
      const createdPrice = await this.adminCreatePriceUseCase.execute(id, req.body)
      return res.status(201).json({
        status: "success",
        message: "Price created successfully",
        data: {
          createdPrice
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Id value must be available")
      }
      if (!req.body.name && !req.body.price) {
        throw new BadRequestError("Name or price value must be available")
      }
      const { error } = updatePriceSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const updatedPrice = await this.adminUpdatePriceUseCase.execute(id, req.body.name, req.body.price)
      return res.status(200).json({
        status: "success",
        message: "Price updated successfully",
        data: {
          updatedPrice
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Id value must be available")
      }
      await this.adminDeletePriceUseCase.execute(id)
      return res.status(200).json({
        status: "success",
        message: "Price deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllPrice = await this.adminFindAllPriceUseCase.execute();
      return res.status(200).json({
        status: "success",
        data: {
          findAllPrice
        }
      })
    } catch (error) {
      next(error)
    }
  }
}