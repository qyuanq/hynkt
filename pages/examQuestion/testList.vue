<template>
	<view class="chapterTest">
		<view class="text">章节选择</view>
		<view class="testNav" v-for="item in sectionInfo" :key="item.id" @tap="onDetail(item.id)">
			<view class="content">
				<view class="title">{{item.name}}</view>
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
				SERVER:this.development,
				sectionInfo:null
			};
		},
		methods:{
			onDetail(sectionId){
				uni.navigateTo({
					url:`./testDetail?sectionId=${sectionId}`
				})
			}
		},
		onLoad:async function(){
			let courceId = this.$store.state.myCource.courceId;
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/chapterTests/${courceId}`,
				method:'get'
			})
			if(res.data.code === 0){
				this.sectionInfo = res.data.data;
			}
			console.log('res',res);
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
