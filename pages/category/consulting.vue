<template>
	<!-- 专业咨询 -->
	<view class="container">
		<view class="header">
			<image class="picture" :src="development + '/public/static/img/category/new-bgc.png'" />
			<view class="title-box">
				<view class="title">{{content.name}}</view>
				<view class="date">{{content.date}}</view>
			</view>
			<view class="information">
				<rich-text :nodes="content.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				development:this.development,
				content:null
			};
		},
		methods:{
			// 将"2020-11-26T16:42:02.000Z" 格式 转化为 2020-11-26 16:42:02
			renderTime(date) {
			  let dateee = new Date(date).toJSON();
			  // 北京处于东八区，所以要加8个小时
			  // return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			   return new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			}
		},
		onLoad: async function(option){
			// 设置本页标题
			uni.setNavigationBarTitle({
			　　title:option.title
			})
			//decodeURIComponent解码 ，转换成json
			this.content = JSON.parse(decodeURIComponent(option.content));
			this.content.date = this.renderTime(this.content.date);
		}
	}
</script>

<style lang="scss">
.container{
	.header{
		width:100%;
		height:320rpx;
		.picture{
			width:100%;
			height:100%;
		}
		.title-box{
			width:690rpx;
			height:200rpx;
			margin:-100rpx auto 0;
			box-shadow:1px 1px 5px  #e3e2e2;
			text-align: center;
			border-radius: 10rpx;
			.title{
				font-size:28rpx;
				color:#666;
				font-weight:bold;
				margin:20rpx 0 10rpx 0;
			}
			.date{
				font-size:24rpx;
				color:#888;
			}
		}
		.information{
			padding:40rpx;
		}
	}
}
</style>
