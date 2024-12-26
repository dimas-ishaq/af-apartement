import { Router } from "express";
import UserAuthRoute from "./UserAuthRoute";
import AdminAuthRoute from "./AdminAuthRoute";
import AdminBuildingRoute from "./AdminBuildingRoute";
import AdminCategoryRoute from "./AdminCategoryRoute";
import AdminPriceCategoryRoute from "./AdminPriceCategoryRoute";
import AdminPriceRoute from "./AdminPriceRoute";
const router = Router();

router.use("/auth", UserAuthRoute);
router.use("/auth/admin", AdminAuthRoute);
router.use("/building", AdminBuildingRoute);
router.use("/category", AdminCategoryRoute);
router.use("/priceCategory", AdminPriceCategoryRoute);
router.use("/price", AdminPriceRoute);


export default router