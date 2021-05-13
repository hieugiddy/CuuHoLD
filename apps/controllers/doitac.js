var express = require("express");
var router = express.Router();
var home_md = require("../models/home");
var doitac_md = require("../models/doitac");
var helpers= require("../helpers/helper");

router.get("/",async function(req, res) {
    try {
        var cauHinh = await home_md.getThongTinHeThong().then(data=>data);
        res.render("doitac", {
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
                'messenger':''
            }
        });
    }
    catch (e) {
        res.json({ "Messenger": e });
    }
});
router.post('/',async function(req,res){
    var data=req.body;
    try {
        if (data.password!=data.againPassword)
            throw 'Mật khẩu không giống nhau';
        if (!helpers.usernameValidation(data.username))
            throw 'Tên đăng nhập không hợp lệ';
        if (!helpers.passwordValidation(data.password))
            throw 'Mật khẩu sai định dạng';
        if (!helpers.telephoneValidation(data.sdt))
            throw 'Số điện thoại sai định dạng';
        var ngay=data.ngaysinh.split('-');
        ngay=ngay[2]+'-'+ngay[1]+'-'+ngay[0];
        users = {
            TenDangNhap: data.username,
            MatKhau: data.password,
            HoVaTen: data.hoten,
            SoDienThoai: data.sdt,
            Email: data.email,
            GioiTinh: data.gioitinh,
            NgaySinh: ngay,
            DiaChi: data.diachithuongtru,
            LoaiTK: 1
        }
        var result = doitac_md.addUser(users);
        if (!result)
            res.json({ "Messenger": "Đã có lỗi xảy ra" });
        else
            result.then(async function (dl) {
               
                var idTK=await doitac_md.getIDTK(data.username);
                var ngayhoatdong=data.ngayhoatdong.split('-');
                ngayhoatdong=ngayhoatdong[2]+'-'+ngayhoatdong[1]+'-'+ngayhoatdong[0];
                var DoiTac={
                    MaSoDoanhNghiep: data.maso,
                    TenDoanhNghiep: data.tendoanhnghiep,
                    IDLoaiHinh: data.loaihinh,
                    NgayHoatDong: ngayhoatdong,
                    Website: data.website,
                    GioiThieuNgan: data.gioithieu,
                    IDTK: idTK[0].ID_TaiKhoan,
                    TrangThai: 0
                }
                
                var themDT=await doitac_md.themDoiTac(DoiTac);
                
                var idDT=await doitac_md.getIDDoiTac(idTK[0].ID_TaiKhoan);
                let kq = await Promise.all(data.loaidichvu.map(async item => {
                    var themLV=await doitac_md.themLinhVucKinhDoanh({ID_DoiTac: idDT[0].ID_DoiTac, ID_LinhVuc: item})
                })).then(dt => dt);

                res.redirect("//partner.cuuhoxedn.net");
            }).catch(function (err) {
                if (err.code == "ER_DUP_ENTRY")
                    res.json({ "Messenger": "Tên đăng nhập đã tồn tại" });
                else
                    res.json({ "Messenger": "Thông tin nhập vào không chính xác" });
            })
    }
    catch (e) {
        res.json({ "Messenger": e });
    }
})
module.exports = router;