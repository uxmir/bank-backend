const express=require("express");
const router=express.Router()
const authMiddleWare=require('../middleware/auth.middleware');
const transactionController=require('../controller/transactionController')
router.post('/',authMiddleWare.authMiddleware,transactionController.transactionController)
module.exports=router