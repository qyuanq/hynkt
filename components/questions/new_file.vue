<template>
	<view @tap.stop="stop">
	<view class="comment" @tap.stop="replyUser(comment,0)">
		<view class="box-top user">
			<view class="icon-head">
				<image :src="SERVER + commentData.users_model.icon" />
			</view>
			<text class="phone">{{commentData.users ? commentData.users.username : commentData.users_model.username}}</text>
		</view>
		<view class="box-center">
			<view class="content" v-if="commentData.level">
				<text>回复</text>
				<text class="username">{{'@' + commentData.to_user.username}}</text>
				<text>{{commentData.content}}</text>
			</view>
			<view class="content" v-else>{{commentData.content}}</view>
			<!-- 没有回复或者回复未展开提交回复时显示 -->
			<view class="replay_content" v-show="commentData.text && isShow === !countShow">
				<text>{{'@' + userInfo.username}}</text><text class="text">{{commentData.text}}</text>
			</view>
			<view class="replayCount" v-if="commentData.replay_models.length > 0 && countShow" @tap.stop="getReplay(commentData.id)">等{{commentData.replay_models.length}}条回复</view>
			<view class="replay" v-if="children">
				<comment v-for="comment in children" :comment="comment" :userInfo="userInfo" :key="comment.id" @tap.stop="replyUser(comment,1)"></comment>
			</view>
		</view>
		<view class="box-bottom">
			<view class="date">{{commentData.date}}</view>
			<praise :praiseCount="commentData.praise" :onLikeUrl="onLikeUrl" :isLikeUrl="isLikeUrl"></praise>
		</view>
	</view>
	<!-- 弹出回复菜单 -->
	<van-popup :show="btnShow" 
		@close="onClose"
		@click-overlay="onClose"
		position="bottom"
	>
		<view class="published">
			<input type="text" ref="input" :placeholder="commentPlaceholder" class="input" v-model="content"/>
			<button class="btn" @tap="submit">发送</button>
		</view>
	</van-popup>
	</view>
</template>

<script>
	import comment from './comment';
	import praise from './praise';
	import {renderTime} from '../../static/js/common.js'
	export default{
		name:'comment',
		components:{praise,comment},
		props:{
			comment:{
				type:Object
			},
			userInfo:{
				type:Object
			}
		},
		data(){
			return{
				SERVER:this.development,
				children:null,			//回复集合
				countShow:true,			//显示等多少条回复
				commentPlaceholder:'',	//输入框提示值
				replyUserComment:null,	//评论对象
				isShow:false,
				btnShow:false,			//回复菜单
				content:''				//文本框内容
			}
		},
		computed:{
			commentData(){
				return this.comment
			},
			// 点赞url
			onLikeUrl(){
				return this.comment.CommentsModelId ? `${this.SERVER}/api/like?userId=${this.userInfo.id}&replayId=${this.comment.id}` : `${this.SERVER}/api/like?userId=${this.userInfo.id}&commentId=${this.comment.id}`
			},
			// 点赞状态url
			isLikeUrl(){
				return this.comment.CommentsModelId ? `${this.SERVER}/api/isLike?userId=${this.userInfo.id}&replayId=${this.comment.id}` : `${this.SERVER}/api/isLike?userId=${this.userInfo.id}&commentId=${this.comment.id}`
			}
		},
		methods:{
			// 获取全部回复，参数：评论id
			getReplay(commentId){
				this.request({
					url:`${this.SERVER}/api/replays/${commentId}`,
					method:'get',
					success: (res) => {
						this.children = res.data.data.map(item => {
							// 格式化时间
							item.date = renderTime(item.date)
							// 回复存储答疑id
							item.AnserquestionModelId = this.commentData.AnserquestionModelId
							return item;
						});
						// 将回复挂载到评论上
						this.commentData.children = this.children;
						console.log('children:',this.children);
						// 不显示等多少条回复
						this.countShow = false;
						this.$emit('getReplay',this.children);
					}
				})
			},
			replyUser(comment,level){
				// 调起回复输入框
				// console.log('查看huifu',comment,this.countShow);
				// this.btnShow = true;
				// 改变输入框提示内容
				this.commentPlaceholder = '回复@' + comment.users_model.username;
				comment.index2 = level;
				comment.countShow = this.countShow;
				this.replyUserComment = comment;	//保存当前评论对象
				console.log('查看to_user',this.replyUserComment)
				// 将评论对象和输入框提示内容传给父组件
				this.$emit('replyUser',this.replyUserComment,this.commentPlaceholder);
			},
			// 关闭弹窗
			onClose(){
				console.log('关闭了');
				this.btnShow = false;
			},
			// 回复评论
			submit(){
				// 定义当前时间
				let myDate = renderTime(new Date());
				if (this.content == "") {
				    uni.showToast({
						title:'输入内容不能为空'
					})
				}else{
					// 定义data传递给后端
					let comment = {
						AnserquestionModelId:this.comment.AnserquestionModelId,
						CommentsModelId:this.replyUserComment.id,
						to_user_id:this.replyUserComment.UsersModelId,
						level:this.replyUserComment.index2,
						data:{
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
							// 前端显示评论信息
							let newComment = {
								id:res.data.data.id,
								content:this.content,
								date:'刚刚',
								users_model:{
									//显示token 的头像和用户名
									icon:this.userInfo.icon,
									username:this.userInfo.username
								}
							}
							let index = this.replyUserComment.index;
							let index2 = this.replyUserComment.index2
							if(index2){	//回复其他人的回复
								// newComment.content = '回复@'+ this.replyUserComment.users_model.username + newComment.content;
								newComment.level = 1;
								newComment.to_user = {
									username : this.replyUserComment.users_model.username
								}
								console.log("new",newComment);
								this.commentData.children.push(newComment);
							}else{	//回复评论
								// 等多少条回复显示，说明回复内容未展开
								if(this.replyUserComment.countShow){
									this.commentData.text = this.content;
									this.commentData.replay_models.length = this.commentData.replay_models.length ?this.commentData.replay_models.length + 1 : 1;
									console.log('comments',this.commentData.text && this.isShow === !this.countShow);
								}else{
								//等多少条回复未显示，说明回复内容已展开
									this.commentData.children.unshift(newComment);
								}
							}
							this.content = '';
							this.btnShow = false;
						}
					});
					
				}
			}
		}
	}
	
</script>

<style lang="scss">
@mixin replayCount(){
	width:100%;
	height:72rpx;
	line-height:72rpx;
	background:#F7F7E4;
	color:#507daf;
}
.user{
	padding-top:40rpx;
	.icon-head{
		width:80rpx;
		height:80rpx;
		float:left;
		image{
			width:100%;
			height:100%;
			border-radius: 100%;
		}
	}
	.phone{line-height:80rpx;margin-left:15rpx;color:#888;font-size:20rpx;}
}
.box-center,.box-bottom{
	margin-left:95rpx;
	margin-right:30rpx;
}
.box-center{
	.username{
		color:#507daf;
		margin-right:20rpx;
	}
	.replayCount{
		margin-top:10rpx;
		@include replayCount;
	}
	.replay_content{
		@include replayCount;
		.text{color:#333;margin-left:20rpx;}
	}
}
.box-bottom{
	display:flex;
	justify-content: space-between;
	.btns{
		.praise-btn,.comment-btn{
			display:inline-block;
		}
	}
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
</style>
