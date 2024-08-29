import { Schema, model } from 'mongoose';
import { INote } from '../interfaces/note.interface';

const noteSchema = new Schema(
  {
    Title: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    color: {
      type: String,
    },
    isArchived: {
      type: Boolean,
    },
    isDeleted: {
        type: Boolean,
    },
    UserID: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

export default model<INote>('Note', noteSchema);
