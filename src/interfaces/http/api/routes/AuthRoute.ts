import { Router } from "express";
import RegisterUseCase from "../../../../application/usecase/auth/user/RegisterUseCase";
import LoginUseCase from "../../../../application/usecase/auth/user/LoginUseCase";
import LogoutUseCase from "../../../../application/usecase/auth/user/LogoutUseCase";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import AuthController from "../controllers/AuthController";
import UserRepositoryPrisma from "../../../../infrastructure/repository/UserRepositoryPrisma";
import SessionRepositoryPrisma from "../../../../infrastructure/repository/SessionRepositoryPrisma";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import authMiddleware from "../middlewares/authMiddleware";
import ReqNewAccessTokenUseCase from "../../../../application/usecase/auth/user/ReqNewAccessTokenUseCase";
import SendConfirmationEmailUseCase from "../../../../application/usecase/auth/user/SendConfirmationEmailUseCase";
import UpdateConfirmationEmailUseCase from "../../../../application/usecase/auth/user/UpdateConfirmationEmailUseCase";
import SendResetPasswordUseCase from "../../../../application/usecase/auth/user/SendResetPasswordUseCase";
import ResetPasswordRepositoryPrisma from "../../../../infrastructure/repository/ResetPasswordRepositoryPrisma";
import VerifyResetPasswordUseCase from "../../../../application/usecase/auth/user/VerifyResetPasswordUseCase";
import UpdatePasswordUseCase from "../../../../application/usecase/auth/user/UpdatePasswordUseCase";


const router = Router();
const passwordHash = new PasswordHash();
const userRepository = new UserRepositoryPrisma();
const sessionRepository = new SessionRepositoryPrisma();
const tokenManager = new TokenManager();
const resetPasswordRepository = new ResetPasswordRepositoryPrisma();
const reqNewAccessTokenUseCase = new ReqNewAccessTokenUseCase(tokenManager);
const sendConfirmationEmailUseCase = new SendConfirmationEmailUseCase();
const updateConfirmationEmailUseCase = new UpdateConfirmationEmailUseCase(userRepository);
const sendResetPasswordUseCase = new SendResetPasswordUseCase(userRepository, resetPasswordRepository, tokenManager);
const verifyResetPasswordUseCase = new VerifyResetPasswordUseCase(resetPasswordRepository, tokenManager);
const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository, passwordHash);
const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository, sessionRepository, passwordHash, tokenManager);
const logoutUseCase = new LogoutUseCase(sessionRepository);

const authController = new AuthController(
  registerUseCase,
  sendConfirmationEmailUseCase,
  updateConfirmationEmailUseCase,
  sendResetPasswordUseCase,
  updatePasswordUseCase,
  loginUseCase,
  logoutUseCase,
  reqNewAccessTokenUseCase,
  verifyResetPasswordUseCase,
  passwordHash,
);

router.post("/register", async (req, res, next) => {
  await authController.register(req, res, next)
})

router.post("/login", async (req, res, next) => {
  await authController.login(req, res, next)
})

router.get("/logout", authMiddleware, async (req, res, next) => {
  await authController.logout(req, res, next)
})

router.post("/refreshToken", async (req, res, next) => {
  await authController.requestAccessToken(req, res, next)
})

router.get("/userConfirmation", async (req, res, next) => {
  await authController.userConfirmation(req, res, next)
})

router.post("/resetPassword", async (req, res, next) => {
  await authController.requestResetPassword(req, res, next)
})

router.post("/verifyResetPassword", async (req, res, next) => {
  await authController.verifyResetPassword(req, res, next)
})

router.post("/updatePassword", async (req, res, next) => {
  await authController.updatePassword(req, res, next)
})

export default router