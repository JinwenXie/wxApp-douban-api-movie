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

//拆分字符串，通过斜杠链接
function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin += casts[idx].name + " / ";
    }
    castsjoin = castsjoin.substring(0, castsjoin.length - 3);
    return castsjoin;
}

//将演员和演员的名字合并成数组处理
function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

function cutString(str,start,end){
    if(typeof(str)!="string") return false;
    if (str.length >= 6) {
        str = str.substring(start, end) + "...";
    }
    return str;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    httpRequest: httpRequest,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos,
    cutString: cutString
}