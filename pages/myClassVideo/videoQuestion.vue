<template>
	<view class="container">
		<view class="question-list">
			<Question v-for="item in question" :question="item" :userInfo="item.users_model" :key="item.id" @tap="onDetail(item)"></Question>
		</view>
		<view class="speack-box">
			<view class="icon-head">
				<image :src="userIcon"></image>
			</view>
			<view class="speack-input" @tap="onSkip">说点什么</view>
		</view>
	</view>
</template>

<script>
	import Question from '../../components/questions/question'
	export default {
		components:{Question},
		data() {
			return {
				SERVER:this.development,
				userIcon:' ',   //用户头像
				question:null,
				userInfo:null,
				courceId:null	//当前课程id
			};
		},
		methods:{
			// 跳转发表答疑
			onSkip(){
				uni.navigateTo({
					url:`./uploadQuestion?coureId=${this.coureId}`
				})
			},
			// 跳转答疑详情
			onDetail(question){
				uni.navigateTo({
					url:`./questionDetail?question=${encodeURIComponent(JSON.stringify(question))}`
				})
			}
		},
		onLoad: async function(option){
			this.coureId = option.id;
			// 获取答疑
			await this.request({
				url:`${this.SERVER}/api/answerQuestions/${option.id}`,
				method:'get',
				success:(res) => {
					this.question = res.data.data;
					console.log('res',this.question);
				}
				
			})
			// 获取当前用户头像
			await this.request({
				url:`${this.SERVER}/api/getuser`,
				method:'get',
				success:(res) => {
					this.userIcon = this.SERVER + res.data.icon;
				}
			})
		}
	}
</script>

<style lang="scss">
.icon-head{
	width:80rpx;
	height:80rpx;
	image{
		width:100%;
		height:100%;
		border-radius: 100%;
	}
}
.container{
	.question-list{
		margin:20rpx 20rpx 100rpx 20rpx;
		
	}
	.speack-box{
		position:fixed;
		left:0;
		bottom:0;
		width:710rpx;height:90rpx;
		margin:0 auto;
		background:#fff;
		margin:0 20rpx;
		box-sizing:border-box;
		display:flex;
		justify-content: space-between;
		box-shadow:2rpx 2rpx 10rpx #e3e2e2;
		.speack-input{
			width:610rpx;
			height:50rpx;
			line-height:50rpx;
			background:#E0E0E0;
			font-size:20rpx;
			border-radius:8rpx;
			margin-top:20rpx;
		}
	}
}
</style>
