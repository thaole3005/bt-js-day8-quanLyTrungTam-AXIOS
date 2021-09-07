

function getEle(id) {
    return document.getElementById(id);
}


function Validation() {
    //chứa các phương thức validation

    //kiểm tra rỗng
    this.checkEmpty = function(inputValue, spanID, message) {
        if(inputValue.trim() === "") { //không hợp lệ
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        } else {
            getEle(spanID).parentElement.classList.add("d-none");
            return true;

        }
    }


    //check trùng tài khoản
    this.checkExist = function(inputValue, spanID, message, danhSachUser) {
        // console.log("danhSachUser in validation", danhSachUser);  
        //!danhSachUser ở đây chính là response.data của hàm getDanhSachUser
        let isExist = false;
        isExist = danhSachUser.some(function(user, index) {
            return user.taiKhoan === inputValue;
        })

        if(isExist) { //không hợp lệ
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        }
        getEle(spanID).parentElement.classList.add("d-none");
        return true;
    }


    this.checkName = function(inputValue, spanID, message) {
        const pattern ="^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + 
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        const regex = new RegExp(pattern);
        if(inputValue.match(regex)) {
            //hợp lệ
            getEle(spanID).parentElement.classList.add("d-none");
            return true;
        } else {
            //không hợp lệ
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        }

    }


    this.checkPassword = function(inputValue, spanID, message) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(regex.test(inputValue)) {
            //hợp lệ
            getEle(spanID).parentElement.classList.add("d-none");
            return true;
        } else {
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        }
    }





    this.checkEmail = function(inputValue, spanID, message) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(regex.test(inputValue)) {
            //hợp lệ
            getEle(spanID).parentElement.classList.add("d-none");
            return true;
        } else {
            //không hợp lệ
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        }
    }



    this.checkDropDown = function(selectID, spanID, message) {
        let index =0;
  
        index = getEle(selectID).selectedIndex;
        if(index > 0) {
            //hợp lệ
            getEle(spanID).parentElement.classList.add("d-none");
            return true;
        } else{
            //không hợp lệ
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        }
    }


    this.checkLengthMoTa = function(inputValue, spanID, message, maxlength) {
        if(inputValue.trim().length > maxlength) {
            //không hợp lệ
            getEle(spanID).parentElement.classList.remove("d-none");
            getEle(spanID).innerHTML = message;
            return false;
        } else {
                //hợp lệ
                getEle(spanID).parentElement.classList.add("d-none");
                return true;
        }
    }




}