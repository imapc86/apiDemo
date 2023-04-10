import UserService from '../../services/user-service';
import { HttpError } from '../../config/error';
import { IUserModel } from '../../models/user-model';
import { NextFunction, Request, Response } from 'express';


/**
 * Encontrar todos los usuarios
 * 
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const users: IUserModel[] = await UserService.findAll();

        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'Users show successfull',
                content: users
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
 * Encontrar un usuario
 * 
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const user: IUserModel = await UserService.findOne(jsonObject.id);

        
        if (user) {user.password = '';}
        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'User search successfull',
                content: user
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
 * Crear un usuario
 * 
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const user: IUserModel = await UserService.insert(jsonObject);

        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'User create successfull',
                content: user
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
 * Remover usuario
 * 
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const user: IUserModel = await UserService.findOne(jsonObject.id);

        const userRemove: IUserModel = await UserService.remove(jsonObject.id);
  

        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'Drop  user  successfull'
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
 * Actualizar usuario
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const user: IUserModel = await UserService.update(jsonObject);

        user.save();
        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'Update user  successfull'
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
