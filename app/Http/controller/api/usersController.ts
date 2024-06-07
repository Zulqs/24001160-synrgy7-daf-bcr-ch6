import { Request, Response } from "express";
const UserService = require("../../../services/userService");
const { encryptPassword } = require("../../../utils/authUser");

const respondUserNotFound = (res: Response) => {
    return res.status(404).json({
        message: "User not found"
    });
}

export default {
    async fetchAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAll();
            return res.status(200).json({
                message: "Users retrieved successfully",
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error
            });
        }
    },

    async fetchUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getById(req.params.id);

            if (!user) {
                return respondUserNotFound(res);
            }

            return res.status(200).json({
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error
            });
        }
    },

    async fetchUserByEmail(req: Request, res: Response) {
        const email = req.query.email as string;

        try {
            const user = await UserService.getByEmail(email);

            if (!user) {
                return respondUserNotFound(res);
            }

            return res.status(200).json({
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error
            });
        }
    },

    async addUser(req: Request, res: Response) {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const existingUser = await UserService.getByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already in use"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const hashedPassword = await encryptPassword(password);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        try {
            const user = await UserService.create(newUser);
            return res.status(201).json({
                message: "User created successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error
            });
        }
    },

    async updateUserDetails(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const updatedUser = {
            name,
            email,
            password,
            updatedAt: new Date()
        };

        try {
            const user = await UserService.update(req.params.id, updatedUser);
            const userDetails = await UserService.getByEmail(email);

            if (!user) {
                return respondUserNotFound(res);
            }

            return res.status(200).json({
                message: "User updated successfully",
                data: userDetails
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error
            });
        }
    },

    async removeUser(req: Request, res: Response) {
        try {
            const user = await UserService.delete(req.params.id);

            if (!user) {
                return respondUserNotFound(res);
            }

            return res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error
            });
        }
    }
}
