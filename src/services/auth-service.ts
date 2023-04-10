import * as Joi from 'joi';
import AuthValidation from '../validator/auth-validation';
import UserModel, { IUserModel } from '../models/user-model';
import { IAuthService } from '../interfaces/auth-interface';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {
     
    /**
     * Crear usuario
     *
     * @param {IUserModel} body
     * @returns {Promise < IUserModel >}
     */
    async createUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = new UserModel(body);
            const query: IUserModel = await UserModel.findOne({
                email: body.email
            });

            if (query) {
                throw new Error('Este email ya ha sido registrado');
            }

            const name: string = `${user.firstName} ${user.lastName}`;

            await this.sendEmail(user.email, name , 'Bienvenido a 2BINSTITUTE');

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },
    
    
    /**
     * Obtener usuario (login)
     *
     * @param {IUserModel} body
     * @returns {Promise < IUserModel >}
     */
    async getUser(body: IUserModel): Promise < IUserModel > {        
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.getUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOne({
                email: body.email
            });

            if (user) {
                const isMatched: boolean = await user.comparePassword(body.password);
                user.password = '';
                if (isMatched) {
                    return user;
                }
            }
    
            throw new Error('Correo electronico o contraseña incorrecto');
            
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default AuthService;
