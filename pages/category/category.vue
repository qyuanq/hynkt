<template>
	<view class="container">
		<view class="top">
			<image src="../../static/logo.png"></image>
			<van-search  placeholder="请输入搜索关键词"></van-search>
		</view>
		<view class="banner">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" circular="true">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<image src="../../static/banner/cate-ban1.jpg" mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image src="../../static/banner/cate-ban2.jpg"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/banner/cate-ban3.jpg"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/banner/cate-ban4.jpg"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view>
			<van-tabs active="active" bind:change="onChange">
			  <van-tab title="热门推荐">内容 1</van-tab>
			  <van-tab title="自学考试">内容 2</van-tab>
			  <van-tab title="成人高考">内容 3</van-tab>
			  <van-tab title="职业资格">内容 4</van-tab>
			  <van-tab title="研究生考试">内容 5</van-tab>
			</van-tabs>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default{
		components:{uniSearchBar,uniSegmentedControl},
		data(){
			return {
				active:1
			}
		},
		methods:{
			onChange(event) {
			    uni.showToast({
			      title: `切换到标签 ${event.detail.name}`,
			      icon: 'none',
			    });
			  },
		}
	}
</script>

<style lang="scss">
	page{background-color: #F6F7F8;}
	.container{
		.top{
			display:flex;
			justify-content: space-between;
			width:100%;height:50px;background:#fff;
			image{width:120px;height:29px;}
			.search{width:550rpx;height:30px;border:1px solid #ccc;border-radius:20px;}
		}
		.banner{
			width:100%;height:340rpx;
			.uni-padding-wrap{
				height:100%;
				.page-section{
					height:100%;
					.page-section-spacing{
						height:100%;
						.swiper{
							height:100%;
							.uni-swiper-wrapper{
								height:100%;
								.swiper-item{
									height:100%;
									image{width:100%;height:100%;}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
