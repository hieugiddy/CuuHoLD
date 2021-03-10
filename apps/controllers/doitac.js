var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("doitac", { data: {} });
});
router.get("/test", function(req, res) {
    res.render("abc", { data: {} });
});


module.exports = router;