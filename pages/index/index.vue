<template>
	<view class="container">
		<view class="top">
			<view class="img">
				<image class="logo" src="/static/logo.png" mode="widthFix"></image>
			</view>
			<view class="classcs">
				<text>请选择课程</text>
				<navigator class="cource">选课</navigator>
			</view>
			<view class="qd">
				<button class="btn"></button>
			</view>
		</view>
		<view class="banner">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<image src="../../static/banner/ban1.jpg" ></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image src="../../static/banner/ban2.jpg" mode="aspectFit"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/banner/ban3.jpg" mode="aspectFit"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/banner/ban4.jpg" mode="aspectFit"></image>
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
	.container {
		// padding: 20px;
		font-size: 14px;
		line-height: 24px;
		background:#F6F7F8;
		.top{
			width:100%;
			height:44px;
			display:flex;
			justify-content: space-around;
			vertical-align: middle;
			.img{
				width:155px;height:21px;
				.logo{width:100%;}
			}
			.classcs{
				display:flex;justify-content: center; width:272.5px;height:20px;font-size:16px;font-weight:700;line-height:20px;
				.cource{width:40px;height:20px;font-size:16px;background:#FD9801;color:#fff;line-height:20px;text-align:center;border-radius:5px;margin-left:10px;}
				}
			.qd{
				.btn{
					width:32px;
					height:32px;
					background:url(../../static/icon/sign_in.png) no-repeat;
					background-size:100% 100%;
				}
			}
		}
		.banner{
			width:710rpx;
			height:350rpx;
			margin:0 auto;
			image{width:100%;}
		}
		.nav{
			width:710rpx;
			height:165rpx;
			margin:0 auto;
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
	}
</style>
