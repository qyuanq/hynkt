<template>
	<view class="container">
		<view class="question-list">
			<Question 
			v-for="(item,index) in question" 
			:question="item" 
			:userInfo="item.users_model" 
			:index="index" 
			:key="item.id" 
			@delete="deleteQuestion"
			@tap="onDetail(item.id,index)">
			</Question>
			<view v-show="load">
				<van-loading size="24px">加载中...</van-loading>
			</view>
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
				courceId:null,	//当前课程id
				pageSize:1	 ,  //当前分页页码
				countPage:0,	//后端返回的总页码
				load:false		//加载中
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
			onDetail(questionId,index){
				uni.navigateTo({
					url:`./questionDetail?questionId=${questionId}&index=${index}`
				})
			},
			// 删除答疑
			deleteQuestion(id){
				console.log('question222',id);
				this.question.forEach((item,index) => {
					if(item.id === id){
						this.question.splice(index,1);
					}
				})
			}
		},
		// 刷新页面：与questionDetail点赞数保持一致
		//onShow:function(){
			//进入页面执行下拉刷新
			//uni.startPullDownRefresh();
		//},
		onLoad: async function(option){
			if(option){
				this.coureId = option.id
			}
			// this.coureId = option.id || this.coureId;
			// 获取答疑
			let url = `${this.SERVER}/api/answerQuestions/${this.coureId}`;
			const result = await this.pageLoad(url,this.pageSize,this.question);
			this.question = result.comments;
			this.countPage = result.countPage;
			console.log('countPage',this.countPage)
			// 获取当前用户头像
			const [err,res] = await uni.getStorage({
				key:'user'
			})
			this.userIcon = this.SERVER + res.data.icon;
		},
		onReady(){
			uni.$on('change_praise',(arg) => {
				const id = arg[1];
				this.question.forEach((item,index) => {
					if(item.id === arg[1]){
						this.$set(this.question[index],'praise',arg[0]);
						return;
					}
				})
			});
			uni.$on('commentChange',(arg) => {
				console.log('评论数变了',arg);
				const id = arg[1];
				this.question.forEach((item,index) => {
					if(item.id === arg[1])
					this.$set(this.question[index],'comment',arg[0]);
				})
			});
			uni.$on('deleteQuestion',id =>{
				this.deleteQuestion(id);
			})
		},
		onReachBottom:async function(){
			// 当前页+1
			this.pageSize += 1;
			// 判断pageSize 是不是最后一页
			if(this.pageSize <= this.countPage){
				let url = `${this.SERVER}/api/answerQuestions/${this.coureId}/${this.pageSize}`
				this.load = true;
				this.question = await this.pageLoad(url,this.pageSize,this.question);
				this.load = false;
			}else{
				console.log('没有数据了');
			}
		},
		// 下拉刷新
		async onPullDownRefresh(){
			uni.showLoading({
			    title: '加载中'
			});
			// pageSize重新初始化
			this.pageSize = 1;
			let url = `${this.SERVER}/api/answerQuestions/${this.coureId}`;
			const result = await this.pageLoad(url,this.pageSize,this.question);
			this.question = result.comments;
			this.countPage = result.countPage;
			//停止当前页面下拉刷新
			uni.stopPullDownRefresh();
			// 隐藏加载提示框
			uni.hideLoading();
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
//加载中
.van-loading{
	display: flex !important;
	margin: 10px 0;
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
