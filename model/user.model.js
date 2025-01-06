import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: { type: String, enum: ['user', 'admin', 'superuser'], default: 'user' }
});

export const User = mongoose.model('User', userSchema)