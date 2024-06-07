import { Router } from "express";
import usersController from "../Http/controller/api/usersController";
import { Authenticate, restrictUsers } from "../middlewares/authentication";

const router = Router();

router.get("/", Authenticate, restrictUsers, usersController.fetchAllUsers);
router.get("/email", Authenticate, restrictUsers, usersController.fetchUserByEmail);
router.get("/:id", Authenticate, restrictUsers, usersController.fetchUserById);
router.post("/create", Authenticate, restrictUsers, usersController.addUser);
router.put("/update/:id", Authenticate, restrictUsers, usersController.updateUserDetails);
router.delete("/delete/:id", Authenticate, restrictUsers, usersController.removeUser);

export default router;