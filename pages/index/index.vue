<template>
	<view class="container">
		<view class="top">
			<view class="content">
				<view class="img">
					<image class="logo" src="/static/logo.png" mode="widthFix"></image>
				</view>
				<view class="classcs">
					<text class="chouse">请选择课程</text>
					<button class="cource">选课</button>
				</view>
				<view class="qd">
					<button class="btn"></button>
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
									<image src="../../static/banner/ban1.jpg" mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image src="../../static/banner/ban2.jpg"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/banner/ban3.jpg"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/banner/ban4.jpg"  mode="scaleToFill"></image>
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
							<image src="../../static/icon/chapter_practice.png" mode="widthFix"></image>
						</view>
						<text>章节练习</text>
					</view>
					<view id="demo2" class="scroll-view-item_H demo">
						<view class="icon">
							<image src="../../static/icon/simulation_test.png"></image>
						</view>
						<text>模拟考试</text>
					</view>
					<view id="demo3" class="scroll-view-item_H demo">
						<view class="icon">
							<image src="../../static/icon/wrong_topic.png"></image>
						</view>
						<text>错题本</text>
					</view>
					<view id="demo4" class="scroll-view-item_H demo">
						<view class="icon">
							<image src="../../static/icon/favorites.png"></image>
						</view>
						<text>收藏夹</text>
					</view>
					<view id="demo5" class="scroll-view-item_H demo">
						<view class="icon">
							<image src="../../static/icon/class_introduce.png"></image>
						</view>
						<text>课程信息</text>
					</view>
					<view id="demo6" class="scroll-view-item_H demo">
						<view class="icon">
							<image src="../../static/icon/learning_process.png"></image>
						</view>
						<text>学习进度</text>
					</view>
					<view id="demo7" class="scroll-view-item_H demo">
						<view class="icon">
							<image src="../../static/icon/file_down.png"></image>
						</view>
						<text>课件下载</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="test-time">
			<image src="../../static/icon/test_time.png"></image>
			<text class="text">考试时间:--</text>
			<text class="more">更多</text>
		</view>
		<view class="video-text">视频学习</view>
		<view class="video-learn">
			<image src="../../static/no_buy.png"></image>
			<view class="t1">你还没有购买网校辅导课程</view>
			<view class="t2">快去选购课程吧~</view>
			<button class="btn">选购课程</button>
		</view>
		<uni-link :href="href" :text="href"></uni-link>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

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
						background:url(../../static/icon/sign_in.png) no-repeat;
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
			margin-top:10rpx;
			text-align: center;
			image{width:242rpx;height:180rpx;margin:0 auto;}
			.t1{font-size:24rpx;margin-top:10rpx;}
			.t2{font-size:20rpx;margin-top:10rpx;color:#888;}
			.btn{margin-top:20rpx;width:260rpx;height:60rpx;line-height:60rpx;background:#ff6600;text-align:center;color:#fff;border-radius:30rpx;}
		}
	}
</style>
