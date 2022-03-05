// pages/order/order.js
const wx2 = require('../../utils/common.js')
var app = getApp();
var serverUrl = app.serverUrl;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        getarray: '',
        stationname: '1'
    },

    //自定义函数
    getStationName: function (text) {
        var that = this;

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
        var that = this;
        let pages = getCurrentPages(); //当前页面栈
        let prevPage = pages[pages.length - 2]; //上一页面
        var obj = JSON.parse(wx.getStorageSync('orderInfo'));
        this.setData({
            getarray: obj
        });
        console.log(obj)
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