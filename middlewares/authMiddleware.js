import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization?.split(" ")[1], process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);

    }

}

// admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id); // ✅ will now work
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        }
        next();
    } catch (error) {
        console.log("isAdmin ERROR:", error.message);
        res.status(500).send({
            success: false,
            message: "Server Error in Admin Middleware",
        });
    }
};
