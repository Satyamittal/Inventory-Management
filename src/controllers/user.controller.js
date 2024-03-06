import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController
{
    getRegistrationPage(req,res)
    {
        res.render('register') ;
    }
    getLoginPage(req,res){
        res.render('login',{errorMessage:null}) ;
    }
    registerUser(req,res)
    {
        const {name,email,password} = req.body ;
        UserModel.add(name,email,password) ;
        res.render('login',{errorMessage:null}) ;
    }
    loginUser(req,res)
    {
        const {email,password} = req.body ;
        const user = UserModel.isValidUser(email,password) ;

        if(!user)
        {
            return res.render('login',{errorMessage: "Invalid Credentials"})
        }

        var products = ProductModel.get();
        res.render('products',{products:products});
    }
}