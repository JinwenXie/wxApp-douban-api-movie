//获取全局APP里的URL
var app = getApp();
var util = require("../utils/utils.js");

Page({
    // RESTFul  API  
    data: {
        //这几个值一定要绑定，异步处理，如果不绑定则找不到对象，所以一定要初始化
        in_theaters: [],
        coming_soon: [],
        top250: []
    },
    onLoad: function(event) {
        var publicUrl = app.globalData.doubanBase;
        var in_theatersUrl = publicUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
        var coming_soonUrl = publicUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = publicUrl + "/v2/movie/top250" + "?start=0&count=3";

        this.getMovieListData(in_theatersUrl, "in_theaters", "正在热映");
        this.getMovieListData(coming_soonUrl, "coming_soon", "即将上映");
        this.getMovieListData(top250Url, "top250", "排行榜");
        wx.showNavigationBarLoading();
    },

    //请求数据fn
    getMovieListData: function(url, category, categorytitle) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "application/xml"
            }, // 设置请求的 header
            success: function(res) {
                that.callback(res.data, category, categorytitle);
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },

    callback: function(res, category, categorytitle) {  
        var movies = [];
        for (var idx in res.subjects) {
            var subject = res.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            //处理评星
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
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

    onMovieTab: function(event){
        var categoryName = event.currentTarget.dataset.categoryname;
        wx.navigateTo({
            url: 'movie-more/movie-more?categoryname=' + categoryName
        });
    },

    onMvieDetails: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-details/movie-details?movieid=' + movieId
        })
    }

})