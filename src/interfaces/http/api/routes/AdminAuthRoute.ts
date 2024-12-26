
import { Router } from "express";
import AdminRepositoryPrisma from "../../../../infrastructure/repository/AdminRepositoryPrisma";
import SessionRepositoryPrisma from "../../../../infrastructure/repository/SessionRepositoryPrisma";
import ResetPasswordRepositoryPrisma from "../../../../infrastructure/repository/ResetPasswordRepositoryPrisma";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import AdminAuthController from "../controllers/AdminAuthController";
import AdminRegisterUseCase from "../../../../application/usecase/auth/admin/AdminRegisterUseCase";
import AdminLoginUseCase from "../../../../application/usecase/auth/admin/AdminLoginUseCase";
import AdminLogoutUseCase from "../../../../application/usecase/auth/admin/AdminLogoutUseCase";
import AdminSendResetPasswordUseCase from "../../../../application/usecase/auth/admin/AdminSendResetPasswordUseCase";
import AdminUpdatePasswordUseCase from "../../../../application/usecase/auth/admin/AdminUpdatePasswordUseCase";
import VerifyResetPasswordUseCase from "../../../../application/usecase/auth/VerifyResetPasswordUseCase";
import ReqNewAccessTokenUseCase from "../../../../application/usecase/auth/ReqNewAccessTokenUseCase";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import adminMiddleware from "../middlewares/adminMiddleware";












const router = Router();
const adminRepository = new AdminRepositoryPrisma();
const passwordHash = new PasswordHash();
const sessionRepository = new SessionRepositoryPrisma()
const tokenManager = new TokenManager();
const resetPasswordRepository = new ResetPasswordRepositoryPrisma();
const adminRegisterUseCase = new AdminRegisterUseCase(adminRepository);
const adminLoginUseCase = new AdminLoginUseCase(adminRepository, sessionRepository, passwordHash, tokenManager);
const adminLogoutUseCase = new AdminLogoutUseCase(sessionRepository);
const adminSendResetPasswordUseCase = new AdminSendResetPasswordUseCase(adminRepository, resetPasswordRepository, tokenManager);
const adminUpdatePasswordUseCase = new AdminUpdatePasswordUseCase(adminRepository, passwordHash);
const reqNewAccessTokenUseCase = new ReqNewAccessTokenUseCase(tokenManager, sessionRepository);
const verifyResetPasswordUseCase = new VerifyResetPasswordUseCase(resetPasswordRepository, tokenManager);


const adminAuthController = new AdminAuthController(
  adminRegisterUseCase,
  adminLoginUseCase,
  adminLogoutUseCase,
  adminSendResetPasswordUseCase,
  adminUpdatePasswordUseCase,
  reqNewAccessTokenUseCase,
  verifyResetPasswordUseCase,
  passwordHash
);



router.post("/register", async (req, res, next) => {
  await adminAuthController.register(req, res, next)
})

router.post("/login", async (req, res, next) => {
  await adminAuthController.login(req, res, next)
})

router.get("/logout", adminMiddleware, async (req, res, next) => {
  await adminAuthController.logout(req, res, next)
})

router.post("/refreshToken", async (req, res, next) => {
  await adminAuthController.requestAccessToken(req, res, next)
})

router.post("/resetPassword", async (req, res, next) => {
  await adminAuthController.requestResetPassword(req, res, next)
})

router.post("/verifyResetPassword", async (req, res, next) => {
  await adminAuthController.verifyResetPassword(req, res, next)
})

router.post("/updatePassword", async (req, res, next) => {
  await adminAuthController.updatePassword(req, res, next)
})


export default router;