import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

// ===================== REGISTER CONTROLLER =====================
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validation
        if (!name) return res.send({ message: "Name is required" });
        if (!email) return res.send({ message: "Email is required" });
        if (!password) return res.send({ message: "Password is required" });
        if (!phone) return res.send({ message: "Phone is required" });
        if (!address) return res.send({ message: "Address is required" });
        if (!answer) return res.send({ message: "Answer is required" });

        // Check if user already exists
        const existinguser = await userModel.findOne({ email });
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered, please login",
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            answer,
            password: hashedPassword,
        }).save();

        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

// ===================== LOGIN CONTROLLER =====================
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }

        // Create token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

// ===================== FORGOT PASSWORD CONTROLLER =====================
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) return res.status(400).send({ message: "Email is required" });
        if (!answer) return res.status(400).send({ message: "Answer is required" });
        if (!newPassword) return res.status(400).send({ message: "New Password is required" });

        // Check user
        const user = await userModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            });
        }

        // Update password
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

// ===================== TEST CONTROLLER =====================
export const testController = (req, res) => {
    res.send("Protected Routes");
};
