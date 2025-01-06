import {User} from "../model/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const {email, password, confirmPassword, role} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"})
        }

        if (password.length < 8) {
            return res.status(400).json({error: "Your password must be at least 8 characters"})
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            role
        })

        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                role: newUser.role
            })
        } else {
            res.status(400).json({error: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !password) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}