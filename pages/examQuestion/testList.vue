<template>
	<view class="chapterTest">
		<view class="progress">
			<view class="box">
				<view class="box-text">章节练习正确率</view>
				 <progress 
					:percent="correct" 
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
					:percent="completion" 
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
				<view class="section-progress">练习进度：{{item.haveCount ? item.haveCount : 0}}/{{item.chapter_test_models.length}}</view>
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
				sectionInfo:null,	//章节信息
				correct:0,			//正确率
				completion:0		//完成率
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
				console.log('查看新纪录',resTest.data.data)
				if(resTest.data.code === 0){
					let record = resTest.data.data['test_record_models.record'];
					record = JSON.parse(record);
					// 将章节练习记录存入vuex,[]或者数组
					this.$store.dispatch('myCource/changeRecord',record);
					if(resTest.data.data && resTest.data.data.chapterTestModelId > 0){
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
									this.$store.dispatch('myCource/changeRecord',[]);
									uni.navigateTo({
										url:`./testDetail`
									})
								}
							}
						})
					}else{
						uni.navigateTo({
							url:`./testDetail`
						})
					}
				}else{
					uni.showToast({
						title:'数据获取失败',
						icon:'none'
					})
				}
			},
			// 子页面调用刷新数据
			changeData(){
				console.log('刷新了');
				this.getData();
			},
			//数据初始化
			async getData(){
				// 获取课程id
				let courceId = this.$store.state.myCource.courceId;
				const [err,res] = await this.request({
					url:`${this.SERVER}/api/chapterTests/${courceId}`,
					method:'get'
				})
				if(res.data.code === 0){
					this.sectionInfo = res.data.data;
					console.log('章节练习',this.sectionInfo);
					let testCount = 0;	//习题总数
					let haveCount = 0;	//练习总数
					let rightCount = 0; //正确总数
					this.sectionInfo.forEach(item => {
						if(item.chapter_test_models.length > 0)
						testCount += item.chapter_test_models.length;
						haveCount += item.haveCount || 0;
						rightCount += item.rightCount || 0;
					})
					this.correct = Math.floor(rightCount / testCount * 100);
					this.completion =Math.floor(haveCount / testCount * 100);
				}
			}
		},
		onLoad:function(){
			this.getData();
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
