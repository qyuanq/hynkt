<template>
	<view class="container">
		<view class="top">
			<view class="content">
				<view class="img">
					<image class="logo" :src="SERVER + '/static/img/logo.png'" mode="widthFix"></image>
				</view>
				<view class="classcs">
					<text class="chouse">{{showName}}</text>
					<button class="cource" @tap="changeClass(notlesson)">选课</button>
				</view>
				<view class="qd">
					<button class="btn" @tap="signed"></button>
				</view>
			</view>
		</view>
		<view class="banner">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" circular="true">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<image :src="SERVER + '/static/img/banner/ban1.jpg'" mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image :src="SERVER + '/static/img/banner/ban2.jpg'"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image :src="SERVER + '/static/img/banner/ban3.jpg'"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image :src="SERVER + '/static/img/banner/ban4.jpg'"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="nav">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view class="scroll-block">
					<view id="demo1" class="scroll-view-item_H demo">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/chapter_practice.png'" mode="widthFix"></image>
						</view>
						<text>章节练习</text>
					</view>
					<view id="demo2" class="scroll-view-item_H demo" @tap="onProblem">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/simulation_test.png'"></image>
						</view>
						<text>模拟考试</text>
					</view>
					<view id="demo3" class="scroll-view-item_H demo">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/wrong_topic.png'"></image>
						</view>
						<text>错题本</text>
					</view>
					<view id="demo4" class="scroll-view-item_H demo">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/favorites.png'"></image>
						</view>
						<text>收藏夹</text>
					</view>
					<view id="demo5" class="scroll-view-item_H demo">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/class_introduce.png'"></image>
						</view>
						<text>课程信息</text>
					</view>
					<view id="demo6" class="scroll-view-item_H demo">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/learning_process.png'"></image>
						</view>
						<text>学习进度</text>
					</view>
					<view id="demo7" class="scroll-view-item_H demo">
						<view class="icon">
							<image :src="SERVER + '/static/img/icon/file_down.png'"></image>
						</view>
						<text>课件下载</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 用户没有课程显示 -->
		<view v-if="notlesson" class="video-learn">
			<image :src="SERVER + '/static/img/no_buy.png'"></image>
			<view class="t1">你还没有购买网校辅导课程</view>
			<view class="t2">快去选购课程吧~</view>
			<button class="btn" @tap="buyCource">选购课程</button>
		</view>
		<view v-else="notlesson">
			<view class="test-time" @tap="getTestTime">
				<image :src="SERVER + '/static/img/icon/test_time.png'"></image>
				<text class="text">考试时间:{{classgoryInfo.Exam_time}}</text>
				<text class="more">更多</text>
			</view>
			<van-popup :show="show" closeable close-icon="iconfont my-icon-jiantou iconfont" position="bottom" custom-style="height: 20%" @close="onClose">
				<view class="test-head">
					<icon class="iconfont my-icon-time"></icon>
					<text>考试时间</text>
				</view>
				<view class="content">
					<view>全国 {{classgoryInfo.Exam_time}}</view>
				</view>
			</van-popup>
			<!-- 视频学习 -->
			<view class="video-text">视频学习</view>
			
			<!-- 用户有课程显示 -->
			<view class="video-class" @tap="onClickVideo(showLesson.id)">
				<view class="img">
					<image :src="development + showLesson.head_picture" class="video-img"></image>
				</view>
				<view class="text-box">
					<view class="title">班型精讲视频</view>
					<view class="last-look">上次观看：</view>
				</view>
			</view>
			<!-- 用户有课程显示直播 -->
			<view class="live-text">
				<text class="text1">直播</text>
				<text class="text2">更多直播</text>
			</view>
			<view class="live-class">
				<scroll-view class="scroll-view" scroll-x="true" @scroll="scroll"  enable-flex="true">
					<view id="info1" class="video-info">
						<view class="title">2020年小学教师资格证备考直播</view>
						<view class="timer">2020-06-19 19:15:00-21:00:00</view>
						<view class="info-bot">
							<text class="lecturer">杨秀伟</text>
							
							<text class="playback">回放</text>
						</view>
					</view>
					<view id="info2" class="video-info">
						<view class="title">2020年小学教师资格证备考直播</view>
						<view class="timer">2020-06-19 19:15:00-21:00:00</view>
						<view class="info-bot">
							<text class="lecturer">杨秀伟</text>
							
							<text class="playback">回放</text>
						</view>
					</view>
					<view id="info3" class="video-info">
						<view class="title">2020年小学教师资格证备考直播</view>
						<view class="timer">2020-06-19 19:15:00-21:00:00</view>
						<view class="info-bot">
							<text class="lecturer">杨秀伟</text>
							
							<text class="playback">回放</text>
						</view>
					</view>
					<view id="info4" class="video-info">
						<view class="title">2020年小学教师资格证备考直播</view>
						<view class="timer">2020-06-19 19:15:00-21:00:00</view>
						<view class="info-bot">
							<text class="lecturer">杨秀伟</text>
							
							<text class="playback">回放</text>
						</view>
					</view>
					<view id="info5" class="video-info">
						<view class="title">2020年小学教师资格证备考直播</view>
						<view class="timer">2020-06-19 19:15:00-21:00:00</view>
						<view class="info-bot">
							<text class="lecturer">杨秀伟</text>
							
							<text class="playback">回放</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<uni-link :href="href" :text="href"></uni-link>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				testTime:'全国 2020-10-24 09:00',
				show:false,
				development:this.development,
				SERVER:this.server,
				myCource:null,
				notlesson:null,
				showLesson:null,
				showName:'',
				classgoryInfo:null
			}
		},
		created(){
			this.request({
				url:`${this.development}/api/myCources`,
				method:'get',
				success: async(res) => {
					console.log(res.data.data);
					this.myCource = res.data.data;
					if(this.myCource && this.myCource.noverCource.length > 0){
						// 用户有无课程标识
						this.notlesson = false;
						// 未过期课程
						if(uni.getStorageSync('cource')){
							this.showLesson = uni.getStorageSync('cource');
						}else{
							this.showLesson = this.myCource.noverCource.length > 0 ? this.myCource.noverCource[0][0] : null;
						}
						//获取课程对应从专业信息
						await this.request({
							url:`${this.development}/api/myClassgory/${this.showLesson.classgroup_id}`,
							method:'get',
							success: (res) => {
								this.classgoryInfo = res.data.data;
								// 格式化时间
								this.classgoryInfo.Exam_time = this.renderTime(this.classgoryInfo.Exam_time);
								this.showName = this.classgoryInfo.name;
								console.log('专业信息',this.classgoryInfo)
							}
						});
					}else{
						this.notlesson = true;
						this.showName = "请选择课程";
					}
					
					console.log('mycource',this.myCource);
					console.log('notlesson',this.notlesson);
				}
			})
		},
		methods: {
			// 选课
			changeClass(notlesson){
				let url;
				if(this.myCource){
					url = `../user/myCource?notlesson=false&nover=${encodeURIComponent(JSON.stringify(this.myCource.noverCource))}&overdue=${encodeURIComponent(JSON.stringify(this.myCource.overdueCource))}`
				}else{
					url = `../user/myCource?notlesson=true`
				}
				uni.navigateTo({
					url:url
				})
			},
			signed(){
				uni.navigateTo({
					url:'./integral'
				})
			},
			getTestTime(){
				this.show = true;
			},
			onClose(){
				this.show = false;
			},
			onClickVideo(pid){
				uni.navigateTo({
					url:`../myClassVideo/myClassVideo?id=${pid}`
				})
			},
			buyCource(){
				uni.switchTab({
					url:'/pages/tabBar/category'
				})
			},
			onProblem(){
				console.log('点击了章节练习');
				let url;
				this.notlesson ? url = `../user/myCource?notlesson=${this.notlesson}` : url = '../examQuestion/practice';
				uni.navigateTo({
					url:url
				})
			},
			//转化时间
			renderTime(date) {
			  let dateee = new Date(date).toJSON();
			  // 北京处于东八区，所以要加8个小时
			  // return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			   return new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			}
		},
		onLoad: function (option) {
			if(option.swatchCourse){
				let swatchCourse = JSON.parse(decodeURIComponent(option.swatchCourse));
				uni.showToast({
					title:`您已切换${swatchCourse.name}`,
					icon:'none',
					duration:2000
				})
				uni.setStorageSync('cource', swatchCourse);
			}
		    console.log('切换课程',swatchCourse);
		}
	}
