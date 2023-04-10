import * as Joi from 'joi';
import UserModel, { IUserModel } from '../models/user-model';
import UserValidation from '../validator/user-validation';
import { IUserService } from '../interfaces/user-interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IUserService}
 */
const UserService: IUserService = {
    /**
     * Encontrar todos los usuarios
     *
     * @returns {Promise < IUserModel[] >}
     */
    async findAll(): Promise < IUserModel[] > {
        try {
            return await UserModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * Encontrar un usuario
     *
     * @param {string} id
     * @returns {Promise < IUserModel >}
     */
    async findOne(id: string): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = UserValidation.getUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await UserModel.findOne({
                _id: Types.ObjectId(id)
            });
            
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * Insertar usuario
     *
     * @param {IUserModel} body
     * @returns {Promise < IUserModel >}
     */
    async insert(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = UserValidation.createUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: IUserModel = await UserModel.findOne({
                email: body.email
            });

            if (query) {
                throw new Error('Este email ya ha sido registrado');
            }
            
            const user: IUserModel = await UserModel.create(body);

            const name: string = `${user.firstName} ${user.lastName}`;

            await this.sendEmail(user.email, body.password, name);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * Remover usuario
     *
     * @param {string} id
     * @returns {Promise < IUserModel >}
     */
    async remove(id: string): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = UserValidation.getUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * Actualizar usuario
     *
     * @param {IUserModel} body
     * @returns {Promise < IUserModel >}
     */
    async update(body: IUserModel): Promise < IUserModel > {

        try {
            const validate: Joi.ValidationResult < IUserModel > = UserValidation.updateUser(body);
            
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user: IUserModel = await UserModel.findOne({
                _id: Types.ObjectId(body.id)
            });
            

            user.firstName = body.firstName;
            user.lastName = body.lastName;
            user.email = body.email;
            user.password = body.password === 'no-password' ? user.password : body.password;

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default UserService;
