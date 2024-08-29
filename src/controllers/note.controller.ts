import HttpStatus from 'http-status-codes';
import noteService from '../services/note.service';
import { Request, Response, NextFunction } from 'express';

class NoteController {
    public NoteService = new noteService();

    public create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const create_note = await this.NoteService.Add(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: create_note,
                message: 'Created the note'
                
            });
            next();
        }catch(error){
            next(error);
        }
    };

    public fetch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const fetch_note = await this.NoteService.Read(req.body);
            if(fetch_note){
                res.status(HttpStatus.CREATED).json({
                    code: HttpStatus.CREATED,
                    data: "",
                    message: 'Fetched the note'    
                });
            } else{
                res.status(HttpStatus.BAD_REQUEST).json({
                    code: HttpStatus.BAD_REQUEST,
                    data: "",
                    message: 'Note not found'    
                });
            }
            next();
        }catch(error){
            next(error);
        }
    };

    public update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const update_note = await this.NoteService.Update(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: update_note,
                message: 'Updated the note'
                
            });
            next();
        }catch(error){
            next(error);
        }
    };

    public delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const delete_note = await this.NoteService.delete(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: delete_note,
                message: 'Deleted the note'
                
            });
            next();
        }catch(error){
            next(error);
        }
    };

}

export default NoteController;