import * as Joi from 'joi';
import Validation from '../components/validation';
import { IUserModel } from '../models/user-model';

/**
 *
 * @class AuthValidation
 * @extends {Validation}
 */
class AuthValidation extends Validation {

     /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */
    constructor() {
        super();
    }
    /**
     *
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult < IUserModel >}
     * @memberof AuthValidation
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
            password: Joi.string().required(),
            phone: Joi.string().required(),
            gender: Joi.string().optional(),
            statusUser:{
                value: Joi.string().required(),
                startDate: Joi.date().required(),
                endDate: Joi.date().optional()
            },
            role: Joi.string().required(),
            subscribedCourses: Joi.array().required()
        });

        return Joi.validate(params, schema);
    }
    /**
     *
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult < IUserModel >}
     * @memberof AuthValidation
     */
    getUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });

        return Joi.validate(params, schema);
    } 
}

export default new AuthValidation();
