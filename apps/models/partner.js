var q = require("q");
var db = require("../common/DB");
var conn = db.getConnection();


//Đăng Ký Đối Tác
//Chèn vào bảng tài khoản
function signUpAccount(TenDangNhap, MatKhau, HoVaTen, SoDienThoai, NgaySinh, Email, GioiTinh, QuocTich, DiaChi) {
    var defer = q.defer();
    var sql = 'INSERT INTO taikhoan (TenDangNhap, MatKhau, HoVaTen, SoDienThoai, NgaySinh, Email, GioiTinh, QuocTich, DiaChi) VALUES ?';
    var values = [TenDangNhap, MatKhau, HoVaTen, SoDienThoai, NgaySinh, Email, GioiTinh, QuocTich, DiaChi];
    conn.query(sql, [values], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}
//Chèn vào bảng đối tác
function signUpPartner(TenDoanhNghiep, MaSoDoanhNghiep, NgayHoatDong, Website, GioiThieuNgan, TrangThai, NgayThamGia, ID_LoaiHinh, ID_TaiKhoan) {
    var defer = q.defer();
    var sql = 'INSERT INTO doitac (TenDoanhNghiep, MaSoDoanhNghiep, NgayHoatDong, Website, GioiThieuNgan, TrangThai, NgayThamGia, ID_LoaiHinh, ID_TaiKhoan) VALUES ?';
    var values = [TenDoanhNghiep, MaSoDoanhNghiep, NgayHoatDong, Website, GioiThieuNgan, TrangThai, NgayThamGia, ID_LoaiHinh, ID_TaiKhoan];
    conn.query(sql, [], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Select Thông tin doanh nghiệp với điều kiện ID Tài Khoản cho trước
function selectInfoConcern(ID_TaiKhoan) {
    var defer = q.defer();
    var sql = 'SELECT * FROM doitac AS DT,loaihinhkinhdoanh as LHKD WHERE DT.IDLoaiHinh = LHKD.IDLoaiHinh AND DT.IDTK = ?';
    conn.query(sql, [ID_TaiKhoan], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Lấy danh sách lĩnh vực kinh doanh của đối tác
function selectListField(ID_DoiTac) {
    var defer = q.defer();
    var sql = 'SELECT * FROM linhvuckinhdoanh AS LVKD,chitietlinhvuckinhdoanh as CTLVKD WHERE LVKD.ID_LinhVuc = CTLVKD.ID_LinhVuc AND CTLVKD.ID_DoiTac = ?';
    conn.query(sql, [ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Lấy danh sách hình ảnh của đối tác từ bảng Hình ảnh đối tác với điều kiện ID Đối tác cho trước
function selectListImages(ID_DoiTac) {
    var defer = q.defer();
    var sql = 'SELECT ID_Anh, LinkAnh, LoaiAnh, ID_DoiTac FROM hinhanhdoitac WHERE ID_DoiTac = ?';
    conn.query(sql, [ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Update lại thông tin tài khoản (bỏ qua 2 cột ảnh CMND) cho bảng Tài Khoản với điều kiện Username cho trước
function updateInfoAccount(user) {
    var defer = q.defer();
    var sql = 'UPDATE taikhoan SET MatKhau = ? HoVaTen = ? SoDienThoai = ? NgaySinh = ? Email = ? GioiTinh = ? HinhDaiDien = ? QuocTich = ? DiaChi = ? WHERE TenDangNhap = ?';
    conn.query(sql, [user], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Update lại ảnh mặt trước, mặt sau CMND cho bảng Tài Khoản với điều kiện Username cho trước
function UpdateImgCMND(user) {
    var defer = q.defer();
    var sql = 'UPDATE taikhoan SET AnhMatTruocCMND = ? AnhMatSauCMND = ? WHERE TenDangNhap = ?';
    conn.query(sql, [user], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Thêm 1 hình mới vào bảng Hình Ảnh Đối Tác với Loại ảnh là 1, tương ứng với ảnh chụp Giấy phép kinh doanh
//Xóa ảnh cũ
function DeleteImg(loaiAnh, ID_DoiTac) {
    var defer = q.defer();
    var sql = 'DELETE FROM hinhanhdoitac WHERE LoaiAnh = ? AND ID_DoiTac = ?';
    conn.query(sql, [loaiAnh, ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}
//Chèn ảnh mới
function InsertImg1(LinkAnh,LoaiAnh, ID_DoiTac) {
    var defer = q.defer();
    var sql = 'INSERT INTO hinhanhdoitac (LinkAnh,LoaiAnh, ID_DoiTac) VALUES ?';
    conn.query(sql, [LinkAnh, LoaiAnh, ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Update ảnh chụp giấy phép kinh doanh với điều kiện Loại ảnh là 1
function UpdateImgGPKD(LoaiAnh, ID_DoiTac) {
    var defer = q.defer();
    var sql = 'UPDATE hinhanhdoitac SET LinkAnh = ? WHERE LoaiAnh = ? AND ID_DoiTac = ?';
    conn.query(sql, [LoaiAnh, ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//12. Thêm 1 hình mới vào bảng Hình Ảnh Đối Tác với Loại ảnh là 2, là ảnh giới thiệu, ảnh hoạt động của Đối Tác
function InsertImg2(LinkAnh, LoaiAnh, ID_DoiTac) {
    var defer = q.defer();
    var sql = 'INSERT INTO hinhanhdoitac (LinkAnh, LoaiAnh, ID_DoiTac) VALUES ?';
    conn.query(sql, [LinkAnh, LoaiAnh, ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//13. Update thông tin doanh nghiệp với điều kiện ID Đối tác cho trước
function UpdateInfoConcern(ID_DoiTac) {
    var defer = q.defer();
    var sql = 'UPDATE doitac AS DT SET TenDoanhNghiep = ? MaSoDoanhNghiep = ? NgayHoatDong = ? Website = ? GioiThieuNgan = ? IDLoaiHinh= ? WHERE ID_DoiTac=?';
    conn.query(sql, [ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//#Cập nhật lại lĩnh vực kinh doanh
//#Xóa hết lĩnh vực kinh doanh cũ của đối tác 1
function DeleteField(ID_DoiTac) {
    var defer = q.defer();
    var sql = 'DELETE FROM chitietlinhvuckinhdoanh WHERE ID_DoiTac=?';
    conn.query(sql, [ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}
//#Tiến hành chèn lĩnh vực mới vào
function InsertField(ID_DoiTac, ID_LinhVuc) {
    var defer = q.defer();
    var sql = 'INSERT INTO chitietlinhvuckinhdoanh (ID_DoiTac, ID_LinhVuc) VALUES ?';
    conn.query(sql, [ID_DoiTac, ID_LinhVuc], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Lấy danh sách chi nhánh của Đối tác cho trước
function selectListBranch(ID_DoiTac) {
    var defer = q.defer();
    var sql = 'SELECT * FROM chinhanh WHERE ID_DoiTac = ?';
    conn.query(sql, [ID_DoiTac], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

