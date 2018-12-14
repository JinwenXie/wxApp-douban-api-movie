//获取全局APP里的URL
var app = getApp();
var util = require("../utils/utils.js");

Page({
    data: {
        isFocus: false,
        isCancel: false,
        searchValue: '',
        searchMovie: {}
    },

    onLoad: function (event) {
        var searchUrl = app.globalData.doubanBase + "search?q=猩球崛起";
        this.getMovieListData(searchUrl, "searchMovie", "搜索结果");
        wx.showNavigationBarLoading();
    },

    //请求数据fn
    getMovieListData: function (url, category, categorytitle, swiperRe) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "application/xml"
            }, // 设置请求的 header
            success: function (res) {
                that.callback(res.data, category, categorytitle, swiperRe);
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    callback: function (res, category, categorytitle) {
        var movies = [];
        for (var idx in res.subjects) {
            var subject = res.subjects[idx];
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: util.cutString(subject.title, 0, 6),
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        var readyData = {};
        readyData[category] = {
            categorytitle: categorytitle,
            movies: movies
        };
        this.setData(readyData);

        wx.hideNavigationBarLoading();
    },

    searchIptFocus: function(){
        this.setData({
            isCancel: true
        });
    },

    searchIptBlur: function(){
        this.setData({
            isCancel: false
        });
    },

    iptAccomplish: function(event){
        var key = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "search?q=" + key;
        this.getMovieListData(searchUrl, "searchMovie", "搜索结果");
        wx.showNavigationBarLoading();
    },

    searchIpt: function(event){
        var key = event.detail.value;
        this.setData({
            searchValue: key
        });
        // var searchUrl = app.globalData.doubanBase + "search?q=" + key;
        // this.getMovieListData(searchUrl, "searchMovie", "搜索结果");
        // wx.showNavigationBarLoading();
    },

    searchMovie: function(){
        if(this.data.searchValue.length==0) return false;
        var searchUrl = app.globalData.doubanBase + "search?q=" + this.data.searchValue;
        this.getMovieListData(searchUrl, "searchMovie", "搜索结果");
        wx.showNavigationBarLoading();
    },

    searchCancel: function(){
        this.setData({
            isCancel: false,
            searchValue: ''
        });
    }
})