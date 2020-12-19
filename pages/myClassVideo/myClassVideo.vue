<template>
	<view class="container">
		<view class="course">
			<view class="video" v-if="videoShow">
				<video 
				v-if="videoPath" 
				:src="videoPath" 
				enable-auto-rotation="true" 
				autoplay="true" 
				controls 
				@ended="videoEnded"
				@timeupdate="setCurrentTime"
				:initial-time="current"></video>
			</view>
			<view v-else="videoShow" class="videoEnd">
				<view class="content">
					<view class="text">该视频已完成</view>
					<view class="btns">
						<button class="btn" @tap="replay"><van-icon class="iconfont" class-prefix="my-icon" name="chongbo" />重学一遍</button>
						<button class="btn" @tap="nextVideo" v-if="btnShow">观看下一节<van-icon class="iconfont" class-prefix="my-icon" name="xiayijie" /></button>
					</view>
				</view>
			</view>
			<view class="info">
				<view class="title">{{title}}</view>
				<view class="nav">
					<view class="looked">已看{{proCount}}</view>
					<view :class="[collect_state ? 'collect-check' : '','collect']" @tap="onCollect" >
						<icon class="iconfont my-icon-shoucang"></icon>
						收藏
					</view>
					<view class="cache" @tap="onCache">
						<icon class="iconfont my-icon-huancun"></icon>
						缓存
					</view>
					<view class="answer" @tap="onAnswer">
						<icon class="iconfont my-icon-dayi"></icon>
						答疑
					</view>
				</view>
			</view>
		</view>
		<view class="learn-box">
			<view class="catalog">目录</view>
			<view class="learn-list">
				<van-collapse :value="activeNames" @change="onChange" icon="">
				  <van-collapse-item 
					  v-for="(item,index) in goodVideos.content" 
					  :title="item.section" 
					  :value="arrs[index].progress + '/' + item.value.length" 
					  :name="index + 1"
					  :key="item.section"
					  :title-class="sec_selected===index ? 'active' : ' '"
					  :value-class="sec_selected===index ? 'active' : ' '"
					  >
				    <view 
						class="cell"
						v-for="(video,idx) in item.value" 
						:key="video.id"
						@tap="changeVideo(video.path,index,idx)"
						:class="vid_selected === idx && sec_selected===index ? 'active' : ' '">
						<icon class="iconfont my-icon-video"></icon>
						{{idx+1 + '. ' + video.name}}
						<icon class="iconfont my-icon-xiazai"></icon>
					</view>
				  </van-collapse-item>
				</van-collapse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeNames:'',
				collect_state:false,
				development:this.development,
				SERVER:this.server,
				btnShow:true,		//按钮是否显示
				videoShow:true,		//video是否显示
				goodVideos:null,	//当前课程全部视频
				videoPath:null,		//视频地址
				sec_selected:0,		//章节索引
				vid_selected:0,		//视频索引
				current:1,			//视频从什么播放位置开始播放
				title:' ' ,			//面包屑标题
				videoStorage:[],	//课程观看记录
				courceId:null,		//课程id
				arrs:[], 			//存储视频进度数组
				proCount:0			//观看总数
			};
		},
		methods:{
			onChange(event){
				this.activeNames = event.detail;
			},
			// 切换视频
			changeVideo(path,index,idx){
				this.videoPath = path;
				// 切换视频，从0播放
				this.current = 0;
				// 章节文本选中样式
				this.sec_selected = index;
				// 视频文本选中样式
				this.vid_selected = idx;
				// 面包屑标题
				this.title = `${this.goodVideos.content[this.sec_selected].section} > ${this.goodVideos.content[this.sec_selected].value[this.vid_selected].name}`
				this.videoShow = true;
			},
			// 收藏
			onCollect(){
				// this.collect_state  为true 说明已收藏
				if(this.collect_state){
					this.collect_state = !this.collect_state;
					uni.showToast({
						title:'取消收藏成功',
						icon:'success',
						duration:2000
					})
				}else{
					this.collect_state = !this.collect_state;
					uni.showToast({
						title:'收藏成功',
						icon:'success',
						duration:2000
					})
				}
			},
			onCache(){
				uni.navigateTo({
					url:'./collect'
				})
			},
			onAnswer(){
				uni.navigateTo({
					url:'./videoQuestion'
				})
			},
			// 记录视频播放位置
			setCurrentTime(event){
				this.current = event.detail.currentTime;
			},
			// 视频播完了
			videoEnded(){
				console.log('视频播完了');
				
				// 设置进度操作
				let id = this.goodVideos.content[this.sec_selected].value[this.vid_selected].id;
				// 获取当前章节数组
				let arr = this.arrs[this.sec_selected].proarr;
				//当前章节数组不存在id
				if(arr.indexOf(id) === -1){
					// 将id存到对应章节数组里
					arr.push(id);
				}
				// 设置进度值
				this.arrs[this.sec_selected].progress = arr.length;
				
				// 设置总数
				let count = 0;
				this.arrs.forEach(item => {
					count += item.progress;
				})
				this.proCount = count;
				console.log('更新后的arrs',this.arrs);
				
				// 设置视频操作
				this.videoShow = false;
				const sec_length = this.goodVideos.content.length;
				const vid_length = this.goodVideos.content[sec_length-1].value.length;
				// 是不是课程最后一节视频
				if(this.videoPath === this.goodVideos.content[sec_length-1].value[vid_length-1].path){
					this.btnShow = false;
				}else{
					this.btnShow = true;
				}
			},
			// 重播视频
			replay(){
				this.videoShow = true;
				this.current = 0;
			},
			// 播放下一节
			nextVideo(){
				this.videoShow = true;
				this.current = 0;
				//该视频是该章节最后一个视频
				if(this.vid_selected === this.goodVideos.content[this.sec_selected].value.length - 1){
					// 章节跳到下一节
					this.sec_selected += 1;
					// 视频从0播放
					this.vid_selected = 0;
				}else{
					this.vid_selected += 1;
				}
				// 面包屑标题
				this.title = `${this.goodVideos.content[this.sec_selected].section} > ${this.goodVideos.content[this.sec_selected].value[this.vid_selected].name}`;
				//视频地址
				this.videoPath = this.goodVideos.content[this.sec_selected].value[this.vid_selected].path;
				console.log('跳转下一节',this.videoPath);
			},
			// 页面退出缓存播放时间
			changeCurrent(){
				this.videoStorage = uni.getStorageSync('videoStorage');
				const index = this.videoStorage.findIndex(item => item.vid === this.courceId)
				if(index !== -1){
					this.videoStorage[index].currentTime = this.current;
					uni.setStorageSync('videoStorage',this.videoStorage);
				}
			}
		},
		watch:{
			// 监听视频地址
			videoPath(){
				this.videoStorage = uni.getStorageSync('videoStorage');
				// 返回符合条件的索引
				const index = this.videoStorage.findIndex(item => item.vid === this.courceId)
				if(index !== -1){
					this.videoStorage[index].vid_selected = this.vid_selected;
					this.videoStorage[index].sec_selected = this.sec_selected;
					this.videoStorage[index].vid_title = this.title;
					// this.videoStorage[index].currentTime = this.current;
					uni.setStorageSync('videoStorage',this.videoStorage);
				}
			}
		},
		onLoad: async function(option){
			this.courceId = option.id;
			console.log('我的课程id',option.mycourceId)
			await this.request({
				url:`${this.development}/goodVideos/${option.id}`,
				method:'get',
				success: (res) => {
					this.goodVideos = res.data.data;
					// if(uni.getStorageSync('progress')){
					// 	this.arrs = uni.getStorageSync('progress')
					// 	this.arrs.forEach(item => {
					// 		// 设置总数
					// 		this.proCount += item.progress;
					// 	})
					// 	console.log('总数：',this.proCount);
					// }else{
					// 	this.arrs = this.goodVideos.content.map(item => {return {progress:0,proarr:[]}});
					// }
					// console.log('arrs',this.arrs);
					//uni.getStorageSync('videoStorage')为空说明第一次访问
					this.videoStorage = uni.getStorageSync('videoStorage') ? uni.getStorageSync('videoStorage') : [];
					//判断缓存中是否存在此课程
					const index = this.videoStorage.findIndex(item => {return item.vid === this.courceId});
					console.log('数组',this.videoStorage)
					//缓存存在该课程
					if(index !== -1){
						//章节索引
						this.sec_selected = this.videoStorage[index].sec_selected;
						//视频索引
						this.vid_selected = this.videoStorage[index].vid_selected;
						//视频地址
						this.videoPath = this.goodVideos.content[this.sec_selected].value[this.vid_selected].path;
						//标题
						this.title = this.videoStorage[index].vid_title;
						// 播放历史位置
						this.current = this.videoStorage[index].currentTime;
				
						console.log('111:',this.current);
					}else{
						
						//缓存不存在该课程，默认第一个视频
						this.videoPath = this.goodVideos.content[0].value[0].path;
						//面包屑标题
						this.title = `${this.goodVideos.content[this.sec_selected].section} > ${this.goodVideos.content[this.sec_selected].value[this.vid_selected].name}`;
						// 存入缓存中
						this.videoStorage.push({
							'vid':this.courceId,
							'vid_selected':this.vid_selected,
							'sec_selected':this.sec_selected,
							'vid_title':this.title,
							'currentTime':this.current
						})
						uni.setStorageSync('videoStorage',this.videoStorage);
					}
					console.log('我的视频:',this.goodVideos)
					console.log('第一个视频',this.videoPath)
				}
			});
			await this.request({
				url:`${this.development}/myProgress/${option.mycourceId}`,
				method:'get',
				success: (res) => {
					console.log(res.data.data);
					// this.videoStorage = res.data.data;
					// this.sec_selected = this.videoStorage.sec_selected;
					// this.vid_selected = this.videoStorage.vid_selected;
					// this.vid_title = this.videoStorage.vid_title;
					// this.currentTime = this.videoStorage.currentTime;
					this.arrs = JSON.parse(res.data.data.proarr);
					console.log('arrs初始化',this.arrs)
				}
			})
		},
		onHide(){
			console.log('页面隐藏啦');
			// 缓存播放位置
			this.changeCurrent();
			uni.setStorageSync('progress',this.arrs);
			let data = {id:2,arr:JSON.stringify(this.arrs)}
			uni.request({
				url:`${this.development}/updateProgress`,
				method:'post',
				data:data,
				success: (res) => {
					console.log(res);
				}
			})
		},
		onUnload(){
			console.log('页面退出啦');
			// 缓存播放位置
			this.changeCurrent();
			uni.setStorageSync('progress',this.arrs);
		}
	}
