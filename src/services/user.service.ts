import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '../utils/mail.util';
import TokenMiddleware from '../middlewares/token.middleware';
import hashingFunction from '../hashing';

class UserService {

  //create new user
  public signUp = async (body: IUser): Promise<IUser> => {
    const user = (await User.findOne({emailId: body.emailId}).exec());
    if(user){
      throw new Error('Mail already exit.');
      }
      const data = await User.create(body);
      return data;
    }
    
  public login_check = async (emailId: string, password: string): Promise<any> => {
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


  public forgetPassword = async (email: string): Promise<string> => {
    try{
      const user = await User.findOne({ emailId: email });
      if (!user) {
        throw new Error('Email does not exist');
      }

      const resetToken = await TokenMiddleware.generateToken({emailId: user.emailId}, process.env.JWT_SECRET_KEY, "15m");
      await sendResetPasswordEmail(email, resetToken);
      await user.save();
      return resetToken;
    }catch(error){
        throw new Error("Error Forget Password Failed.")
    }
    }

    
  public resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      const decoded = await TokenMiddleware.verifyToken(token, process.env.JWT_SECRET_KEY) as {emailId: string};
      const user = await User.findOne({ emailId: decoded.emailId });
      if (!user) {
        throw new Error('Invalid token or user does not exist');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };


};


export default UserService;
