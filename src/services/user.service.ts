import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

class UserService {

  //create new user
  public signUp = async (body: IUser): Promise<IUser> => {
    const data = await User.create(body);
    return data;
  };

  public check_emailId = async (body: any): Promise<any> => {
    const {emailId, password} = body;
    const retrieve_emailId = User.findOne({emailId}).exec();
    if(retrieve_emailId){
      return (await retrieve_emailId).password
    }
    return false;
  };

  public password_check = async (body: any, check_password: string): Promise<any> => {
    const validate = bcrypt.compare(body.password, check_password);
    if (validate){
      return true;
    }
    return false;
  };

}


export default UserService;
