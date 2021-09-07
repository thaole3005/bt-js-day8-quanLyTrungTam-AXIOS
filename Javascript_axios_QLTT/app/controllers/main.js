
//khởi tạo instance của function constructor UserService
var userService = new UserService();

//khởi tạo instance của function constructor Validation
var validation = new Validation();


//mảng danh sách user mỗi khi lấy về
let danhSachUser = [];

function getEle(id) {
    return document.getElementById(id);
}


function getDanhSachUser() {
    userService.getDsachUser()  //nhận về 1 promise do axios trả về
        .then(function (response) {
            console.log(response.data);
            danhSachUser = response.data;

            hienThiTable(response.data);
            
        })
        .catch(function (err) {
            console.log(err);
        })
}

getDanhSachUser();



function hienThiTable(mangUser) {
    let content = '';
    mangUser.forEach(function (user, index) {
        content += `
            <tr>
                <td>${index +1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class = " btn btn-info"
                    data-toggle="modal" data-target="#myModal"
                    onClick = "xemChiTiet('${user.id}')"
                    >Xem Chi Tiết</button>
                    <button class = " btn btn-danger"
                    onClick = "xoaUser('${user.id}')"
                    >Xóa</button>
                </td>
            </tr>
        `
    })

    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}



function addUser() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    //biến valid chứa kết quả cuối cùng sau khi validation
    //! chỉ khi tất cả mọi trường đều đúng validation thì mới tạo ra đối tượng newUser và call API
    let valid =true;

    //-------trường tài khoản-----
    valid &= validation.checkEmpty(taiKhoan,"txtTaiKhoan", "Tài khoản không được để trống")
            && validation.checkExist(taiKhoan,"txtTaiKhoan","Tài khoản này đã tồn tại",danhSachUser)


    //-------trường họ tên-----
    valid &=  validation.checkEmpty(hoTen,"txtHoTen", "Họ Tên không được để trống")
            &&validation.checkName(hoTen,"txtHoTen", "Họ Tên không được chứa số và ký tự đặc biệt");


    //-------trường mật khẩu-----
    valid &=  validation.checkEmpty(matKhau,"txtMatKhau", "Mật khẩu không được để trống")
    &&validation.checkPassword(matKhau,"txtMatKhau", "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký  số, độ dài 6-8");


     //-------trường email-----
    valid &=  validation.checkEmpty(email,"txtEmail", "Email không được để trống")
    &&validation.checkEmail(email,"txtEmail", "Email không hợp lệ");


    //-------trường hình ảnh--------
    valid &=  validation.checkEmpty(hinhAnh,"txtHinhAnh", "Hình ảnh không được để trống");

    //-------trường loại người dùng---------
    valid &=  validation.checkDropDown("loaiNguoiDung","txtLoaiND", "Bạn chưa chọn loại người dùng");


    //-------trường loại ngôn ngữ---------
    valid &=  validation.checkDropDown("loaiNgonNgu","txtNgonNgu", "Bạn chưa chọn loại ngôn ngữ");


    //trường mô tả
    valid &=  validation.checkEmpty(moTa,"txtMoTa", "mô tả không được để trống")
                &&validation.checkLengthMoTa(moTa,"txtMoTa", "mô tả không được quá 60 kí tự", 60);







    if(valid) {

        var newUser = new User(taiKhoan, hoTen,  matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
        console.table(newUser);
        userService.addUser(newUser)    //nhận về 1 promise do axios trả về 1 promise do axios trả về
            .then(function(response) {
                console.log(response.data);
                getDanhSachUser();
            })
            .catch(function(err) {
                console.log(err);
            })
    
        //*sau khi thêm user thành công thì đóng form
        document.querySelector(".modal .close").click();
    }
}



