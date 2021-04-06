var q = require("q");
var db = require("../common/DB");
var conn = db.getConnection();


//Select danh sách tài khoản với user, pass (Chức năng đăng nhập)
function selectListAccount(user, pass) {
    var defer = q.defer();
    var sql = 'SELECT * FROM taikhoan WHERE TenDangNhap = ? and MatKhau = ?';
    conn.query(sql, [user, pass], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Select danh sách với user (Chức năng quên mật khẩu)
function forgotPassword(user) {
    var defer = q.defer();
    var sql = 'SELECT * FROM taikhoan WHERE TenDangNhap = ?';
    conn.query(sql, [user], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

//Update mật khẩu cho tài khoản (Chức năng khôi phục mật khẩu mật khẩu)
function updatePassword(user, newPass) {
    var defer = q.defer();
    var sql = 'UPDATE taikhoan SET MatKhau = ? WHERE TenDangNhap = ?';
    conn.query(sql, [user, newPass], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}