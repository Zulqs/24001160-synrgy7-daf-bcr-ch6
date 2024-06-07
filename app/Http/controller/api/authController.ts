import { Request, Response } from "express";
const UserService = require("../../../services/userService");
const { hashPassword, comparePassword, generateToken } = require("../../../utils/authUser");

export default {
    async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields must be provided"
            });
        }

        const existingUser = await UserService.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters"
            });
        }

        const encryptedPassword = await hashPassword(password);

        const newUser = {
            name, 
            email,
            password: encryptedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        try {
            const createdUser = await UserService.createUser(newUser);
            return res.status(201).json({
                message: "User created successfully",
                user: createdUser
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Retrieve user by email
            const user = await UserService.findByEmail(email);

            // Check if user exists
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Validate password
            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            const authToken = await generateToken({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });

            res.status(200).json({
                id: user.id,
                email: user.email,
                token: authToken,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    },

    async getProfile(req: Request, res: Response) {
        try {
            return res.status(200).json(req.user);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    }
}
