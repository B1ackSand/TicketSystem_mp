// pages/information/information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookerid: "",
    name: "请登录",
    username: "",
    gender: "",
    phonenum: "",
    timeofregister: "",
    age: "",
    loginflag: false
  },


  //自定义函数
  jumpToLogin: function (e) {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  checkOrder: function (e) {
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/bookers/' + this.data.bookerid + '/orders',
      method: 'GET',
      data: {
        bookerId: this.data.bookerid
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        if (res.statusCode == 200) {
          //将后端返回的用户信息存入缓存中
          wx.setStorageSync('orderInfo', JSON.stringify(res.data))
          wx.navigateTo({
            url: '../order/order'
          })
        } else {
          wx.showToast({
            title: '当前暂无历史行程',
            icon: "none"
          })
          wx.navigateTo({
            url: '../order/order'
          })
        }
      }
    })

  },

  logOut: function (e) {
    var that = this;
    wx.clearStorage()
    wx.showToast({
      title: '登出成功',
      icon: "success"
    })
    app.sleep(2000)
    this.setData({
      bookerid: '',
      name: '请登录',
      username: '',
      gender: '',
      phonenum: '',
      timeofregister: '',
      age: '',
      loginflag: false
    })
  },

  jumpToReg: function (e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userInfo') != '') {
      let obj = JSON.parse(wx.getStorageSync('userInfo'));
      this.setData({
        bookerid: obj.bookerId,
        name: obj.name,
        username: obj.userName,
        gender: obj.gender == 1 ? "男" : "女",
        phonenum: obj.phoneNum,
        timeofregister: obj.timeOfRegister,
        age: obj.age,
        loginflag: true
      })
    }
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
    this.onLoad()
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