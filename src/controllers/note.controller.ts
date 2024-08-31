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
                data: res.locals.token,
                message: 'Created the note'
            });
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
            console.log(fetch_note);
            if(fetch_note){
                res.status(HttpStatus.CREATED).json({
                    code: HttpStatus.CREATED,
                    data: req.body,
                    message: 'Fetched the note'    
                });
            } else{
                res.status(HttpStatus.BAD_REQUEST).json({
                    code: HttpStatus.BAD_REQUEST,
                    data: "",
                    message: 'Note not found'    
                });
            }
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
            if(delete_note){
                res.status(HttpStatus.CREATED).json({
                    code: HttpStatus.CREATED,
                    data: delete_note,
                    message: 'Deleted the note'
                });
            } else{
                res.status(HttpStatus.BAD_REQUEST).json({
                    code: HttpStatus.BAD_REQUEST,
                    data: "",
                    message: 'Deletion failed'
                });
            }
        }catch(error){
            next(error);
        }
    };

}

export default NoteController;