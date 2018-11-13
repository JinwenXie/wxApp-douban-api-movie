var newsData = require("../../data/newsdata.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {

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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})