import Note from '../models/note.modal';
import { INote } from '../interfaces/note.interface';


class NoteService {
  upsert(body: any) {
      throw new Error('Method not implemented.');
  }

  //create new Note
  public Add = async (body: INote): Promise<Object> => {
    const data = await Note.create(body);
    return data;
  };

  // Read the present Note
  public Read = async (body: Object): Promise<boolean> => {
    const notes = (await Note.findOne(body).exec());
    return notes ? true: false;
  };

  // Update the present Note
  public Update = async(body: Object): Promise<Object> => {
    const updated_Note = Note.updateOne(body);
    return updated_Note;
  }
  
  // Delete the given Note
  public delete = async(body: Object): Promise<boolean> => {
    const delete_Count = (await Note.deleteOne(body)).deletedCount;
    return delete_Count > 0;
  }

};


export default NoteService;
