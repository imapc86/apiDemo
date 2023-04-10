import AuthService from '../../services/auth-service';
import HttpError from '../../config/error';
import { IUserModel } from '../../models/user-model';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
 *Función para registro
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;

        const user: IUserModel = await AuthService.createUser(jsonObject);

        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'User create successfull'
            }
        });
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            data: {
                clave: '400',
                message: error.message
            }
        });
    }
}

/**
 * Función de Login
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;

        const user: IUserModel = await AuthService.getUser(jsonObject);

        const token: string = jwt.sign({ email: user.email }, app.get('secret'), {
            expiresIn: '60m'
        });
        
        res.json({
            status: 200,
            securityContext : {
                token
            },
            data: {
                clave: 'OK',
                message: 'Sign in successfull',
                content: {
                    logged: true,
                    id: user.id
                }
            }
        });

    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }

        res.json({
            status: 400,
            data: {
                clave: '400',
                message: error.message
            }
        });
    }
}
