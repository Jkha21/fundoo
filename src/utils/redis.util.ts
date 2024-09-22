import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import redisClient from '../config/redis.config';


class NoteUtil {
    constructor() {
        this.connection();
    }

    private connection() {
        redisClient.on('connect', () => {
            console.log('redisClient connection is successful');
        });

        redisClient.on('error', (err) => {
            console.error('redisClient error:', err);
        });
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        const UserId = req.body.UserId;

        try {
            const data = await redisClient.hGetAll(`GetAll${UserId}`);
            if (data && Object.keys(data).length > 0) {
                const parsedData = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [key, JSON.parse(value)])
                );
                console.log('---------------------------------------------------------', UserId);
                console.log('Data returned from redisClient');
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    data: parsedData,
                    message: 'Note Retrieved Successfully'
                });
            } else {
                next();
            }
        } catch (err) {
            console.error('redisClient error:', err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            });
        }
    };

    public set = async (id: any, data: any) => {
        try {
            for (const note of data) {
                const key = note.dataValues.id.toString();
                const value = JSON.stringify(note.dataValues);

                await redisClient.hSet(`GetAll${id}`, key, value);
                console.log('Note saved:', key);
            }

            return true;
        } catch (err) {
            console.error('redisClient error:', err);
            throw new Error('Failed to set data in redisClient');
        }
    };

    public update = async (id: any, data: any) => {
        try {
            const key = data.dataValues.id.toString();
            const value = JSON.stringify(data.dataValues);

            const result = await redisClient.hSet(`GetAll${id}`, key, value);
        } catch (err) {
            console.error('redisClient error:', err);
            throw new Error('Failed to set data in redisClient');
        }
    };
}

export default NoteUtil;