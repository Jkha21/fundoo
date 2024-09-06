import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import { ObjectId, Types } from "mongoose";
import mongoose from "mongoose";
import { Http } from "winston/lib/winston/transports";

class NoteValidator {
    public create_validate = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
            Title: Joi.string().min(4).pattern(/^[A-Za-z]+$/),
            Description: Joi.string().min(8).pattern(/^\S+$/),
            color: Joi.string().min(3).pattern(/^[A-Za-z]+$/),
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

    public validateIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid'); 
        }
        return value; 
      }).required()
    });
    const { error } = schema.validate({ id: req.params.id });
    if (error) {
      return res.status(400).send({ error: error.details[0].message }); 
    }
    next();
  };
  
    
    public update_validate = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
        Title: Joi.string().min(4).pattern(/^[A-Za-z]+$/),
        Description: Joi.string().min(8).pattern(/^\S+$/),
        color: Joi.string().min(3).pattern(/^[A-Za-z]+$/),
        isArchived: Joi.boolean(),
        isDeleted: Joi.boolean(),
        UserID: Joi.string().pattern(/^\S+$/)
    });
    const {error} = schema.validate(req.body);
    if(error){
        next(error);
    }
    next();
};

}

export default NoteValidator;