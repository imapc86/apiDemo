import { Router } from 'express';
import { UserComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();


/**
 * POST method route
 * @example http://localhost:PORT/users/getUsers
 * @swagger
 * /users/getUsers/:
 *  post:
 *    description: Obtiene lista de usuarios
 *    tags: ["users"]
 *    security:
 *    - ApiKeyAuth: []
 *    requestBody:
 *      description: get user
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *    responses:
 *      200:
 *        description: Lista de usuarios
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              message: Users show successfull
 *              content: [
 *              {
 *                  likedCourses: [],
 *                  _id: "5d1d2a834676ef3fd839a1b6",
 *                  firstName: "Jhon",
 *                  lastName: "Doe",
 *                  email: "correo@example.com",
 *                  password: ""
 *                          
 *      400:
 *        description: Fallo en obtener lista de usuarios
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              message: 'Falta token'
 */

router.post('/getUsers', UserComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/users/create
 * @swagger
 * /users/create/:
 *  post:
 *    description: Crea un nuevo usuario
 *    tags: ["users"]
 *    security:
 *    - ApiKeyAuth: []
 *    requestBody:
 *          description: Nuevo usuario body
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSchema'
 *              example:
 *                firstName: Jhon 
 *                lastName: Doe
 *                email: correo@example.com
 *                gender: m
 *                role: STUDENT
 *                subscribedCourses: []
 *                password: kyu4ezs7f7i                 
 *    responses:
 *      200:
 *        description: Usuario creado
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              data: {
 *                 clave: 'OK',
 *                 message: 'User create successfull',
 *                 content: {
 *                      likedCourses: [],
 *                      _id: "5d260ba6a12d7513a05c1008",
 *                      firstName: "Jhon,
 *                      lastName: "Doe,
 *                      email: "correo@example.com",
 *                      password: ""               
 *                  }     
 *              }            
 *      400:
 *        description: Fallo en agregar nuevo usuario
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              message: 'Este email ya ha sido registrado'
 */

router.post('/create', UserComponent.create);


/**
 * POST method route
 * @example http://localhost:PORT/users/getUser
 * @swagger
 * /users/getUser/:
 *  post:
 *    description: Obtiene informacion de un usuario
 *    tags: ["users"]  
 *    requestBody:
 *          description: Busca usario por id
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSchema'
 *              example:
 *                  id: 5d1cc229818bfc3f34fee187 
 *    responses:
 *      200:
 *        description: Usuario encontrado
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              data: {
 *                 clave: 'OK',
 *                 message: 'User search successfull',  
 *                 content: {
 *                      likedCourses: [],
 *                      _id: "5d1cc229818bfc3f34fee187",
 *                      firstName: "Jhon",
 *                      lastName: "Doe",
 *                      email: "correo@example.com",
 *                      password: ""     
 *                 } 
 *              }                  
 *      400:
 *        description: Fallo al buscar usuario
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              message: 'Usuario no encontrado'
 */

router.post('/getUser', UserComponent.findOne);

/**
 * POST method route
 * @example http://localhost:PORT/users/delete
 * @swagger
 * /users/delete/:
 *  post:
 *    description: Elimina un usuario
 *    tags: ["users"]  
 *    requestBody:
 *          description: Elimina usuario body
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSchema'
 *              example:
 *                  id: 5d260ba6a12d7513a05c1008 
 *    responses:
 *      200:
 *        description: Usuario eliminado
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              data: {
 *                 clave: 'OK',
 *                 message: 'Drop user successfull',   
 *              }
 *              
 *                          
 *      400:
 *        description: Fallo al eliminar usuario
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              message: 'Fallo al eliminar usuario'
 */

router.post('/delete', UserComponent.remove);

/**
 * POST method route
 * @example http://localhost:PORT/users/update
 * @swagger
 * /users/update/:
 *  post:
 *    description: Actualiza un usuario
 *    tags: ["users"]  
 *    requestBody:
 *          description: Actualiza user body
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSchema'
 *              example:
 *                id: "5d26058b33dec34508d243af"
 *                firstName: "Actualizar"
 *                lastName: "Actualizar"
 *                email: "Actualizar@2bcore.com"
 *                password: "no-password"
 *    responses:
 *      200:
 *        description: User actualizado
 *        content:
 *          application/json:
 *            example:
 *              status: 200
 *              data: {
 *                 clave: 'OK',
 *                 message: 'Update user  successfull'   
 *              }
 *              
 *                          
 *      400:
 *        description: Fallo al actualizar usuario
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              message: 'Fallo al actualizar usuario'
 */

router.post('/update', UserComponent.update);

 


/**
 * @export {express.Router}
 */
export default router;
