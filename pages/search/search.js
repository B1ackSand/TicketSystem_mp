// pages/search/search.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: '',
        currentarray: '',
        startTerminal: '',
        endTerminal: '',
        startTerminalid: '',
        endTerminalid: '',
        trainid: '',
        date: '',
        show: false,
        obj: '',
        policy: '',
        iknow: true,
        distance: '',
        price: '',
        departureTime: '',
        dateBook: ''
    },

    //自定义函数
    handleIncorrectData() {
        if (wx.getStorageSync('searchInfo') != '') {
            var obj = JSON.parse(wx.getStorageSync('searchInfo'));

            var needHandle = new Array();

            // console.log(this.toArray(obj[2].stopStation).toString())
            // console.log(this.toArraySort(obj[3].stopStation).toString())

            for (var i = 0; i < obj.length; i++) {
                var sta = this.toArray(obj[i].stopStation).toString();
                for (var j = i + 1; j < obj.length; j++) {
                    var arr = this.toArraySort(obj[j].stopStation).toString();
                    if (sta == arr) {
                        if (this.toArray(obj[i].stopStation).indexOf(this.data.startTerminal) >
                            this.toArray(obj[j].stopStation).indexOf(this.data.startTerminal)) {
                            needHandle.unshift(i);
                        } else {
                            needHandle.unshift(j);
                        }
                    }
                }
            }

            // console.log(needHandle)

            for (var i = 0; i < needHandle.length; i++) {
                obj.splice(needHandle[i], 1);
            }

            this.setData({
                array: obj
            })

            // console.log(obj)
            // console.log(obj.length)
            //两条相反路线，起点站位置小的则为正确路线
            // console.log(obj[0].stopStation.split(',').indexOf("广州站"))
        }
    },

    showPolicy() {
        this.setData({
            policy: '加载中...'
        })
        wx.request({
            url: 'https://wx.wind.com.cn/alert/traffic/getPolicy',
            method: 'GET',
            data: {
                city: this.data.endTerminal.substring(0, this.data.endTerminal.length - 1)
            },
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    // console.log(res)
                    this.setData({
                        policy: res.data.data.enterPolicy
                    })
                } else {
                    wx.showToast({
                        title: '失败',
                        icon: "none"
                    })
                }
            }
        })
    },

    popUp: function (e) {
        var serverUrl = app.serverUrl;
        var idx = parseInt(e.currentTarget.dataset.index)
        this.setData({
            currentarray: this.data.array[idx],
            show: true
        })

        wx.request({
            url: serverUrl + '/train',
            method: 'GET',
            data: {
                trainName: this.data.currentarray.trainName,
            },
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    this.setData({
                        trainid: res.data.trainId
                    })
                } else {
                    wx.showToast({
                        title: '失败',
                        icon: "none"
                    })
                }
            }
        })

        wx.request({
            url: app.serverUrl + '/getdistance',
            method: 'GET',
            data: {
                stopStation: this.data.currentarray.stopStation,
                startTerminal: this.data.currentarray.startTerminal,
                endTerminal: this.data.currentarray.endTerminal,
                typeOfTrain: this.data.currentarray.trainName
            },
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    this.setData({
                        distance: res.data.distance,
                        price: res.data.price.toFixed(2),
                        departureTime: res.data.departureTime
                    })
                } else {
                    wx.showToast({
                        title: '失败',
                        icon: "none"
                    })
                }
            }
        })
    },

    popDown() {
        this.setData({
            show: false
        })
    },

    iKnowPolicy() {
        this.setData({
            iknow: false
        })
    },

    doBook: function (e) {
        var serverUrl = app.serverUrl;
        if (this.data.obj.bookerId === undefined) {
            wx.showToast({
                title: '你还未登录！',
                icon: "none",
                duration: 3000
            })
            app.sleep(3000)
            wx.redirectTo({
                url: '../login/login',
            })
        } else {
            wx.showLoading({
                title: '订票中',
            })

            wx.request({
                url: serverUrl + '/bookers/' + this.data.obj.bookerId + '/orders',
                method: 'POST',
                data: {
                    bookerId: this.data.obj.bookerId,
                    trainId: this.data.trainid,
                    startTerminalId: this.data.startTerminalid,
                    endTerminalId: this.data.endTerminalid,
                    price: this.data.price,
                    dateBook: this.data.date + ' ' + this.data.departureTime
                },
                header: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                success: (res) => {
                    if (res.statusCode == 201) {
                        wx.showToast({
                            title: '购买成功',
                            icon: "success"
                        })
                        app.sleep(2000)
                        wx.navigateBack({
                            delta: 2,
                        })
                    } else {
                        wx.showToast({
                            title: '购买失败',
                            icon: "none"
                        })
                    }
                    console.log(res.statusCode);
                }
            })
        }
    },


    toArraySort: function (text) {
        return text.split(',').reverse();
    },

    toArray: function (text) {
        return text.split(',');
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var serverUrl = app.serverUrl;
        let pages = getCurrentPages(); //当前页面栈
        let prevPage = pages[pages.length - 2]; //上一页面
        this.setData({
            startTerminal: prevPage.data.firststation,
            endTerminal: prevPage.data.laststation,
            date: prevPage.data.date
        });

        this.showPolicy();
        this.handleIncorrectData();
        wx.request({
            url: serverUrl + '/stations/stationName',
            method: 'GET',
            data: {
                stationName: this.data.startTerminal,
            },
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    this.setData({
                        startTerminalid: res.data.stationId
                    })
                } else {
                    wx.showToast({
                        title: '失败',
                        icon: "none"
                    })
                }
            }
        })

        wx.request({
            url: serverUrl + '/stations/stationName',
            method: 'GET',
            data: {
                stationName: this.data.endTerminal,
            },
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    this.setData({
                        endTerminalid: res.data.stationId
                    })
                } else {
                    wx.showToast({
                        title: '失败',
                        icon: "none"
                    })
                }
            }
        })
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
        if (wx.getStorageSync('userInfo') != '') {
            let obj = JSON.parse(wx.getStorageSync('userInfo'));
            this.setData({
                obj: obj
            })
        }
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