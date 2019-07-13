const express=require('express');
const router=express.Router();
const {isValidId}=require('../../middleware/isValidId');
const userController=require('../../controllers/api/UserController');
const multer=require('multer');
const checkAuth=require('../../middleware/check-auth');

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./public/uploads/');
    },
    filename:function (req,file,cb) {
        cb(null,new Date().toISOString()+'_'+file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' ||file.mimetype==='image/jpg' ||file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(new Error('invalid mimes'),false);
    }
};
const upload=multer({storage:storage,
    limits:{fileSize:1024*1024*5},
    fileFilter:fileFilter
});


router.get('/',userController.getAll);
router.get('/:id',[isValidId,checkAuth],userController.show);
router.post('/signUp',[upload.single('logo'),userController.validate('create')],userController.store);
router.post('/login',userController.login);
router.put('/:id',isValidId,userController.update);
router.delete('/:id',isValidId,userController.destroy);

module.exports=router;