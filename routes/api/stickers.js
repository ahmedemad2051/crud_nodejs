const express=require('express');
const router=express.Router();
const Sticker=require('../../model/Sticker');
const {isValidId}=require('../../middleware/isValidId');


function isValid(sticker){
    const hasTitle= typeof sticker.title =='string' && sticker.title.trim() != '';
    const hasUrl= typeof sticker.url =='string' && sticker.url.trim() != '';
    return hasTitle&&hasUrl;
}

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

router.post('/',function(req,res,next){
    if(isValid(req.body)){
        Sticker.create(req.body).then(sticker=>{
            res.json(sticker);
        });
    }else{
        next(new Error('Invalid sticker'));
    }
});

router.put('/stickers/:id',isValidId,function(req,res){
    if(isValid(req.body)){
        Sticker.update(req.params.id,req.body).then(sticker=>{
            res.json(sticker);
        });
    }else{
        next(new Error('Invalid sticker'));
    }
});

router.delete('/stickers/:id',isValidId,function(req,res){
    Sticker.delete(req.params.id).then(()=>{
        res.json({
            'deleted':true
        });
    });
});

module.exports=router;