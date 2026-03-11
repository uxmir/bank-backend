const express=require("express");
const router=express.Router()
const authMiddleWare=require('../middleware/auth.middleware')
router.post('/',authMiddleWare.authMiddleware)
module.exports=router