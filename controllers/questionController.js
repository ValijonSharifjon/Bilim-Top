import {Question} from "../model/question.model.js";

export const createQuestion = async (req, res) => {
    try {
        const {content} = req.body;

        const question = new Question({
            content,
            author: req.user._id,
            status: 'pending'
        });

        await question.save();
        res.status(201).json(question);
    } catch (error) {
        console.log("Error in createQuestion controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({status: 'pending'});
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error in getQuestions controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getQuestion = async (req, res) => {
    try {
        const {id} = req.params;
        const question = await Question.findById(id);

        res.status(200).json(question);
    } catch (error) {
        console.error("Error in getQuestion controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const patchQuestionStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const answeredQuestion = await Question.findByIdAndUpdate(
            id,
            {status},
            {new: true}
        );
        res.status(200).json(answeredQuestion);
    } catch (error) {
        console.error("Error in patchQuestionStatus controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}