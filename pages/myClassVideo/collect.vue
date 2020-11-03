<template>
	<view class="container">
		<view class="downloaded">下载完成</view>
		<view class="down-box">
			<van-swipe-cell right-width="65">
			  <view class="content">
				  <view class="img"><image :src="SERVER +'/static/img/category/pic1.jpg'"></image></view>
				  <view class="text">"健康"管理师想法+职业规划（一）</view>
			  </view>
			  <view slot="right"><button class="delete" @tap="onClose">删除</button></view>
			</van-swipe-cell>
		</view>
		<view class="downloading">下载中</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SERVER:this.server
			};
		},
		methods:{
			onClose(event){
				uni.showModal({
					content:'确定要删除吗',
					success(res){
						if(res.confirm){
							console.log('用户点击确定')
						}else if(res.cancel){
							console.log('用户点击取消')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background:#f6f7f8;
}
.container{
	.downloaded{
		margin-left:20rpx;
		margin-top:20rpx;
		font-weight:bold;
		font-size:28rpx;
	}
	.downloading{
		margin-left:20rpx;
		margin-top:70rpx;
		font-weight:bold;
		font-size:28rpx;
	}
	.down-box{
		width:710rpx;
		height:162rpx;
		line-height:162rpx;
		margin:25rpx auto 0;
		border-radius:20rpx;
		background:#fff;
		font-size:28rpx;
		.content{
			display:flex;
			vertical-align: middle;
			height:100%;
			padding:20rpx 0 20rpx 20rpx;
			box-sizing:border-box;
			.img{
				width:160rpx;
				height:122rpx;
				margin-right:20rpx;
				flex:1;
				image{
					width:100%;
					height:100%;
				}
			}
			.text{
				height:122rpx;
				line-height:122rpx;
				flex:3;
			}
		}
		.delete{
			height:162rpx;line-height:162rpx;background:red;color:#fff;font-size:16px;
		}
	}
}
</style>
