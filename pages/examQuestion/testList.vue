<template>
	<view class="chapterTest">
		<view class="progress">
			<view class="box">
				<view class="box-text">章节练习正确率</view>
				 <progress 
					percent="20" 
					show-info 
					stroke-width="6" 
					activeColor="#fff" 
					backgroundColor="#2C405A"
					border-radius="6"
					font-size="14"
					active
				 />
			</view>
			<view class="box">
				<view class="box-text">章节练习完成率</view>
				 <progress
					percent="20" 
					show-info 
					stroke-width="6" 
					activeColor="#fff" 
					backgroundColor="#2C405A"
					border-radius="6"
					font-size="14"
					active
				 />
			</view>
		</view>
		<view class="text">章节选择 (共{{sectionInfo.length}}章)</view>
		<view class="testNav" v-for="item in sectionInfo" :key="item.id" @tap="onDetail(item.id,item.name)">
			<view class="content">
				<view class="title">{{item.name}}</view>
				<view class="section-progress">练习进度：0/{{item.chapter_test_models[0].count}}</view>
			</view>
			<icon class="iconfont my-icon-jiantouRight" />
		</view>
	</view>
</template>

<script>
	import {renderTime} from '@/static/js/common.js';
	export default {
		data() {
			return {
				SERVER:this.development,
				sectionInfo:null
			};
		},
		computed:{
			user(){
				return uni.getStorageSync('user')
			}
		},
		methods:{
			async onDetail(sectionId,sectionName){
				this.$store.dispatch('myCource/changeSectinInfo',{id:sectionId,name:sectionName});
				const [errTest,resTest] = await this.request({
					url:`${this.SERVER}/api/myTest/?userId=${this.user.id}&classId=${this.$store.state.myCource.courceId}&sectionId=${sectionId}`,
					method:'get'
				})
				if(resTest.data.code === 0 && resTest.data.data.chapterTestModelId){
					let content = `您在${renderTime(resTest.data.data.date)}有未完成的练习,确认继续上次的练习？`
					// 有没有上次保存的进度
					uni.showModal({
						content:content,
						cancelText:'否',
						confirmText:'是',
						success:(res) => {
							if(res.confirm){
								let qid = resTest.data.data.chapterTestModelId;
								uni.navigateTo({
									url:`./testDetail?qid=${qid}`
								})
							}else if(res.cancel){
								uni.navigateTo({
									url:`./testDetail`
								})
							}
						}
					})
				}
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
		}
	}
</script>

<style lang="scss">
.progress{
	height:120rpx;
	font-size:28rpx;
	padding-top:30rpx;
	box-sizing: border-box;
	color:#fff;
	display: flex;
	justify-content: space-around;
	background-color:#007AFF;
	.box{
		width:40%;
	}
}
.text{
	width:100%;
	height:80rpx;
	line-height:80rpx;
	background:#F6F7F8;
	font-size:14px;
	padding:0 20rpx;
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
	.section-progress{
		font-size:12px;
		color:#999;
	}
	.my-icon-jiantouRight{
		font-size:40rpx;
		margin-top:10rpx;
	}
}
</style>
