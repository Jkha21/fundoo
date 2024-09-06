import { Document } from 'mongoose';

export interface INote extends Document {
  Title: string;
  Description: string;
  Color: string;
  isArchived: boolean;
  isDeleted: boolean;
  UserID: string
}
