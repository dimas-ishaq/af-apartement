import { Router } from "express";
import UserRegisterUseCase from "../../../../application/usecase/auth/user/UserRegisterUseCase";
import UserLoginUseCase from "../../../../application/usecase/auth/user/UserLoginUseCase";
import UserLogoutUseCase from "../../../../application/usecase/auth/user/UserLogoutUseCase";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import UserAuthController from "../controllers/UserAuthController";
import UserRepositoryPrisma from "../../../../infrastructure/repository/UserRepositoryPrisma";
import SessionRepositoryPrisma from "../../../../infrastructure/repository/SessionRepositoryPrisma";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import authMiddleware from "../middlewares/authMiddleware";
import ReqNewAccessTokenUseCase from "../../../../application/usecase/auth/ReqNewAccessTokenUseCase";
import UserSendConfirmationEmailUseCase from "../../../../application/usecase/auth/user/UserSendConfirmationEmailUseCase";
import UserUpdateConfirmationEmailUseCase from "../../../../application/usecase/auth/user/UserUpdateConfirmationEmailUseCase";
import UserSendResetPasswordUseCase from "../../../../application/usecase/auth/user/UserSendResetPasswordUseCase";
import ResetPasswordRepositoryPrisma from "../../../../infrastructure/repository/ResetPasswordRepositoryPrisma";
import VerifyResetPasswordUseCase from "../../../../application/usecase/auth/VerifyResetPasswordUseCase";
import UserUpdatePasswordUseCase from "../../../../application/usecase/auth/user/UserUpdatePasswordUseCase";


const router = Router();
const passwordHash = new PasswordHash();
const userRepository = new UserRepositoryPrisma();
const sessionRepository = new SessionRepositoryPrisma();
const tokenManager = new TokenManager();
const userResetPasswordRepository = new ResetPasswordRepositoryPrisma();
const reqNewAccessTokenUseCase = new ReqNewAccessTokenUseCase(tokenManager, sessionRepository);
const userSendConfirmationEmailUseCase = new UserSendConfirmationEmailUseCase();
const userUpdateConfirmationEmailUseCase = new UserUpdateConfirmationEmailUseCase(userRepository);
const userSendResetPasswordUseCase = new UserSendResetPasswordUseCase(userRepository, userResetPasswordRepository, tokenManager);
const verifyResetPasswordUseCase = new VerifyResetPasswordUseCase(userResetPasswordRepository, tokenManager);
const userUpdatePasswordUseCase = new UserUpdatePasswordUseCase(userRepository, passwordHash, userResetPasswordRepository);
const userRegisterUseCase = new UserRegisterUseCase(userRepository);
const userLoginUseCase = new UserLoginUseCase(userRepository, sessionRepository, passwordHash, tokenManager);
const userLogoutUseCase = new UserLogoutUseCase(sessionRepository);

const authController = new UserAuthController(
  userRegisterUseCase,
  userSendConfirmationEmailUseCase,
  userUpdateConfirmationEmailUseCase,
  userSendResetPasswordUseCase,
  userUpdatePasswordUseCase,
  userLoginUseCase,
  userLogoutUseCase,
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