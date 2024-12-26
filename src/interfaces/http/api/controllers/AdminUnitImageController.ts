import AdminCreateUnitImageUseCase from "../../../../application/usecase/unitImage/AdminCreateUnitImageUseCase";
import AdminUpdateUnitImageUseCase from "../../../../application/usecase/unitImage/AdminUpdateUnitImageUseCase";
import AdminDeleteUnitImageUseCase from "../../../../application/usecase/unitImage/AdminDeleteUnitImageUseCase";
import AdminFindUnitImageByIdUnitUseCase from "../../../../application/usecase/unitImage/AdminFindUnitImageByIdUnitUseCase";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../../infrastructure/database/prisma";




export default class AdminUnitImageController {
  constructor(
    private
  ) { }
}