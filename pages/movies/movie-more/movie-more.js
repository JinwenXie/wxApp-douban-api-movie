// pages/movies/movie-more/movie-more.js
var app = getApp();
var utils = require("../../utils/utils.js");

Page({
    data: {
        movies: [],
        totalMovie: 0
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
        var nextRequestUrl = this.data.doubanUrl + "?start=" + this.data.totalMovie + "&count=20";
        utils.httpRequest(nextRequestUrl, this.callback);
        wx.showNavigationBarLoading();
    },

    callback: function(res){
        console.log(res);
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
        this.setData({
            movies: movies
        });
        this.data.totalMovie += 20;
        wx.hideNavigationBarLoading();
    }
})