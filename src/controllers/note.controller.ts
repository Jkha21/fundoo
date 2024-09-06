import HttpStatus from 'http-status-codes';
import noteService from '../services/note.service';
import { Request, Response, NextFunction } from 'express';

class NoteController {
    public NoteService = new noteService();

    public createNote = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{            
            const create_note = await this.NoteService.Create_Note(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: create_note,
                message: 'Created the note'
            });
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Note creation failed'
            });
        }
    };

    public findNoteById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const find_note = await this.NoteService.Find_Note_ById(req.params.id);
            if(find_note){
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    data: find_note,
                    message: 'Fetched the note'    
                });
            } else{
                res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'Note not found'    
                });
            }
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Finding note failed'    
            });
        }
    };

    public updateNoteById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const update_note = await this.NoteService.Update_Note_ById(req.body, req.params.id);
            if(update_note){
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    data: update_note,
                    message: 'Updated the note'
                });
            } else{
                res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'Note not found'
                });
            }
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Update failed'
            });
        }
    };

    public deleteNoteById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const delete_note = await this.NoteService.Delete_Note_ById(req.params.id);
            if(delete_note){
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    data: delete_note,
                    message: 'Deleted the note'
                });
            } else{
                res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'Note not found'
                });
            }
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Deletion failed'
            });
        }
    };

    public findAllNotesByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{
            const getAll_notes = await this.NoteService.FindAll_Notes_ByUsersId(req.body.UserID);
            if(getAll_notes){
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    data: getAll_notes,
                    message: 'Fetched the notes'    
                });
            } else{
                res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'No notes found'    
                });    
            }
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Failed to retrieve notes'    
            });
        }
    };

    public isArchived = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{            
            const check_archived = await this.NoteService.is_Archived_Note(req.params.id);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: check_archived,
                message: 'Archived the note'
            });
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Failed to archive note'
            });
        }
    };

    public isDeleted = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):  Promise<void> => {
        try{            
            const is_delete_note = await this.NoteService.is_Deleted_Note(req.params.id);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: is_delete_note,
                message: 'Deleted the note'
            });
        }catch(error){
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'Note deletion failed'
            });
        }
    };



}

export default NoteController;