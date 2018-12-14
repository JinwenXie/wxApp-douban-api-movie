//获取全局APP里的URL
var app = getApp();
var util = require("../utils/utils.js");

Page({
    data: {
        listMovie: {},
        dataCount: 0,
        isMoviesNull: true,
        isRequire: true
    },

    onLoad: function (option) {
        var listUrl = app.globalData.doubanBase;
        var movieListUrl = listUrl + option.typeurl;
        wx.setNavigationBarTitle({
            title: option.type
        })
        if (option.typeurl == 'search'){
            listUrl += option.typeurl + "?tag=" + option.type +"&start=0&conut=20";
        } else {
            listUrl += option.typeurl + "?start=0&conut=20";
        }
        this.getMovieListData(listUrl, "listMovie", option.type);
        wx.showNavigationBarLoading();
        this.setData({
            movieListUrl: movieListUrl,
            typeurl: option.typeurl,
            typename: option.type
        });
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
                if (res.data.subjects.length!=0){
                    that.callback(res.data, category, categorytitle, swiperRe);
                } else {
                    wx.hideNavigationBarLoading();
                    that.setData({
                        isRequire: false
                    });
                }
            },
            fail: function () {
                
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
        //存储合并之后的数据
        var allMovies = {};
        var dataCountAdd = this.data.dataCount += 20;
        if (!this.data.isMoviesNull) {
            //合并老的数据
            allMovies = this.data.listMovie.concat(movies);
        } else {
            this.setData({
                isMoviesNull: false
            })
            allMovies = movies;
        }
        this.setData({
            //在这里记得初始化movies
            listMovie: allMovies,
            //处理数据请求的累加
            dataCount: dataCountAdd
        })

        wx.hideNavigationBarLoading();
    },

    onReachBottom: function(){
        if (!this.data.isRequire) return false;
        var listUrl = this.data.movieListUrl;
        if (this.data.typeurl == 'search'){
            listUrl += "?tag=" + this.data.typename + "&start=" + this.data.dataCount +"&conut=20";
        } else {
            listUrl += "?start=" + this.data.dataCount +"&conut=20";
        }
        this.getMovieListData(listUrl, "listMovie", this.data.type);
        wx.showNavigationBarLoading();
    }
});