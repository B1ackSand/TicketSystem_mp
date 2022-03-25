// pages/login/login.js
var app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    phonenum: "",
    password: "",
    cardid:""
  },

  //自定义函数
  doLogin: function (e) {
    var serverUrl = app.serverUrl;
    if (this.data.phonenum.length === 0 || this.data.password.length === 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: "none",
        duration: 3000
      })
    } else {
      wx.showLoading({
        title: '登陆ing',
      })
      wx.request({
        url: serverUrl + '/bookers/login',
        method: 'POST',
        data: {
          phonenum: this.data.phonenum,
          bookerpwd: this.data.password,
          cardid: this.data.cardid
        },
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          if (res.statusCode === 200) {
            wx.showToast({
              title: '登陆成功',
              icon: "success"
            })
            //将后端返回的用户信息存入缓存中
            wx.setStorageSync('userInfo', JSON.stringify(res.data))
            app.sleep(2000)
            wx.reLaunch({
              url: '../information/information',
            })
          } else {
            wx.showToast({
              title: '登陆失败',
              icon: "none"
            })
          }
          console.log(res.data);
        }
      })
    }
  },

  //返回上一页


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
    wx.navigateBack({
      delta: 2
    })
    this.setData({
      phonenum: this.data.phonenum,
      password: this.data.password,
      cardid: this.data.cardid
    })
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
