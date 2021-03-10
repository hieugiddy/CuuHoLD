var express=require("express");
var DB=require("../common/DB.js");
var conn=DB.getConnection();

var router=express.Router();

router.use("/",require(__dirname+"/home"));
router.use("/dang-ky-doi-tac",require(__dirname+"/doitac"));

module.exports=router;

