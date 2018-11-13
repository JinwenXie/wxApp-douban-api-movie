var newsData = require("../data/newsdata.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        circular: true,
        previousMargin: "20px",
        nextMargin: "20px"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            newsData: newsData.newsData
        });
    },

    goNewsDetail: function(event){
        var newsId = event.currentTarget.dataset.newsid
        wx.navigateTo({
            url: 'news-detail/news-detail?newsid=' + newsId
        });
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