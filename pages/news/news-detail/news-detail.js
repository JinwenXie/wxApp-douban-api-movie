var newsData = require("../../data/newsdata.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicflag: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var newsId = options.newsid;
        var newsDataItem = newsData.newsData[newsId];
        this.setData(newsDataItem);
        this.setData({
            newsid : newsId
        }); 


        var newsCollected = wx.getStorageSync('newsCollected');
        console.log(this.data.newsid);
        console.log(newsCollected[newsId]);
        if (newsCollected[newsId]) {
            var collected = newsCollected[newsId];
            console.log(newsCollected[newsId]);
            this.setData({
                collected: collected
            });
        } else {
            var newsCollected = {};
            newsCollected[newsId] = false;
            wx.setStorageSync('newsCollected', newsCollected);
        }
        
    },

    collectTap: function(event){
        var newsCollected = wx.getStorageSync('newsCollected');
        var newCollected = newsCollected[this.data.newsid];
        newCollected = !newCollected;
        newsCollected[this.data.newsid] = newCollected;
        //最新的状态放入到缓存中
        wx.setStorageSync('newsCollected', newsCollected);
        //更新当前页面状态
        this.setData({
            collected: newCollected
        })
        wx.showToast({
            title: newCollected ? "收藏成功" : "取消成功",
            duration: 1000
        })
    },

    shareTap: function (event) {
        wx.showActionSheet({
            itemList: [
                "乐章",
                "听过",
                "乐趣",
                "聊聊"
            ],
            itemColor: "#c00",
            success: function (res) {
                wx.showToast({
                    title: "暂时无法前往",
                    duration: 1000
                })
            }
        })
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: '蓝莓派', // 分享标题
            desc: '和音乐一起分享时光', // 分享描述
            path: 'http://www.iwen.wiki/blog' // 分享路径
        }
    },

    playermusic: function(event){
        var currentNewsId = this.data.newsid;
        var musicData = newsData.newsData[currentNewsId].music;
        var musicflag = this.data.musicflag;
        if (musicflag) {
            wx.pauseBackgroundAudio();
            this.setData({
                musicflag: false
            })

        } else {
            wx.playBackgroundAudio({
                dataUrl: musicData.url,
                title: musicData.title,
                coverImgUrl: musicData.coverImg,
            })
            this.setData({
                musicflag: true
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})