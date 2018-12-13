//获取全局APP里的URL
var app = getApp();
var util = require("utils/utils.js");

Page({
    data: {
        swiperData: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 1000,
            movieData: []
        },
        BeiJingMovie: {},
        ShangHaiMovie: {},
        GuangZhouMovie: {}

    },

    onLoad: function (event) {
        var publicUrl = app.globalData.doubanBase;
        var in_theatersUrl = publicUrl + "in_theaters" + "?start=0&count=10";
        var comedy = publicUrl + "in_theaters" + "?city=北京&start=0&count=3";
        var campus = publicUrl + "in_theaters" + "?city=广州&start=0&count=3";
        var scienceFiction = publicUrl + "in_theaters" + "?city=上海&start=0&count=3";

        wx.showNavigationBarLoading();
        this.getMovieListData(in_theatersUrl, "in_theaters", "正在热映","swiper");
        this.getMovieListData(comedy, "BeiJingMovie", "北京");
        this.getMovieListData(campus, "GuangZhouMovie", "广州");
        this.getMovieListData(scienceFiction, "ShangHaiMovie", "上海");
    },

    //请求数据fn
    getMovieListData: function (url, category, categorytitle,swiperRe) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "application/xml"
            }, // 设置请求的 header
            success: function (res) {
                that.callback(res.data, category, categorytitle,swiperRe);
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    callback: function (res, category, categorytitle,swiperRe) {
        var movies = [];
        var swiperMovie = [];
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
            if (typeof swiperRe != 'undefined'){
                swiperMovie.push(subject.images.medium);        
            }
        }

        if (typeof swiperRe != 'undefined') {
            var param = {};
            // 设置data对象里面的数组
            param["swiperData.movieData"] = swiperMovie
            this.setData(param);
        } else {
            var readyData = {};
            readyData[category] = {
                categorytitle: categorytitle,
                movies: movies
            };
            this.setData(readyData);
        }

        wx.hideNavigationBarLoading();
    }
})