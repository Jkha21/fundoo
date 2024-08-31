import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {

  //create new user
  public signUp = async (body: IUser): Promise<IUser> => {
    const data = await User.create(body);
    return data;
  };

  public Match_Email_Password = async (emailId: string, password: string): Promise<any> => {
    const user = (await User.findOne({emailId}).exec());
    console.log(user);
    if(user){
      const validate = await bcrypt.compare(password, user.password);
      if (validate){
        return user;
      }
      return false;
    }
    return false;
  };

  public generateToken = async(body: any): Promise<String> => {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(body, secretKey, {expiresIn: '1h'});
    return token 
  }

};


export default UserService;
