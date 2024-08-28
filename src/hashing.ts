import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

class hashingFunction {
    private encrypt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const saltrounds = 10;
            // Use await properly with bcrypt.hash
            const hash = await bcrypt.hash(req.body.password, saltrounds);
            req.body.password = hash;
            next(); // Call next() after the password has been hashed
        } catch (error) {
            // Handle any potential errors
            next(error);
        }
    };

    // Exporting the function if you need to use it as middleware
    public getEncryptMiddleware() {
        return this.encrypt;
    }
}

export default hashingFunction;
