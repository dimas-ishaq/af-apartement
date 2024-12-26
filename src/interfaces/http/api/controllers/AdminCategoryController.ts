import AdminCreateCategoryUseCase from "../../../../application/usecase/category/AdminCreateCategoryUseCase";
import AdminUpdateCategoryUseCase from "../../../../application/usecase/category/AdminUpdateCategoryUseCase";
import AdminDeleteCategoryUseCase from "../../../../application/usecase/category/AdminDeleteCategoryUseCase";
import AdminFindAllCategoryUseCase from "../../../../application/usecase/category/AdminFindAllCategoryUseCase";
import { Request, Response, NextFunction } from "express";
import { categorySchema, updateCategorySchema } from "../validations/category/categorySchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { nanoid } from "nanoid";

export default class AdminCategoryController {

  constructor(
    private adminCreateCategoryUseCase: AdminCreateCategoryUseCase,
    private adminUpdateCategoryUseCase: AdminUpdateCategoryUseCase,
    private adminDeleteCategoryUseCase: AdminDeleteCategoryUseCase,
    private adminFindAllCategoryUseCase: AdminFindAllCategoryUseCase
  ) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = categorySchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `category-${nanoid(16)}`
      const createdCategory = await this.adminCreateCategoryUseCase.execute(id, req.body)
      return res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: {
          createdCategory
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
      const { name, image } = req.body;
      if (!name && !image) {
        throw new BadRequestError("Name or image fields must be filled in")
      }
      const { error } = updateCategorySchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message)
      }
      const updatedCategory = await this.adminUpdateCategoryUseCase.execute(id, req.body.name, req.body.image)
      return res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: {
          updatedCategory
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
      await this.adminDeleteCategoryUseCase.execute(id)
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllCategory = await this.adminFindAllCategoryUseCase.execute();
      return res.status(200).json({
        status: "success",
        data: {
          findAllCategory
        }
      })
    } catch (error) {
      next(error)
    }
  }
}