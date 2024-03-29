/**
 * We will be using ES6 syntax all over the files
 */
/********************************************************************************************************* */
/** Step-1 
 *          Inlclude modules....
 */

/** Importing external modules like following */
import express from 'express' ;
import ejsLayouts from 'express-ejs-layouts' ;
 
/** Importing internal modules: Named and Default imports */

/** Named Imports: - import {class or Function Name} from './src/controllers/product.controller.js';
 *         1) We can import muliple entities seprated by commas , similarly export multiple inside curly braces
 *         2) Cannot change the name of imported object.Can be used as exactly
 * 
 * Default Imports:- import validateRequest  from './src/middlewares/validation.middleware.js';
 *         1) We can import or export only single default object, without any curly braces. Can be used as exactly
 *         2) can change the name like : -  import renamed from './file' 
*/
/** Write your code Here */
import session from 'express-session';
import { ProductController } from './src/controllers/product.controller.js';
import { validateRequest } from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

/** Importing core modules */
import path from 'path' ;
/********************************************************************************************************* */
/**
 * Step-2
 *         Making of server and setting up view engine for serving dynamic content
 *         Setting up path of views(dynamic content), so that we don't have to write absolute path again and again
 *         and using ejs-layouts for common layout of the website. Such that we don't have to write redundant code again n again.
 *         Setting up path of static files
 *         Parsing the form data , because it sent in encoded form. 
 *         Form Data is placed in "req.body" other then files uploaded
 *         Uploaded filesin form are placed inside "req.file"
 */

const server = express() ;
server.set('view engine' ,'ejs') ;
server.set('views' ,path.join(path.resolve(),"src",'views')) ;
server.use(ejsLayouts) ;
server.use(express.static('public') ) ;
server.use(express.urlencoded({extended: true})) ;
/********************************************************************************************************* */
/**
 * Step-3
 *       Making of requests at specific routes and triggers controllers and middlewares.
 */

/** Write Your code Here */
const productController = new ProductController() ;
const userController = new UserController() ;
server.use(cookieParser()) ;
// server.use(setLastVisit) ;

server.use(session({
    secret: "Secret Key" ,
    resave: false ,
    saveUninitialized: false,
    cookie: {secure: false}
}))

server.get('/',setLastVisit,auth,productController.getProducts);
server.get('/new-product',auth ,productController.getNewProductForm);
server.post('/',auth,uploadFile.single('file'),validateRequest,productController.addNewProduct);
server.get('/update-product/:id',auth,productController.getUpdateProductForm) ;
server.post('/update-product',auth,uploadFile.single('file'),validateRequest,productController.updateProduct);
server.post('/delete-product/:id',auth,productController.deleteProduct) ; 
server.get('/register',userController.getRegistrationPage) ;
server.get('/login',userController.getLoginPage) ;
server.post('/register' ,userController.registerUser) ;
server.post('/login' ,userController.loginUser) ; 
server.get('/logout',userController.logout) ;


/** If we import a function , we can use it exaclty by its name irrespective of default or named import.
 *  If we import class , we have to create an instance for it to use its properties and methods.
 *     example: - In this ProductController() is class = > const productController = new ProductController(); 
 * 
 *  But if class has "static" properties , then we can use them without creating instance.
 */

/** This is the way a request look like
 * 
 *  server.get('/route',middlewares, controller functions) = You can also specify array of middle-wares
 *  server.get('/update-product/:id', productController.getUpdateProductView );
 */
/********************************************************************************************************* */
/**
 * Step-4
 *       Exporting the server , take care of named and default.
 */
export {server} ;
