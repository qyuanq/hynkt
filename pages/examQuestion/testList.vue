<template>
	<view class="chapterTest">
		<view class="text">章节选择</view>
		<view class="testNav" v-for="" @tap="onDetail">
			<view class="content">
				<view class="title">普通话测试内容</view>
				<view class="progress">练习进度：0/51</view>
			</view>
			<icon class="iconfont my-icon-jiantouRight" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			onDetail(){
				uni.navigateTo({
					url:'./testDetail'
				})
			}
		},
		onLoad:function(){
			let courceId = this.$store.state.myCource.courceId;
			this.request({
				url:''
			})
			console.log('vuex',this.$store.state.myCource.courceId);
		},
		
		
	}
</script>

<style lang="scss">
.text{
	width:100%;
	height:80rpx;
	line-height:80rpx;
	background:#F6F7F8;
	font-size:18px;
	padding:20rpx;
}
.testNav{
	display: flex;
	justify-content: space-between;
	height:100rpx;
	margin:20rpx;
	padding:10rpx 20rpx;
	box-sizing: border-box;
	background:#F6F7F8;
	.title{
		font-size:14px;
	}
	.progress{
		font-size:12px;
		color:#999;
	}
	.my-icon-jiantouRight{
		font-size:40rpx;
		margin-top:10rpx;
	}
}
</style>
