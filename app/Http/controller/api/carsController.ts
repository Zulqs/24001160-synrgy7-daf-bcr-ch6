import { Request, Response } from "express";
const CarService = require("../../../services/carsService");
const { uploadImageToCloudinary } = require("../../../config/cloudinary");

const respondCarsNotFound = (res: Response) => {
    return res.status(404).json({
        message: "Cars not found",
    });
}

export default {
    async listAllCars(_req: Request, res: Response) {
        try {
            const allCars = await CarService.findAll();
            return res.status(200).json({
                message: "Cars retrieved successfully",
                cars: allCars
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async fetchCarById(req: Request, res: Response) {
        try {
            const car = await CarService.findById(req.params.id);

            if (!car) {
                return respondCarsNotFound(res);
            }

            return res.status(200).json({
                message: "Car retrieved successfully",
                car
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async listAvailableCars(_req: Request, res: Response) {
        try {
            const availableCars = await CarService.availableCars();
            return res.status(200).json({
                message: "Available cars retrieved successfully",
                cars: availableCars
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async listDeletedCars(_req: Request, res: Response) {
        try {
            const deletedCars = await CarService.deletedCars();
            return res.status(200).json({
                message: "Deleted cars retrieved successfully",
                cars: deletedCars
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async addCar(req: Request, res: Response) {
        try {
            const {
                car_name,
                price,
                availability,
                start_rent,
                end_rent,
            } = req.body;

            if (!car_name || !price || !availability || !start_rent || !end_rent) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: 'No image uploaded'
                });
            }

            if (!req.user) {
                return res.status(400).json({
                    message: 'User not authenticated'
                });
            }

            const imageUpload = await uploadImageToCloudinary(req.file.buffer, req.file.mimetype, 'cars');

            const carData = {
                user_id: req.user.id,
                car_name,
                price,
                availability,
                start_rent,
                end_rent,
                img: imageUpload.secure_url,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const newCar = await CarService.createCar(carData);
            return res.status(201).json({
                message: "Car created successfully",
                car: newCar
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async modifyCar(req: Request, res: Response) {
        try {
            const {
                car_name,
                price,
                availability,
                start_rent,
                end_rent,
            } = req.body;

            if (!car_name || !price || !availability || !start_rent || !end_rent) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: 'No image uploaded'
                });
            }

            if (!req.user) {
                return res.status(400).json({
                    message: 'User not authenticated'
                });
            }

            const imageUpload = await uploadImageToCloudinary(req.file.buffer, req.file.mimetype, 'cars');

            const updatedCarData = {
                user_id: req.user.id,
                car_name,
                price,
                availability,
                start_rent,
                end_rent,
                img: imageUpload.secure_url,
                updatedAt: new Date()
            };

            const updatedCar = await CarService.updateCar(req.params.id, updatedCarData);
            const car = await CarService.findById(req.params.id);

            if (!updatedCar) {
                return respondCarsNotFound(res);
            }

            return res.status(200).json({
                message: "Car updated successfully",
                car
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async removeCar(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(400).json({
                    message: 'User not authenticated'
                });
            }

            const deletedCar = await CarService.deleteCar(req.params.id);

            if (!deletedCar) {
                return respondCarsNotFound(res);
            }

            return res.status(200).json({
                message: "Car deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    }
}
