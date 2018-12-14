//获取全局APP里的URL
var app = getApp();
var util = require("../utils/utils.js");

Page({
    data: {
        swiperData: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 1000,
            movieData: []
        },
        top250Movie: {},

    },

    onLoad: function (event) {
        var publicUrl = app.globalData.doubanBase;
        var top250Swiper = publicUrl + "top250" + "?start=0&count=10";
        var top250 = publicUrl + "top250" + "?start=0&count=21";

        wx.showNavigationBarLoading();
        this.getMovieListData(top250Swiper, "top250Swiper", "排行榜", "swiper");
        this.getMovieListData(top250, "top250Movie", "排行榜");
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

    callback: function (res, category, categorytitle, swiperRe) {
        var movies = [];
        var swiperMovie = [];
        for (var idx in res.subjects) {
            var subject = res.subjects[idx];
            if (typeof swiperRe != 'undefined') {
                var swiperTemp = {
                    coverageUrl: subject.images.large,
                    movieId: subject.id
                }
                swiperMovie.push(swiperTemp);
            } else {
                var temp = {
                    stars: util.convertToStarsArray(subject.rating.stars),
                    title: util.cutString(subject.title, 0, 6),
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

    goSearch: function () {
        wx.navigateTo({
            url: '../search/search'
        })
    },

    goList: function () {
        wx.navigateTo({
            url: '../list/list?typeurl=top250&type=排行榜'
        })
    },

    onMovieDetailTap: function (event) {
        var moviwId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-details/movie-details?movieid=' + moviwId
        })
    }
})