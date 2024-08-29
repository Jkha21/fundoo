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
            '/create',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.create
        );

        this.router.get(
            '/fetch',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.fetch
        );

        this.router.put(
            '/update',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.update
        );

        this.router.delete(
            '/del',
            userAuth,
            this.NoteValidater.note_check,
            this.NoteController.delete
        );
    }

    public getRoutes = (): Router => {
        return this.router;
    };
}

export default NoteRoutes;

