<template>
	<view class="container">
		<view class="int-friend">
			<image :src="SERVER + '/static/img/personal/invite/dowload.png'"></image>
		</view>
		<view class="ident">非APP请截图保存</view>
		<view class="user">
			<view class="icon iconfont my-icon-yonghu"></view>
			<view class="user-text">
				我已在慧永诺教育APP里学习<text class="day">198</text>天！ 你快注册慧永诺教育我们一起来学习吧！
			</view>
		</view>
		<button class="save">保存图片</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SERVER:this.server
			};
		}
	}
</script>

<style lang="scss">
page{
	background:url('/static/img/int-friend.png');
	background-size:100% 100%;
}
.container{
	padding-top:80rpx;
	.int-friend{
		width:180px;
		height:180px;
		margin:0 auto;
		border:12px solid #fd9801;
		border-radius:8px;
		image{width:100%;height:100%;}
	}
	.ident{
		text-align:center;
		font-size:14px;
		color:#999;
		margin-top:20px;
	}
	.user{
		width:180px;
		margin:15px auto 0;
		.icon{width:56px;height:56px;margin:0 auto;color:#2890ff;font-size:56px;}
		.user-text{
			margin-top:12px;
			font-size:12px;
			color:#999;
		}
	}
	button{
		width:180px;
		height:35px;
		border-radius:20px;
		margin-top:30px;
		line-height:35px;
		text-align:center;
		color:#fff;
		background:#fd9801;
	}
}
</style>
