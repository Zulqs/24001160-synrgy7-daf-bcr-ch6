import { Router } from "express";
import carImg from "../middlewares/multer";
import carsController from "../Http/controller/api/carsController";
import { Authenticate, restrictMember } from "../middlewares/authentication";

const router = Router();

router.get("/", Authenticate, restrictMember, carsController.listAllCars);
router.get("/available", Authenticate, restrictMember, carsController.listAvailableCars);
router.get("/deleted", Authenticate, restrictMember, carsController.listDeletedCars);
router.get("/:id", Authenticate, restrictMember, carsController.fetchCarById);
router.post("/create", Authenticate, restrictMember, carImg.single('img'), carsController.addCar);
router.put("/update/:id", Authenticate, restrictMember, carImg.single('img'), carsController.modifyCar);
router.delete("/delete/:id", Authenticate, restrictMember, carsController.removeCar);

export default router;