//* khi click vào button thêm mới thì clear data cũ của form và  tạo nút thêm người dùng
getEle("btnThemNguoiDung").addEventListener("click", function() {

    let inputArrays = document.querySelectorAll(".modal-body .form-control");
    for(let input of inputArrays) {
        input.value = "";
    }

    getEle("loaiNguoiDung").selectedIndex = 0;
    getEle("loaiNgonNgu").selectedIndex = 0;

    //display none toàn bộ thông báo lỗi sai
    let pTagErrors = document.querySelectorAll(".form-group p");
    for (let tag_p of pTagErrors) {
        tag_p.classList.add("d-none");
    }


    //đôi heading title của modal
    document.querySelector(".modal-header .modal-title").innerHTML = "Thêm người dùng";

    //disabled false cho trường tài khoản
    getEle("TaiKhoan").disabled = false;

    document.querySelector(".modal-footer").innerHTML = `
        <button class = "btn btn-info"
            onclick = "addUser()"
        >Thêm người dùng</button>
    `
})


function xemChiTiet (id) {

     //đôi heading title của modal
     document.querySelector(".modal-header .modal-title").innerHTML = "Cập nhật người dùng";

     //disabled trường tài khoản
    getEle("TaiKhoan").disabled = true;


    userService.getInfor1User(id)  //nhận về 1 promise do axios trả về
        .then(function (response) {
            let user = response.data;
            getEle("TaiKhoan").value = user.taiKhoan;
            getEle("HoTen").value = user.hoTen;
            getEle("MatKhau").value = user.matKhau;
            getEle("Email").value = user.email;
            getEle("HinhAnh").value = user.hinhAnh;
            getEle("loaiNguoiDung").value = user.loaiND;
            getEle("loaiNgonNgu").value = user.ngonNgu;
            getEle("MoTa").value = user.moTa;

            document.querySelector(".modal-footer").innerHTML = `
                <button class = "btn btn-success"
                    onclick = "updateUser('${id}')"
                >Cập nhật người dùng</button>
            `
            

        })
        .catch(function(err) {
            console.log(err);
        })
}


function updateUser(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;



    //! chỉ khi tất cả mọi trường đều đúng validation thì mới tạo ra đối tượng updateUser và call API
    let valid =true;

    //-------trường tài khoản-----
    //không cần validation trường này vì trường này không đc thay đỏi

    //-------trường họ tên-----
    valid &=  validation.checkEmpty(hoTen,"txtHoTen", "Họ Tên không được để trống")
            &&validation.checkName(hoTen,"txtHoTen", "Họ Tên không được chứa số và ký tự đặc biệt");


    //-------trường mật khẩu-----
    valid &=  validation.checkEmpty(matKhau,"txtMatKhau", "Mật khẩu không được để trống")
    &&validation.checkPassword(matKhau,"txtMatKhau", "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký  số, độ dài 6-8");


     //-------trường email-----
    valid &=  validation.checkEmpty(email,"txtEmail", "Email không được để trống")
    &&validation.checkEmail(email,"txtEmail", "Email không hợp lệ");


    //-------trường hình ảnh--------
    valid &=  validation.checkEmpty(hinhAnh,"txtHinhAnh", "Hình ảnh không được để trống");

    //-------trường loại người dùng---------
    valid &=  validation.checkDropDown("loaiNguoiDung","txtLoaiND", "Bạn chưa chọn loại người dùng");


    //-------trường loại ngôn ngữ---------
    valid &=  validation.checkDropDown("loaiNgonNgu","txtNgonNgu", "Bạn chưa chọn loại ngôn ngữ");


    //trường mô tả
    valid &=  validation.checkEmpty(moTa,"txtMoTa", "mô tả không được để trống")
                &&validation.checkLengthMoTa(moTa,"txtMoTa", "mô tả không được quá 60 kí tự", 60);





    if(valid) {
        
        var updateUser = new User(taiKhoan, hoTen,  matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
        userService.updateUser(updateUser, id) //nhận về 1 promise do axios trả về
            .then(function (response) {
                console.log(response.data);
                getDanhSachUser();

            })
            .catch(function (err) {
                console.log(err);
            })

            //*sau khi cập nhật user thành công thì đóng form
            document.querySelector(".modal .close").click();
    }








}




function xoaUser(id) {
    userService.xoaUser(id)    //nhận về 1 promise do axios trả về
    .then(function (response) {
        console.log(response.data);
        getDanhSachUser();

    })
    .catch(function (err) {
        console.log(err);
    })
}