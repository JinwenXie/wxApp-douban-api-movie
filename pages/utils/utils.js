//星星返回数据格式：[1,1,1,1,1,][1,1,1,,0,0]
function convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        }
        else {
            array.push(0);
        }
    }
    return array;
}

function httpRequest(url, callback) {
    var that = this;
    wx.request({
        url: url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "Content-Type": "application/xml"
        }, // 设置请求的 header
        success: function (res) {
            callback(res.data);
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    httpRequest: httpRequest
}