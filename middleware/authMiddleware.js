import jwt from "jsonwebtoken";
import {User} from "../model/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, 'G2xFFB0UJwo/OanYOUzciFKuZ0rzQAf1XAZXxV0X7vU=');

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in authMiddleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default authMiddleware;