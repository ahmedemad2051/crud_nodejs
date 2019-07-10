const express=require('express');
const router=express.Router();
const Sticker=require('../../model/Sticker');
const {isValidId}=require('../../middleware/isValidId');

router.get('/',(req,res)=>{

    Sticker.getAll().then((stickers)=>{
        res.json(stickers);
    });

});

router.get('/stickers/:id',isValidId,function(req,res){
    Sticker.getOne(req.params.id).then((sticker)=>{
        res.json(sticker);
    });
});

module.exports=router;