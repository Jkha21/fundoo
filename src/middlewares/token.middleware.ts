import jwt from 'jsonwebtoken';

class TokenMiddleware {
    // Method to generate a token
    public static async generateToken(body: object, secretKey: string, time: string): Promise<string> {
            const token = jwt.sign(body, secretKey, { expiresIn: time});
            return token;
    }

    // Method to verify a token
    public static async verifyToken(token: string, secretKey: string): Promise<object> {
            const payload = jwt.verify(token, secretKey);
            return payload as object;
    }
}

export default TokenMiddleware;
