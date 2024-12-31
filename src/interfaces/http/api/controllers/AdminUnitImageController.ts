import AdminCreateUnitImageUseCase from "../../../../application/usecase/unitImage/AdminCreateUnitImageUseCase";
import AdminUpdateUnitImageUseCase from "../../../../application/usecase/unitImage/AdminUpdateUnitImageUseCase";
import AdminDeleteUnitImageUseCase from "../../../../application/usecase/unitImage/AdminDeleteUnitImageUseCase";
import AdminFindUnitImageByIdUnitUseCase from "../../../../application/usecase/unitImage/AdminFindUnitImageByIdUnitUseCase";
//import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";

export default class AdminUnitImageController {
  constructor(
    private adminCreateUnitImageUseCase: AdminCreateUnitImageUseCase,
    private adminUpdateUnitImageUseCase: AdminUpdateUnitImageUseCase,
    private adminDeleteUnitImageUseCase: AdminDeleteUnitImageUseCase,
    private adminFindUnitImageUseCase: AdminFindUnitImageByIdUnitUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
    const {id_unit, image} = req.body
    const id = `image-${nanoid(16)}`
    await this.adminCreateUnitImageUseCase.execute(id,{id_unit,image})
    return res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully'
    })

    } catch (error) {
      next(error)
    }
  }
  async update(req:Request, res:Response, next:NextFunction){
    try {
      const {id, id_unit, image} = req.body
      await this.adminUpdateUnitImageUseCase.execute(id,id_unit, image)
      return res.status(200).json({
        status: 'success',
        message: 'Image unit updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  async findByIdUnit(req:Request, res:Response, next:NextFunction){
    try {
      const {id_unit} = req.params
      const findImageByIdUnit =  await this.adminFindUnitImageUseCase.execute(id_unit);
      return res.status(200).json({
        status: 'success',
        data :{
          findImageByIdUnit
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req:Request, res:Response, next:NextFunction){
    try {
      const {id} = req.params;
      await this.adminDeleteUnitImageUseCase.execute(id);
      return res.status(200).json({
        status: 'success',
        message: 'Image unit deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
