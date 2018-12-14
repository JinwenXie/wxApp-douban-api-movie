### 豆瓣api接口代理
豆瓣设置了小程序的访问权限，在小程序上直接使用豆瓣api是会报错的；解决方法：

1. 使用某位大佬配置的豆瓣代理（https://douban.uieee.com）
2. 使用Nginx来做代理

我个人是建议使用Nginx来做代理，因为数据比较全面，搜索功能也可以实现，具体如何安装配置请看我这篇文章[为小程序请求豆瓣接口配置nginx](https://jinwenxie.github.io/2018/12/14/%E4%B8%BA%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%AF%B7%E6%B1%82%E8%B1%86%E7%93%A3%E6%8E%A5%E5%8F%A3%E9%85%8D%E7%BD%AENginx.html)

### 克隆到本地

	git@github.com:JinwenXie/wxApp-douban-api-movie.git

直接使用命令克隆下载到本地，或者直接下载压缩文件到本地，先**启动Nginx**，再使用微信开发者工具打开<br>
如果没有使用Nginx的话，微信开发者工具打开项目后，打开app.js文件做如下更改：<br>
![](https://i.imgur.com/HY70LUV.png)<br>

保存刷新后即可看到数据有显示了

### 简介
这是一个通过豆瓣电影API来获取到电影数据的微信小程序,**非常适合作为小程序初学者实战项目！**

### 进程

1. 正在热映电影首页（已完成）；
2. 即将上映电影首页（已完成）；
3. 电影排行榜首页（已完成）；
4. 电影搜索页（已完成）；
5. 电影列表页（已完成）；
6. 电影详情页（暂未完成）；

### 暂时目录结构
	
	wxApp-douban-api-movie:
	│  app.js
	│  app.json
	│  app.wxss
	│  project.config.json
	│  README.md
	│  tree.txt
	│  
	└─pages
	    │  index.js
	    │  index.json
	    │  index.wxml
	    │  index.wxss
	    │  
	    ├─coming-soon
	    │      coming-soon.js
	    │      coming-soon.json
	    │      coming-soon.wxml
	    │      coming-soon.wxss
	    │      
	    ├─data
	    ├─images
	    │      
	    ├─list
	    │      list.js
	    │      list.json
	    │      list.wxml
	    │      list.wxss
	    │      
	    ├─movie-list
	    │  │  movie-list.wxml
	    │  │  movie-list.wxss
	    │  │  
	    │  ├─movie-container
	    │  │      movie-container.wxml
	    │  │      movie-container.wxss
	    │  │      
	    │  └─star
	    │          star.wxml
	    │          star.wxss
	    │          
	    ├─search
	    │      search.js
	    │      search.json
	    │      search.wxml
	    │      search.wxss
	    │      
	    ├─swiper
	    │      swiper.wxml
	    │      swiper.wxss
	    │      
	    ├─top250
	    │      top250.js
	    │      top250.json
	    │      top250.wxml
	    │      top250.wxss
	    │      
	    └─utils
	            utils.js
            

### 页面截图



### 如果您觉得还不错的话，千千万来一个star！
            
