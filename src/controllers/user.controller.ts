import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import TokenMiddleware from '../middlewares/token.middleware';

class UserController {
  public UserService = new userService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _ = await this.UserService.signUp(req.body);
      const {password, ...rest_data} = req.body;
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: rest_data,
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.UserService.login_check(req.body.emailId, req.body.password);
      if(user){
        const {firstName, emailId, _id, ...rest_data} = user;
        const generate_Token = await TokenMiddleware.generateToken({emailId: emailId, _id: _id}, process.env.SECRET_KEY_0, "1h");
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK ,
          data: {
            firstName,
            emailId,
            generate_Token
          },
          message: 'Logged in Successfully 🚀🚀🚀'
        });
      } 
    }catch(error){
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Invalid Email or Password.'
      });
    }
    }

    public forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const resetToken = await this.UserService.forgetPassword(req.body.emailId);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: resetToken ,
          message: 'Password reset token generated',
        });
      } 
      catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: error.message,
        });
      }
    };
   
    public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { token, newPassword } = req.body;
        await this.UserService.resetPassword(token, newPassword);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: "",
          message: 'Password reset successful',
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: error.message,
        });
      }
    };
  
  };


export default UserController;

