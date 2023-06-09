import * as bcrypt from 'bcrypt';
import * as connections from '../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 *
 *
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {    
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise < boolean > ;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema({
    firstName: String,
  lastName: String,
  email: String,
  password: String
}, {
    collection: 'users',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

export default connections.db.model < IUserModel > ('UserModel', UserSchema);
