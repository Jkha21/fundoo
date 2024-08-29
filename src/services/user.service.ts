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
    if(user){
      const validate = await bcrypt.compare(password, user.password);
      if (validate){
        return user;
      }
      return false;
    }
    return false;
  };

  public generateToken = async(body: Object): Promise<String> => {
    const payload = body;
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    return token 
  }

};


export default UserService;
