<template>
	<view class="container">
		<view v-if="isbuy" class="notbuy">
			<view class="content">
				<image :src="SERVER + '/static/img/no_buy.png'"></image>
				<view class="t1">你还没有购买网校辅导课程</view>
				<view class="t2">快去选购课程吧~</view>
				<button class="btn" @tap="buyCource">选购课程</button>
			</view>
		</view>
		<view v-else="isbuy" class="mycource">
			<van-search :value="value" placeholder="请输入课程名称" />
			<view class="my-lessons">
				<view class="title">我的课程</view>
				<view class="cources">
					<shop-pane :hotCource="cource"></shop-pane>
				</view>
			</view>
			<view class="have-lessons">
				<view class="title">已学课程</view>
				<view class="cources">
					<shop-pane :hotCource="cource"></shop-pane>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shopPane from "@/components/shop-pane/shop-pane.vue"
	export default {
		data() {
			return {
				SERVER:this.server,
				isbuy:null,
				cource:null
			};
		},
		methods:{
			buyCource(){
				uni.switchTab({
					url:'/pages/tabBar/category'
				})
			}
		},
		onLoad: async function(option){
			//option.notlesson 解析的是字符串
			option.notlesson === 'true' ? this.isbuy = true : this.isbuy = false;
			if(option.cource){
				this.cource = JSON.parse(decodeURIComponent(option.cource));
				console.log('已学课程:',this.cource)
			}
		}
	}
</script>

<style lang="scss">
.container{
	.notbuy{
		width:100%;
		height:100vh;
		background:#fff;
		text-align: center;
		.content{
			position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
			image{width:242rpx;height:180rpx;margin:0 auto;}
			.t1{font-size:24rpx;margin-top:10rpx;}
			.t2{font-size:20rpx;margin-top:10rpx;color:#888;}
			.btn{margin-top:20rpx;width:260rpx;height:60rpx;line-height:60rpx;background:#ff6600;text-align:center;color:#fff;border-radius:30rpx;}
		}
	}
}
</style>
