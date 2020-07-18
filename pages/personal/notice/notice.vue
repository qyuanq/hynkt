<template>
	<view class="container">
		<view class="notice">
			<view class="notice-box">
				<view class="">
					<view class="icon iconfont my-icon-kecheng"></view>
					<text>课程更新</text>
				</view>
			</view>
			<view class="notice-box">
				<view class="icon iconfont my-icon-chuanjiang"></view>
				<text>串讲更新</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.container{
		.notice{
			width:85%;
			height:70px;
			margin:0 auto;
			box-shadow: gainsboro 0px 0px 5px;
			border-radius:5px;
			display:flex;
			.notice-box{
				flex:1;
				text-align:center;
				padding-top:10px;
				.icon{font-size:30px;color:#41a5fd;}
			}
		}
	}
</style>
