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
        IntheatersMovie: {}
    },

    onLoad: function (event) {
        var publicUrl = app.globalData.doubanBase;
        var in_theatersUrl = publicUrl + "in_theaters" + "?start=0&count=10";
        var intheaters = publicUrl + "in_theaters" + "?start=0&count=21";

        wx.showNavigationBarLoading();
        this.getMovieListData(in_theatersUrl, "in_theaters", "正在热映","swiper");
        this.getMovieListData(intheaters, "IntheatersMovie", "正在热映");
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
            if (typeof swiperRe != 'undefined') {
                swiperMovie.push(subject.images.medium);
            } else {
                var temp = {
                    stars: util.convertToStarsArray(subject.rating.stars),
                    title: util.cutString(subject.title,0,6),
                    average: subject.rating.average,
                    coverageUrl: subject.images.large,
                    movieId: subject.id
                }
                movies.push(temp);
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
    },

    goSearch: function(){
        wx.navigateTo({
            url: 'search/search'
        })
    }

})