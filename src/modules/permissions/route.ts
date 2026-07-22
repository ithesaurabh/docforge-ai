import { Router } from "express";
import permissionController from "./controller.js";
import authorize from "../../middlewares/authorize.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, authorize("permission.read"), permissionController.getPermissions);

export default router;