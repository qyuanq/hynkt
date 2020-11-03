<template>
	<view class="container">
		<image class="bg" :src="SERVER + '/static/img/dlbg.png'" ></image>
		<view class="content">
			<image class="icon" :src="SERVER + '/static/img/dlicon.png'" mode="widthFix"></image>
			<view class="tit">慧永诺教育</view>
			<button class="btn">点击安装</button>
			<view class="and">适用于安卓手机</view>
			<image class="ewm" :src="SERVER + '/static/img/dlewm.jpg'" mode="widthFix"></image>
			<view class="sm">扫描二维码下载</view>
		</view>
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
.container{
	width:100%;
	.bg{width:100%;}
	.content{
		width:150px;
		margin:0 auto;
		margin-top:-95px;
		text-align:center;
		.icon{max-width:100%;}
		.tit{margin-top:30px;font-size:20px;}
		.ewm{max-width:100%;margin-bottom:15px;}
		.btn{background:#0095D3;color:#fff;border-radius:16px;height:30px;line-height:30px;margin:20px 0;}
		.and,.sm{font-size:18px;color:#888;}
		.and{margin-bottom:20px;}
	}
}
</style>
