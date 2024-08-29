import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

class NoteValidator {
    public note_check = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
            Title: Joi.string().min(4).pattern(/^[A-Za-z]+$/),
            Description: Joi.string().min(8).pattern(/^\S+$/),
            color: Joi.string().min(4).pattern(/^[A-Za-z]+$/),
            isArchived: Joi.boolean(),
            isDeleted: Joi.boolean(),
            UserID: Joi.string().min(8).pattern(/^\S+$/)
        });
        const {error} = schema.validate(req.body);
        if(error){
            next(error);
        }
        next();
    };
}

export default NoteValidator;