</script>

<style lang="scss">
	
	page{background-color: #F6F7F8;}
	.container {
		// padding: 20px;
		font-size: 14px;
		line-height: 24px;
		background:#F6F7F8;
		.top{
			width:100%;
			height:88rpx;
			background:#fff;
			vertical-align: middle;
			.content{
				width:710rpx;
				margin:0 auto;
				position:relative;
				display: flex;
				justify-content: space-between;
				.img{
					padding-top:21rpx;
					width:155rpx;height:42rpx;
					.logo{width:100%;}
				}
				.classcs{
					padding-top:20rpx;height:40rpx;font-weight:700;display: flex;justify-content: center;line-height:40rpx;
					.chouse{font-size:28rpx;}
					.cource{font-size:20rpx;display:inline-block;width:80rpx;height:40rpx;background:#FD9801;color:#fff;line-height:40rpx;text-align:center;border-radius:5px;margin-left:10px;padding-left:0;padding-right: 0;}
					}
				.qd{
					padding-top:24rpx;
					.btn{
						width:32rpx;
						height:32rpx;
						background:url('/static/img/sign_in.png') no-repeat;
						background-size:100% 100%;
					}
				}
			}
		}
		.banner{
			width:710rpx;
			height:350rpx;
			margin:20rpx auto 0;
			.uni-padding-wrap{
				.swiper{
					height:100%;
					.page-section-spacing{
						height:100%;
						.swiper-item{
							height:100%;
							image{width:100%;height:100%;border-radius: 10rpx;}
						}
					}
				}
				height:100%;
			}
		}
		.nav{
			width:710rpx;
			height:165rpx;
			margin:20rpx auto 0;
			background:#fff;
			.scroll-view_H{
				width:100%;
				height:165rpx;
				.scroll-block{
					display:flex;
					justify-content:space-around;
					// flex-wrap: wrap;
					padding-top:20rpx;
				}
				.demo{
					max-width:150rpx;
					min-width: 150rpx;
					height:130rpx;
					text-align:center;
					display: inline-block;
					font-size:24rpx;
					.icon{
						width:100%;
						image{width:70rpx;height:70rpx;}
					}
				}
			}
		}
		.test-time{
			width:710rpx;
			height:80rpx;
			margin:20rpx auto 0;
			margin-bottom:30rpx;
			border-radius: 10rpx;
			background:#fff;
			position:relative;
			image{width:32rpx;height:32rpx;position:absolute;left:20rpx;top:50%;transform: translateY(-50%);}
			.text{position:absolute;font-size:26rpx;left:60rpx;top:50%;transform: translateY(-50%);}
			.more{position: absolute;right:20rpx;top:50%;transform: translateY(-50%);font-size: 24rpx;color:#666;}
		}
		.van-popup{
			background:#f6f7f8;
		}
		.my-icon-jiantou{
			font-size: 24px;
		}
		.test-head{
			padding-top:16rpx;
			padding-left:20rpx;
			height:68rpx;
			line-height:68rpx;
			background:#fff;
			text{
				display:inline-block;
				font-size:16px;
				margin-left:10rpx;
				vertical-align: middle;
			}
			.my-icon-time{
				color:#FD9801;
				font-size:24px;
				vertical-align: middle;
			}
		}
		.content{
			margin-top:10rpx;
			text-align: center;
		}
		.video-text{
			padding-left: 20rpx;
			font-size:28rpx;
			font-weight:700;
		}
		.video-learn{
			width:100%;
			height:450rpx;
			background:#fff;
			padding:50rpx 0 40rpx 0;
			margin-top:20rpx;
			text-align: center;
			image{width:242rpx;height:180rpx;margin:0 auto;}
			.t1{font-size:24rpx;margin-top:10rpx;}
			.t2{font-size:20rpx;margin-top:10rpx;color:#888;}
			.btn{margin-top:20rpx;width:260rpx;height:60rpx;line-height:60rpx;background:#ff6600;text-align:center;color:#fff;border-radius:30rpx;}
		}
		.video-class{
			width:710rpx;
			height:220rpx;
			box-sizing: border-box;
			background:#fff;
			margin:20rpx auto 0;
			padding:20rpx;
			display:flex;
			// justify-content: space-between;
			.img{
				width:300rpx;
				height:180rpx;
				flex:1;
				margin-right:20rpx;
				.video-img{
					width:100%;
					height:100%;
					border-radius: 10px;
				}
			}
			.text-box{
				flex:1;
				.title{font-size:28rpx;}
				.last-look{font-size:20rpx;color:#888;}
			}
		}
		.live-text{
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
			margin-top:30rpx;
			.text1{
				font-size:28rpx;
				font-weight: bold;
			}
			.text2{
				font-size:24rpx;
				color:#666;
			}
		}
		.live-class{
			width:100%;
			height:200rpx;
			padding-top:25rpx;
			box-sizing: border-box;
			background:#fff;
			.scroll-view{
				width:100%;
				height:100%;
				display:flex;
				.video-info{
					padding:10rpx 10rpx 0 10rpx;
					max-width:400rpx;
					min-width: 400rpx;
					margin-left:20rpx;
					height:150rpx;
					border-radius:20rpx;
					box-shadow: 10rpx 10rpx 8rpx #ccc;
					.title{
						font-size:24rpx;
						color:#333;
						text-overflow: ellipsis;
					}
					.timer{
						font-size:20rpx;
						color:#999;
					}
					.info-bot{
						display:flex;
						justify-content: space-between;
						.lecturer{
							font-size:20rpx;
							color:#999;
						}
						.playback{
							font-size:20rpx;
							color:#41A5FD;
						}
					}
				}
			}
		}
	}
</style>
