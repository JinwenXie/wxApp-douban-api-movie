// pages/movies/movie-more/movie-more.js
var app = getApp();
var utils = require("../../utils/utils.js");

Page({
    data: {
        movies: [],
        requestStartNum: 0,
        totalMovie: [],
        isEmpty: true
    },

    onLoad: function (options) {
        this.setData({
            categoryName: options.categoryname
        });
        var publicUrl = app.globalData.doubanBase;
        var doubanUrl = '';
        switch (options.categoryname){
            case '正在热映':
                doubanUrl = publicUrl + '/v2/movie/in_theaters';
                break;
            case '即将上映':
                doubanUrl = publicUrl + '/v2/movie/coming_soon';
                break;
            case '排行榜':
                doubanUrl = publicUrl + '/v2/movie/top250';
                break;
        }
        this.setData({
            doubanUrl: doubanUrl
        });
        utils.httpRequest(doubanUrl,this.callback);
        wx.showNavigationBarLoading();
    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.categoryName
        })
    },

    onReachBottom: function(event){
        console.log(this.data.totalMovie);
        var nextRequestUrl = this.data.doubanUrl + "?start=" + this.data.requestStartNum + "&count=20";
        utils.httpRequest(nextRequestUrl, this.callback);
        wx.showNavigationBarLoading();
    },

    onPullDownRefresh: function(){
        var doubanUrl = this.data.doubanUrl;
        this.data.totalMovie = [];
        this.data.isEmpty = false;
        utils.httpRequest(doubanUrl, this.callback);
    },

    callback: function(res){
        var movies = [];
        for (var idx in res.subjects) {
            var subject = res.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            //处理评星
            var temp = {
                stars: utils.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        var totalMovie = [];
        if (this.data.isEmpty) {
            totalMovie = movies;
            this.data.isEmpty = false;
        } else {
            totalMovie = this.data.movies.concat(movies);
        }
        this.setData({
            movies: totalMovie
        });
        this.data.requestStartNum += 20;
        wx.hideNavigationBarLoading();
    },

    onMvieDetails: function(event){
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-details/movie-details?movieid=' + movieId
        })
    }
})