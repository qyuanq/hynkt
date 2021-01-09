<template>
	<view>
		<Question :question="question" :userInfo="userInfo" v-if="hackReset" ></Question>
		<view class="comments">
			<Comment 
			v-for="(item,index) in comments" 
			:key="item.id" 
			:comment="item" 
			:userInfo="userInfo"
			@replyUser="replyUser($event,item,index)"
			@getReplay="getReplay($event,item)"
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
	import Question from '../../components/questions/question'
	import Comment from '../../components/questions/comment'
	import {renderTime} from '../../static/js/common.js'
	export default {
		components:{
			Question,
			Comment
		},
		data() {
			return {
				question:null,
				userInfo:null,
				hackReset:true,
				SERVER:this.development,
				commentPlaceholder:'请输入评论...',
				content:'',				//评论内容v-model实现双向绑定
				comments:[],			//评论
				replyUserComment:'',	//评论对象
				isOne:false,
				text:''
			};
		},
		methods:{
			// 提交评论
			submit(){
				let myDate = renderTime(new Date());
				if (this.content == "") {
				    uni.showToast({
						title:'输入内容不能为空'
					})
				}else{
					let AnserquestionModelId = '';
					let CommentsModelId = '';
					let to_user_id = '';
					if(this.replyUserComment){
						to_user_id = this.replyUserComment.UsersModelId;
						CommentsModelId = this.replyUserComment.id;
					}else{
						// 添加根评论
						AnserquestionModelId = this.question.id;
					}
					let comment = {
						AnserquestionModelId:AnserquestionModelId,
						CommentsModelId:CommentsModelId,
						to_user_id:to_user_id,
						level:this.replyUserComment.index2,
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
						success:(res) => {
							console.log('添加成功返回数据',res);
							uni.showToast({
								title:'评论成功'
							})
							let newComment = {
								id:res.data.data.id,
								content:this.content,
								date:'刚刚',
								users_model:{
									icon:this.userInfo.icon,
									username:this.userInfo.username
								}
							}
							if(!this.replyUserComment){
								newComment.replay_models = [];
								this.comments.unshift(newComment);
								console.log('comments1:',this.comments);
							}else{
								let index = this.replyUserComment.index;
								let index2 = this.replyUserComment.index2
								if(index2){
									// newComment.content = '回复@'+ this.replyUserComment.users_model.username + newComment.content;
									newComment.level = 1;
									newComment.to_user = {
										username : this.replyUserComment.users_model.username
									}
									console.log("new",newComment);
									this.comments[index].children.push(newComment);
								}else{
									if(this.replyUserComment.countShow){
										console.log('comments',this.comments);
										this.comments[index].text = this.content;
										this.comments[index].replay_models.length = this.comments[index].replay_models.length ?this.comments[index].replay_models.length + 1 : 1;
										console.log('回复数量：',this.comments[index].replay_models.length);
									}else{
										this.comments[index].children.unshift(newComment);
									}
								}
							}
							this.content = '';
						}
					})
				}
			},
			// 回复用户评论
			replyUser(args,item,index){
				args = args.detail.__args__;
				this.replyUserComment = args[0];	//保存评论对象
				this.replyUserComment.index = index;
				this.replyUserComment.id = item.id;	
				this.commentPlaceholder = args[1];	//输入框提示文本
				console.log('replyUserComment',this.replyUserComment)
			},
			getReplay(child,item){
				item.children = child.detail.__args__[0];
				console.log(item,this.comments);
			}
		},
		onLoad:function(options){
			this.question = JSON.parse(decodeURIComponent(options.question));
			this.userInfo = this.question.users_model;
			console.log('提问详情',this.question)
			this.request({
				url:`${this.SERVER}/api/comments/${this.question.id}`,
				method:'get',
				success:(res) => {
					this.comments = res.data.data.map(item => {
						item.date = renderTime(item.date)
						return item;
					});
					
					console.log('评论',res.data);
				}
			})
		},
		onShow() {
			this.hackReset = false;
			this.$nextTick(() => {
				this.hackReset = true;
			})
		}
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
}
</style>
