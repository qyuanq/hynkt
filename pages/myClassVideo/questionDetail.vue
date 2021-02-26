<template>
	<view>
		<QuestionDet 
			:key="222"
			:question="question" 
			:userInfo="userInfo" 
			@delete="deleteQuestion">
		</QuestionDet>
		<view class="comments">
			<Comment 
				v-for="(item,index) in comments" 
				:key="item.id" 
				:comment="item" 
				@changeCommentContent="changeCommentContent"
				@deleteComment="deleteComment"
			>
			</Comment>
			<view class="published">
				<input type="text" ref="input" :placeholder="commentPlaceholder" class="input" v-model="content"/>
				<button class="btn" @tap="submit">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import QuestionDet from '../../components/questions/question'
	import Comment from '../../components/questions/comment'
	import {renderTime} from '../../static/js/common.js'
	import {pageLoad} from '../../utils/request.js'
	export default {
		components:{
			QuestionDet,
			Comment
		},
		data() {
			return {
				question:null,			//答疑详情
				userInfo:null,			//评论持有者的用户名和头像
				SERVER:this.development,//服务器地址
				commentPlaceholder:'请输入评论...',
				content:'',				//评论内容v-model实现双向绑定
				comments:[],			//评论数组
				pageSize:1,				//当前分页页码
				countPage:null,			//后端返回的总页码
				myInfo:null				//当前用户信息
			};
		},
		methods:{
			// 提交评论
			submit(){
				//获取当前时间并格式化
				let myDate = renderTime(new Date());
				if (this.content == "") {
				    uni.showToast({
						title:'输入内容不能为空'
					})
				}else{
					// 定义data传递给后端
					let comment = {
						AnserquestionModelId:this.question.id,
						data:{
							UsersModelId:this.question.UsersModelId,
							content:this.content,
							date:myDate
						}
					}
					this.request({
						url:`${this.SERVER}/api/comments`,
						method:'post',
						data:comment,
						success:async(res) => {
							if(res.data.code === 0){
								uni.showToast({
									title:'评论成功'
								})
								
								// 获取当前用户的信息
								this.myInfo = uni.getStorageSync('user');
								
								// 前端显示评论信息
								let newComment = {
									AnserquestionModelId:this.question.id,
									UsersModelId:this.question.UsersModelId,
									id:res.data.data.id,
									content:this.content,
									date:'刚刚',
									users_model:{
										id:this.myInfo.id,
										icon:this.myInfo.icon,
										username:this.myInfo.username
									}
								}
								newComment.replay_models = [];
								this.comments.unshift(newComment);
								console.log('comments1:',this.comments);
								this.content = '';
								// 评论总数 +1
								this.question.comment += 1;
							}else{
								uni.showToast({
									title:'评论失败'
								})
							}
						}
					})
				}
			},
			//comment组件评论内容同步更新
			changeCommentContent(arg){
				const comment = arg.detail.__args__[0];
				console.log('有参数吗',comment)
				this.comments.forEach((item,index) => {
					if(item.id === comment.id){
						this.comments.splice(index,1,comment);
					}
				})
				console.log('更辛后的',this.comments);
			},
			// 删除评论
			deleteComment:function(arg){
				// 获取参数评论id
				let commmentId = arg.detail.__args__[0];
				this.comments.forEach((item,index) => {
					if(item.id === commmentId){
						this.comments.splice(index,1);
					}
				});
			},
			// 删除答疑
			deleteQuestion(id){
				// 触发删除事件
				uni.$emit('deleteQuestion',id);
				uni.navigateBack({
					 delta: 1
				})
			}
		},
		watch:{
			'question.comment':{	//深度监听，监听对象的属性值变化
				handler(val,oldVal){
					// 通知videoQuestion修改评论总数
					uni.$emit('commentChange',[val,this.question.id]);
				},
				deep:true
			}
		},
		onLoad:async function(options){
			// 接收url传递的参数
			const questionId = options.questionId;
			// 获答疑详情
			const [err,result] = await this.request({
				url:`${this.SERVER}/api/questionsDetail/${questionId}`,
				method:'get'
			});
			this.question = result.data.data;
			console.log('question是否有值详细值',this.question);
			this.userInfo = this.question.users_model;
			
			// 分页获取评论信息
			let url = `${this.SERVER}/api/comments/${this.question.id}`;
			let res = await this.pageLoad(url,this.pageSize,this.comments);
			this.comments = res.comments.map(item => {
				item.date = renderTime(item.date)
				return item;
			});
			// 共多少分页
			this.countPage = res.countPage;
		},
		onReady:function(){
			uni.$on('changeCommentContent',(arg) => {
				this.comments.forEach((item,index) => {
					if(item.id === arg.id){
						this.comments.splice(index,1,arg);
					}
				})
				console.log('更辛的',this.comments);
			})
		},
		// 上滑加载
		onReachBottom:async function(){
			// 当前页加 1
			this.pageSize += 1;
			// 判断pageSize 是不是最后一页
			if(this.pageSize <= this.countPage){
				let url = `${this.SERVER}/api/comments/${this.question.id}/${this.pageSize}`;
				const res = await this.pageLoad(url,this.pageSize,this.comments);
				console.log('上滑数据',res);
				this.comments = res.map(item => {
					item.date = renderTime(item.date)
					return item;
				});
			}else{
				console.log('没有数据了');
			}
		},
		//onShow:function() {
			// this.hackReset = false;
			// this.$nextTick(() => {
			// 	this.hackReset = true;
			// })
			// console.log('展示了吗question')
		//}
	}
</script>

<style lang="scss">
page{
	background:#F6F7F8;
}
.published{
	width:100%;
	height:80rpx;
	position: fixed;
	left:0;
	bottom:0;
	background:#fff;
	display:flex;
	justify-content: space-around;
	padding:15rpx 0;
	box-sizing: border-box;
	.input{
		width:580rpx;
		height:50rpx;
		border:2rpx solid #ccc;
		border-radius:10rpx;
		margin-left:10rpx;
		padding-left:20rpx;
	}
	.btn{
		width:120rpx;
		height:50rpx;
		background:#41A5FD;
		color:#fff;
		font-size:24rpx;
		line-height:50rpx;
	}
}
.comments{
	margin-top:10rpx;
	box-shadow: 2rpx 2rpx 10rpx #e3e2e2;
	width:710rpx;
	margin:0 auto;
	border-radius: 20rpx;
	padding:0 0 40rpx 10rpx;
	margin-bottom:80rpx;
}
</style>
