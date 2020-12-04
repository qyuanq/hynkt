<template>
	<view class="container">
		<view class="class-img">
			<image :src='singleImg'></image>
		</view>
		<view class="content">
			<view class="tit">{{single.label}}</view>
			<view class="pro-box">
				<view class="price">￥{{single.retail_price}}</view>
				<view class="btn">报名试听</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			single:{
				type:Object,
				default:() => {
					return {}
				}
			}
		},
		data() {
			return {
				singleImg:this.development + this.single.head_picture
			};
		}
	}
</script>

<style lang="scss">
.container{
	margin-top:10rpx;
	width:150px;
	.class-img{
		width:100%;height:90px;
		image{width:100%;height:90px;border-radius:4px;}
	}
	.content{
		width:100%;font-family:"微软雅黑";
		.tit{
			font-size:15px;
			color:#333;
			text-align:left;
		}
		.pro-box{
			display:flex;
			justify-content: space-between;
			.price{
				font-size:14px;
				color:#FD9801;
			}
			.btn{
				width:55px;
				height:15px;
				line-height:15px;
				font-size:11px;
				color:#fff;
				background:#FD9801;
				border-radius:10px;
				text-align:center;
			}
		}
	}
}
</style>
