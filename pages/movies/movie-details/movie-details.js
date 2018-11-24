var app = getApp();
var utils = require('../../utils/utils.js');

Page({
    data: {
        movie: {}
    },
    onLoad: function (options) {
        var movieId = options.movieid;
        var subjectUrl = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
        utils.httpRequest(subjectUrl, this.callback);
    },

    callback: function(data){
        console.log(data);
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
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: utils.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: utils.convertToCastString(data.casts),
            castsInfo: utils.convertToCastInfos(data.casts),
            summary: data.summary
        }
        wx.setNavigationBarTitle({
            title: utils.cutString(movie.title,0,6)
        });
        this.setData({
            movie: movie
        })
    }
})