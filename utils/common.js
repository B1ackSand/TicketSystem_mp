const requestSync = (_url, _data, _method, _callcomplete)=>{
    let pro = new Promise(function(resolve, reject) {
      wx.request({
        url: _url,
        data:_data,
        method:_method,
        header: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        success:function(res){
          if(res.statusCode==200){
            resolve(res); //任务成功就执行resolve(),其他情况下都执行reject()
          }
          else{
            reject(res); //响应失败就执行reject()
          }
        },
        fail:function(res){
          reject(res); //API执行失败也执行reject()
        },
        complete:function(res){
          if(_callcomplete) {_callcomplete(res);} //如果有回调函数在执行完成后要调用回调函数
        }
      })
  
    });
    return pro;
  }
  
  //暴露接口供外部调用
  module.exports = {
    requestSync: requestSync
  }