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
      const data = await this.UserService.signUp(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const hashed_password = await this.UserService.check_emailId(req.body.emailId);
      if (!hashed_password) {
          res.status(HttpStatus.UNAUTHORIZED).json({
            code: HttpStatus.UNAUTHORIZED,
            message: 'Email ID not present.'
        });
      }

      const match_password = await this.UserService.password_check(req.body.password, hashed_password);
      if (!match_password) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          code: HttpStatus.UNAUTHORIZED,
          message: 'Password not matched.'
        });
      }

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: '',
        message: 'Logged in Successfully 🚀🚀🚀'
      });
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  };
}

export default UserController;
