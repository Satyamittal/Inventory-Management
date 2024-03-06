/**
 * Controllers are used to serve the requests (which may innvolve rendering views,returning JSON data,etc) 
 * Naming of controllers are done in this fashion : -- product.controller.js
 */

/**
 * Importing Data and Modules
 */
import ProductModel from '../models/product.model.js';
import path from 'path' ;
export class ProductController{

    /** Data sent by form is placed in "req.body" */

    example(req,res){

        let products = ProductModel.get() ;
        // Fetching the product which is triggered
        const id  = req.params.id;

        /** Rendering and send are both different 
         * 
         *  res.render("products", {products , errorMessage:null ,}) ;
         *  res.status(200).send("Welcome") ;
        */
    }
    serveStaticFile(req,res){
        var filePath = path.join(path.resolve(),'public','html','products.html') ;
        return res.sendFile(filePath) ;
    }

    getProducts(req,res){
        var products = ProductModel.get();
        res.render('products',{products:products});
    }
    getNewProductForm(req,res){
        res.render('new-product',{errorMessage:null});
    }

    addNewProduct(req,res){
        const imageFile = 'images/'+req.file.filename ;
        req.body.file = imageFile ;

        ProductModel.add(req.body);
        var products = ProductModel.get();
        res.render('products',{products});
    }
    getUpdateProductForm(req,res){
        var product = ProductModel.getProductById(req.params.id) ;
        res.render('update-product',{errorMessage: null,product});
    }
    updateProduct(req,res){
        const imageFile = 'images/'+req.file.filename ;
        req.body.file = imageFile ;
        
        ProductModel.update(req.body) ;
        var products = ProductModel.get();
        res.render('products',{products});
    }
    deleteProduct(req,res){
        const id = req.params.id ; 
        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render('products',{products});
    }

}
