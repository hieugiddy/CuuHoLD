var express = require("express");
var router = express.Router();
var home_md = require("../models/home");

router.get("/", async function (req, res) {
    try {
        var cauHinh = await home_md.getThongTinHeThong().then(data=>data);
        var binhLuan = await home_md.getDanhGia().then(data=>data);
        res.render("trangchu", {
            data: {
                'TenWebsite': cauHinh[0].TenWebsite,
                'TenApp': cauHinh[0].TenApp,
                'MoTa': cauHinh[0].MoTa,
                'TuKhoa': cauHinh[0].TuKhoa,
                'Logo': cauHinh[0].Logo,
                'Favicon': cauHinh[0].Favicon,
                'LinkTaiAppAndroid': cauHinh[0].TenWebsite,
                'LinkTaiAppIOS': cauHinh[0].TenWebsite,
                'BanQuyen': cauHinh[0].BanQuyen,
                'Hotline': cauHinh[0].Hotline,
                'Email': cauHinh[0].Email,
                'Website': cauHinh[0].DiaChiWebsite,
                'TruSoChinh': cauHinh[0].DiaChiTruSo,
                'Video': cauHinh[0].Video,
                'Fanpage': cauHinh[0].Fanpage,
                'DanhGia': binhLuan
            }
        });
    }
    catch (e) {
        res.json({ "Messenger": e });
    }
});

module.exports = router;