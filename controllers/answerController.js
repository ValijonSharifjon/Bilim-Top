import {Answer} from "../model/answer.model.js";

export const createAnswer = async (req, res) => {
    try {
        const {content, questionId} = req.body;

        const answer = new Answer({
            content,
            question: questionId,
            author: req.user._id,
            status: 'pending'
        });

        await answer.save();
        res.status(201).json(answer);
    } catch (error) {
        console.log("Error in createAnswer controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getPendingAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({status: 'pending'});
        res.status(200).json(answers);
    } catch (error) {
        console.error("Error in getPendingAnswers controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getPendingAnswer = async (req, res) => {
    try {
        const {id} = req.params;
        const answer = await Answer.findById(id);

        res.status(200).json(answer);
    } catch (error) {
        console.error("Error in getPendingAnswer controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const patchAnswerStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const approvedAnswer = await Answer.findByIdAndUpdate(
            id,
            {status},
            {new: true}
        );
        res.status(200).json(approvedAnswer);
    } catch (error) {
        console.error("Error in patchAnswerStatus controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({status: 'approved'});
        res.status(200).json(answers);
    } catch (error) {
        console.error("Error in getAnswers controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getAnswer = async (req, res) => {
    try {
        const {id} = req.params;
        const answer = await Answer.findById(id);
        res.status(200).json(answer);
    } catch (error) {
        console.error("Error in getAnswers controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}