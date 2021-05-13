var q = require("q");
var db = require("../common/DB");
var conn = db.getConnection();

function addUser(user) {
    if (user) {
        var defer = q.defer();
        conn.query('INSERT INTO taikhoan SET ?', user, function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function themDoiTac(data) {
    if (data) {
        var defer = q.defer();
        conn.query('INSERT INTO doitac SET ?', [data], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function themLinhVucKinhDoanh(data) {
    if (data) {
        var defer = q.defer();
        conn.query('INSERT INTO chitietlinhvuckinhdoanh SET ?', data, function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getIDTK(username) {
    if (username) {
        var defer = q.defer();
        conn.query("SELECT ID_TaiKhoan FROM taikhoan WHERE TenDangNhap=?",[username], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getIDDoiTac(idtk) {
    if (idtk) {
        var defer = q.defer();
        conn.query("SELECT ID_DoiTac FROM doitac WHERE IDTK=?",[idtk], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
module.exports = {
    themDoiTac: themDoiTac,
    addUser: addUser,
    getIDTK: getIDTK,
    themLinhVucKinhDoanh: themLinhVucKinhDoanh,
    getIDDoiTac: getIDDoiTac
}