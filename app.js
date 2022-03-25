// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  //服务器的路径
  // serverUrl: "https://ticket.blacksand.top/api",
  serverUrl: "http://localhost:7162/api",
  // //该函数为将用户信息存入手机的缓存中
  // setGlobalUserInfo:function(user){
  //   wx.setStorageSync("userInfo", user);
  // },
  // //从缓存中取出用户信息
  // getGlobalUserInfo: function (key) {
  //   return wx.getStorageSync(key);
  // },

  sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  },

  globalData: {
    userInfo: null
  }
})