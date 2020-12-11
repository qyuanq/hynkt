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
			<view class="my-lessons" v-if="nover.length > 0">
				<view class="title">我的课程</view>
				<view class="cources" v-for="item in nover" :key="item[0].id" @tap="Switching(item[0])">
					<shop-pane :hotCource="item[0]" :normal="true"></shop-pane>
				</view>
			</view>
			<view class="have-lessons" v-if="overdue.length > 0">
				<view class="title">已学课程</view>
				<view class="cources" v-for="item in overdue" :key="item[0].id" @tap="onRenewal(item[0].label.indexOf('全程') != -1 ? 'meal' : 'single',item[0].id)">
					<shop-pane :hotCource="item[0]" :renewal="true"></shop-pane>
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
				nover:null,
				overdue:null,
				btn:null
			};
		},
		methods:{
			buyCource(){
				uni.switchTab({
					url:'/pages/tabBar/category'
				})
			},
			onRenewal(type,pid){
				console.log('pid',pid);
				uni.showModal({
				    title: '提示',
				    content: '您所选的课程已过期，继续学习需要购买该课程，是否购买',
					cancelText:'以后再说',
					confirmText:'去购买',
				    success: function (res) {
				        if (res.confirm) {
				           uni.navigateTo({
				           	url:`../product/product?id=${pid}&type=${type}`
				           })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			Switching(item){
				// console.log(item)
				uni.reLaunch({
				    url: `/pages/tabBar/index?swatchCourse=${encodeURIComponent(JSON.stringify(item))}`
				});
			}
		},
		onLoad: async function(option){
			//option.notlesson 解析的是字符串
			option.notlesson === 'true' ? this.isbuy = true : this.isbuy = false;
			// 正常课程
			if(option.nover){
				this.nover = JSON.parse(decodeURIComponent(option.nover));
			}
			// 过期课程
			if(option.overdue){
				this.overdue = JSON.parse(decodeURIComponent(option.overdue));
			}
			console.log('已学课程:',this.nover,'续费过程：',this.overdue)
		}
	}
</script>

<style lang="scss">
.container{
	background:rgb(246, 247, 248);
	padding:0 30rpx;
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
	.mycource{
		.title{
			height:80rpx;
			line-height:80rpx;
		}
	}
}
</style>
