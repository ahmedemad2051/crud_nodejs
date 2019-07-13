const express=require('express');
const router=express.Router();
const Sticker=require('../../model/Sticker');
const {isValidId}=require('../../middleware/isValidId');
const stickerController=require('../../controllers/api/StickerController');



router.get('/',stickerController.getAll);
router.get('/:id',isValidId,stickerController.show);
router.post('/',stickerController.validate('create'),stickerController.store);
router.put('/:id',isValidId,stickerController.update);
router.delete('/:id',isValidId,stickerController.destroy);

module.exports=router;