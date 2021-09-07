
//File này chỉ dùng để kết nối api, còn xử lý api thành công hay thất bại thì xử lí tại file main

function UserService() {

    this.getDsachUser = function() {
        return axios({
            url: "https://6136efc48700c50017ef5712.mockapi.io/Users",
            method: "GET",
        })
    }


    this.addUser = function(newUser) {
        return axios({
            url: "https://6136efc48700c50017ef5712.mockapi.io/Users",
            method: "POST",
            data: newUser,
        })
    }


    this.getInfor1User = function(id) {
        return axios({
            url: `https://6136efc48700c50017ef5712.mockapi.io/Users/${id}`,
            method: "GET",
        })
    }


    this.updateUser = function(updatedUser, id) {
        return axios({
            url: `https://6136efc48700c50017ef5712.mockapi.io/Users/${id}`,
            method: "PUT",
            data: updatedUser,
        })
    }


    this.xoaUser = function(id) {
        return axios({
            url: `https://6136efc48700c50017ef5712.mockapi.io/Users/${id}`,
            method: "DELETE",
        })
    }


}