var util = require("../utils/utils.js");
var app = getApp();
Page({
    data: {
        movie: {}
    },
    onLoad: function (options) {
        // 获取url参数
        var movieId = options.movieid;
        // 电影详细信息（条目信息）url
        var url = app.globalData.doubanBase + "subject/" + movieId;
        util.httpRequest(url, this.callback);
    },

    callback: function (data) {
        if (!data) {
            return;
        }
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        wx.setNavigationBarTitle({
            title: data.title
        })
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: util.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),
            castsInfo: util.convertToCastInfos(data.casts),
            summary: data.summary
        }
        this.setData({
            movie: movie
        })
    }

})