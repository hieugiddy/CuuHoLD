var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("trangchu", {
        data: {
            'TenWebsite': 'Cứu Hộ Xe Cơ Giới, Cứu Hộ Giao Thông Tại Khu Vực Đà Nẵng',
            'TenApp': 'XXX',
            'MoTa': 'XXX là 1 hệ thống với nhiều dịch vụ sửa chữa, cứu hộ giao thông uy tín và chất lượng trên khu vực thành phố Đà Nẵng, sẵn sàng hỗ trợ người sử dụng phương tiện xe cơ giới mọi lúc, mọi nơi, 24/24 kể cả ngày lễ và chủ nhật.',
            'TuKhoa': 'cuu ho xe, cuu ho xe may, cuu ho xe oto, sua xe tai nha',
            'Logo': '/static/images/logo.png',
            'Favicon': '/static/images/favicon.png',
            'APK': '#',
            'IOS': '#a',
            'BanQuyen': 'Hiếu Hằng Team',
            'Hotline': '+809272561823',
            'Email': 'admin@cuuhoxe.tk',
            'Website': 'cuuhoxe.tk',
            'TruSoChinh': '46 Cao Thắng, Phường Thanh Bình, Quận Hải Châu, Đà Nẵng',
            'Video': 'https://www.youtube.com/watch?v=Yi6Y1gSIyyo',
            'Fanpage': 'https://www.facebook.com/helpxe'
        }
    });
});

module.exports = router;