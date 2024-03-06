import multer from "multer";

/**Multer takes multipart form data and then populate the req.body
 * Multer adds two more properties in "req.file" that are "destination" & "filename"
 */
const storageConfig = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        cb(null,'public/images/');
    },
    filename: (req,file,cb)=>
    {
        const name = Date.now()+"-"+ file.originalname ;
        cb(null,name);
    }
});

export const uploadFile = multer({storage: storageConfig});

/** How to add Multer in your Project
 * 
 * Install Multer
 * Changes in views, models, forms
 * Middleware to handle files (save in local then put in array)
 * Apply that middleware
 * Update controller to update images
 */