// index.js
// 获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firststation: '广州站',
    laststation: '上海站',
    date: ''
  },


  //自定义函数
  timeShowed() {
    var d = new Date();
    this.setData({
      date: util.formatDate(d)
    })
  },

  doSwap(){
    var temp = this.data.firststation;
    this.setData({
      firststation: this.data.laststation,
      laststation: temp
    })
  },

  doSearch: function (e) {
    var serverUrl = app.serverUrl;
    if (this.data.firststation.length == 0 || this.data.laststation.length == 0) {
      wx.showToast({
        title: '你必须选择始发站和终点站',
        icon: "none",
        duration: 3000
      })
    } else {
      wx.showLoading({
        title: '查询中',
      })
      wx.request({
        url: serverUrl + '/lines/searchLines',
        method: 'GET',
        data: {
          firststation: this.data.firststation,
          laststation: this.data.laststation
        },
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '查询成功',
              icon: "success"
            })
            //将后端返回的用户信息存入缓存中
            wx.setStorageSync('searchInfo', JSON.stringify(res.data))
            wx.navigateTo({
              url: '../search/search'
            })
          } else {
            wx.showToast({
              title: '查询失败',
              icon: "none"
            })
          }
          console.log(res.data);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timeShowed();
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