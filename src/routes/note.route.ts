import express, {Router} from 'express';
import noteController from '../controllers/note.controller';
import noteValidator from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

class NoteRoutes {
    private NoteController = new noteController();
    private router = express.Router();
    private NoteValidater = new noteValidator();

    constructor(){
        this.routes();
    }

    private routes = () => {
        this.router.post(
            '',
            userAuth,
            this.NoteValidater.create_validate,
            this.NoteController.createNote
        );

        this.router.get(
            '/findNote/:id',
            userAuth,
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.findNoteById
        );

        this.router.put(
            '/updateNote/:id',
            userAuth,
            [this.NoteValidater.validateIdMiddleware, this.NoteValidater.update_validate],
            this.NoteController.updateNoteById
        );

        this.router.delete(
            '/delNote/:id',
            userAuth,
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.deleteNoteById
        );

        this.router.get(
            '/allNotes',
            userAuth,
            this.NoteController.findAllNotesByUserId
        );

        this.router.put(
            '/isArchive/:id',
            userAuth,
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.isArchived
        );

        this.router.put(
            '/isTrash/:id',
            userAuth,
            this.NoteValidater.validateIdMiddleware,
            this.NoteController.isDeleted
        );
        
    }

    public getRoutes = (): Router => {
        return this.router;
    };
}

export default NoteRoutes;

