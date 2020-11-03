<template>
	<view class="container">
		<view class="speack-box">
			<view class="icon-head">
				<image :src="SERVER + '/static/img/icon_head.png'"></image>
			</view>
			<view class="speack-input" @tap="onSkip">说点什么</view>
		</view>
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
			onSkip(){
				uni.navigateTo({
					url:'./uploadQuestion'
				})
			}
		}
	}
</script>

<style lang="scss">
.container{
	.speack-box{
		position:absolute;
		bottom:0;
		width:710rpx;height:90rpx;
		margin:0 auto;
		background:#fff;
		padding:20rpx;
		// box-sizing:border-box;
		display:flex;
		justify-content: space-between;
		box-shadow:2rpx 2rpx 3rpx #666;
		.icon-head{
			width:80rpx;
			height:80rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		.speack-input{
			width:610rpx;
			height:50rpx;
			line-height:50rpx;
			background:#E0E0E0;
			font-size:20rpx;
			border-radius:8rpx;
			margin-top:20rpx;
		}
	}
}
</style>
