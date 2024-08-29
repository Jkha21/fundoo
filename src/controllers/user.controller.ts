import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

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
      next();
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.UserService.Match_Email_Password(req.body.emailId, req.body.password);
      if(user){
        const generate_Token = await this.UserService.generateToken(req.body);
        const {firstName, emailId, ...rest_data} = user;
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK ,
          data: {
            firstName,
            emailId,
            generate_Token
          },
          message: 'Logged in Successfully 🚀🚀🚀'
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: 'Invalid Email or Password.'
        });
      }
    }catch(error){
      next(error);
    }
    }
  };


export default UserController;

