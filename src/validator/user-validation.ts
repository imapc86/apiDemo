import * as Joi from 'joi';
import Validation from '../components/validation';
import { IUserModel } from '../models/user-model';

/**
 *
 * @class UserValidation
 * @extends {Validation}
 */
class UserValidation extends Validation {

    /**
     *Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }

    /**
     *
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult < IUserModel >}
     * @memberof UserValidation
     */
    createUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required(),
            password: Joi.string().required()
        });

        return Joi.validate(params, schema);

    }
    /**
     *
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult < IUserModel >}
     * @memberof UserValidation
     */
    updateUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            id: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required(),
            password: Joi.string().required(),

        });

        return Joi.validate(params, schema);
    }

    /**
     *
     * @param {{
     *             id: string
     *         }} body
     * @returns {Joi.ValidationResult < {
     *         id: string
     *     } >}
     * @memberof UserValidation
     */
    getUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
    
}

export default new UserValidation();
