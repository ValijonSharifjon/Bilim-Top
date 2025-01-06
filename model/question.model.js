import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: { type: String, enum: ['pending', 'answered'], default: 'pending' }
})

export const Question = mongoose.model('Question', questionSchema);