</script>

<style lang="scss">
page{background:#c6c7c8;}
video{height:400rpx;}
.container{
	padding-top:565rpx;
	.course{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		z-index:999;
		.video{
			width:100%;
			height:400rpx;
			position:relative;
			image{
				width:100%;
				height:100%;
			}
			.btn-play{
				width:80px;
				height:80px;
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}
			video{width:100%;}
		}
		.videoEnd{
			width:100%;
			height:400rpx;
			background:#000;
			position: relative;
			.content{
				width:500rpx;
				height:100rpx;
				text-align: center;
				position: absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
				.text{
					color:#fff;
				}
				.btns{
					width:500rpx;
					display: flex;
					justify-content: space-between;
					.btn{
						width:240rpx;
						height:50rpx;
						margin-top:30rpx;
						line-height:50rpx;
						text-align:center;
						font-size:14px;
					}
				}
			}
		}
		.info{
			height:115rpx;
			background:#fff;
			padding:20rpx 30rpx 30rpx 30rpx;
			.title{
				height:60rpx;
				font-weight:600;
				line-height:1.6;
				font-size:24rpx;
			}
			.nav{
				display:flex;
				justify-content: space-around;
				font-size:22rpx;
				.iconfont{
					font-size:22rpx;
				}
				.looked{
					vertical-align: bottom;
				}
				.collect-check{
					color:rgb(255,102,0);
				}
			}
		}
	}
	.learn-box{
		.catalog{
			height:80rpx;
			line-height:80rpx;
			background:#fff;
			border-bottom:1px solid #ccc;
			padding-left:30rpx;
		}
		.learn-list{
			.cell{
				height:60rpx;
				line-height:60rpx;
				vertical-align: middle;
				font-size:24rpx;
				color:#333;
				margin-top:10rpx;
				.iconfont{margin-right:10rpx;font-size:24rpx;}
				.my-icon-video{color:#41a5fd;}
				.my-icon-xiazai{float:right;color:#41a5fd;font-size:28rpx;zindex:999;}
			}
			.active{
				color:#FF6600;
			}
		}
	}
}
</style>
