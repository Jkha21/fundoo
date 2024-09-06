import Note from '../models/note.modal';
import { INote } from '../interfaces/note.interface';
import { ObjectId } from 'mongoose';


class NoteService {

  //create new Note
  public Create_Note = async (body: INote): Promise<Object> => {
    const data = await Note.create(body);
    return data;
  };

  // Find the given Note by id
  public Find_Note_ById = async (id: string): Promise<boolean> => {
    const notes = (await Note.findOne({_id: id}).exec());
    return notes ? true: false;
  };

  // Update the given Note 
  public Update_Note_ById = async(body: Object, id: string): Promise<any> => {
    const note = this.Find_Note_ById(id);
    if(note){
      const updated_Note = Note.updateOne(body);
      return updated_Note;
    }
    return false;
  }
  
  // Delete the given Note using Id
  public Delete_Note_ById = async(id: string): Promise<boolean> => {
    const delete_Count = (await Note.deleteOne({_id: id})).deletedCount;
    return delete_Count > 0;
  }

  // Find all Notes of the given user using UserId
  public FindAll_Notes_ByUsersId = async (id: string): Promise<Object[]> => {
    const notes = (await Note.find({UserID: id}).exec());
    return notes;
  };

  public is_Archived_Note = async (id: string): Promise<any> => {
    const userNote = (await Note.findOne({_id: id, isDeleted: false}).exec());
    if(userNote){
      userNote.isArchived = !userNote.isArchived;
      await userNote.save();
      return userNote.isArchived;
    }
    return false;
  };

  public is_Deleted_Note = async (id: string): Promise<boolean> => {
    const userNote = (await Note.findOne({_id: id}).exec());
    if(userNote){
      userNote.isDeleted = !userNote.isDeleted;
      await userNote.save();
      return userNote.isDeleted;
    }
    return false;
  };


};


export default NoteService;
