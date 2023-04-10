import { IUserModel } from '../models/user-model';


/**
 *
 *
 * @export
 * @interface IAuthService
 */
export interface IAuthService {
    /**
     *
     *
     * @param {IUserModel} IUserModel
     * @returns {Promise < IUserModel >}
     * @memberof IAuthService
     */
    createUser(IUserModel: IUserModel): Promise < IUserModel > ;
    /**
     *
     *
     * @param {IUserModel} IUserModel
     * @returns {Promise < IUserModel >}
     * @memberof IAuthService
     */
    getUser(IUserModel: IUserModel): Promise < IUserModel >;

}
