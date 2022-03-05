// pages/register/register.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phonenum: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        gender: '',
        dateofbirth: ''
    },

    //自定义函数
    doRegist: function (e) {
        if (this.data.phonenum.length == 0 || this.data.password.length == 0) {
            wx.showToast({
                title: '手机号或密码不能为空',
                icon: "none",
                duration: 3000
            })
        } else {
            //获取URI
            var serverUrl = app.serverUrl;
            wx.request({
                url: serverUrl + '/bookers',
                method: 'POST',
                data: {
                    bookerWx: "0",
                    userName: this.data.username,
                    bookerPwd: this.data.password,
                    phoneNum: this.data.phonenum,
                    firstName: this.data.firstname,
                    lastName: this.data.lastname,
                    gender: this.data.gender,
                    dateOfBirth: this.data.dateofbirth
                },
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                success: function (res) {
                    console.log(res)
                    if (res.statusCode == 201) {
                        wx.showToast({
                            title: '恭喜你，注册成功',
                            icon: "none",
                            duration: 3000
                        })
                        app.sleep(2000)
                        wx.switchTab({
                            url: '../information/information'
                        })
                    } else {
                        wx.showToast({
                            title: '发生意料外的错误',
                            icon: "none",
                            duration: 3000
                        })
                    }
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})