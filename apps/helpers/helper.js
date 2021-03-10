var bcrypt=require("bcrypt");
var config=require("config");

function hash_pw(pw){
    var salt=bcrypt.genSaltSync(config.get("salt"));
    var hash=bcrypt.hashSync(pw, salt);
    
    return hash;
}

module.exports={
    hash_pw: hash_pw
}