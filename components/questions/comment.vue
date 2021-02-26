<template>
	<!--uni-app阻止事件冒泡的方法 -->
	<view @tap.stop="stop" @longpress.stop="stop">
	<view class="comment" @tap="replyUser(commentData)" @longpress="pupop(commentData.users_model.id)">
		<view class="box-top user">
			<view class="icon-head">
				<image :src="SERVER + commentData.users_model.icon" />
			</view>
			<text class="phone">{{username}}</text>
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
				<text>{{myInfo.username+':'}}</text><text class="text">{{commentData.text}}</text>
			</view>
			<view class="replayCount" v-if="commentData.replay_models.length > 0 && countShow" @tap.stop="getReplay(commentData.id)">等{{commentData.replay_models.length}}条回复</view>
			<!-- 回复 -->
			<view class="replay" v-if="children">
				<comment v-for="comment in commentData.children" :comment="comment"  :key="comment.id"></comment>
				<!-- 展开更多回复 -->
				<view class="more" v-if="pageSize < countPage" @tap.stop="showMore(commentData.id)">展开更多</view>
			</view>
		</view>
		<view class="box-bottom">
			<view class="date">{{commentData.date}}</view>
			<praise :praiseCount="commentData.praise" :onLikeUrl="onLikeUrl" :isLikeUrl="isLikeUrl"></praise>
		</view>
	</view>
	<!-- 弹出回复菜单 -->
	<van-popup :show="btnShow" 
		@close="onPopupClose"
		@click-overlay="onPopupClose"
		position="bottom"
	>
		<view class="published">
			<input type="text" ref="input" :placeholder="commentPlaceholder" class="input" v-model="content"/>
			<button class="btn" @tap="submit">发送</button>
		</view>
	</van-popup>
	<!-- 长按菜单 -->
	<van-action-sheet
	  :show="popupShow"
	  :actions="actions"
	  cancel-text="取消"
	  @close="onClose"
	  @cancel="onCancel"
	  @select="onSelect($event,commentData)"
	/>
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
			}
		},
		data(){
			return{
				SERVER:this.development,
				children:null,			//回复集合
				countShow:true,			//显示等多少条回复，默认显示
				commentPlaceholder:'',	//输入框提示值
				replyUserComment:null,	//评论对象
				isShow:false,			//标识
				btnShow:false,			//回复菜单
				content:'',				//文本框内容
				popupShow:false,		//长按菜单
				actions:[				//长按菜单菜单项
					{name:'回复'},
					{name:'复制评论'}
				],
				isName:false,			//标识:actions是否存在{name:'删除'}，默认为不存在
				pageSize:1,				//当前分页页码
				countPage:null,			//后端返回的总页码
				myInfo:null				//当前用户信息
			}
		},
		created(){
			// 获取当前用户的信息
			this.myInfo = uni.getStorageSync('user');
		},
		computed:{
			// 评论的用户名
			username(){
				return this.commentData.users ? this.commentData.users.username : this.commentData.users_model.username
			},
			//新值代替接收父组件传递的comment
			commentData(){
				return this.comment
			},
			// 点赞url
			onLikeUrl(){
				return this.comment.CommentsModelId ? `${this.SERVER}/api/like?userId=${this.myInfo.id}&replayId=${this.comment.id}` : `${this.SERVER}/api/like?userId=${this.myInfo.id}&commentId=${this.comment.id}`
			},
			// 点赞状态url
			isLikeUrl(){
				return this.comment.CommentsModelId ? `${this.SERVER}/api/isLike?userId=${this.myInfo.id}&replayId=${this.comment.id}` : `${this.SERVER}/api/isLike?userId=${this.myInfo.id}&commentId=${this.comment.id}`
			}
		},
		methods:{
			// 获取全部回复，参数：评论id
			async getReplay(commentId){
				let url = `${this.SERVER}/api/replays/${commentId}`;
				const res = await this.pageLoad(url,this.pageSize,this.children);
				this.children = res.comments.map(item => {
					// 格式化时间
					item.date = renderTime(item.date)
					// 回复存储答疑id
					item.AnserquestionModelId = this.commentData.AnserquestionModelId
					return item;
				});
				// 将回复挂载到评论上
				this.commentData.children = this.children;
				// 通知父组件更新评论内容
				this.$emit('changeCommentContent',this.commentData);
				// 不显示等多少条回复
				this.countShow = false;
				// 设置分页页码
				this.countPage = res.countPage;
			},
			replyUser(comment){
				// 调起回复输入框
				this.btnShow = true;
				// 改变输入框提示内容
				this.commentPlaceholder = '回复@' + comment.users_model.username;
				// comment.replay_models存在说明回复评论，不存在说明回复回复信息，index2为区分标识
				comment.replay_models ? comment.index2 = 0 : comment.index2 = 1;
				// comment对象保存当前'等多少条回复'显示状态
				comment.countShow = this.countShow;
				this.replyUserComment = comment;	//保存当前评论对象
				console.log('查看to_user',this.replyUserComment)
			},
			// 关闭弹窗
			onPopupClose(){
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
					let CommentsModelId;
					// 说明点击的回复
					if(this.replyUserComment.CommentsModelId){
						CommentsModelId = this.replyUserComment.CommentsModelId;
					}else{
						// 说明点击的评论
						CommentsModelId = this.replyUserComment.id;
					}
					// 定义data传递给后端
					let comment = {
						AnserquestionModelId:this.replyUserComment.AnserquestionModelId,
						CommentsModelId:CommentsModelId,
						to_user_id:this.replyUserComment.users_model.id,
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
						success:async (res) => {
							if(res.data.code === 0){
								uni.showToast({
									title:'评论成功'
								});
								// 前端显示评论信息
								let newComment = {
									AnserquestionModelId:this.replyUserComment.AnserquestionModelId,
									UsersModelId:this.replyUserComment.users_model.id,
									CommentsModelId:CommentsModelId,
									id:res.data.data.id,
									content:this.content,
									date:'刚刚',
									users_model:{
										//显示token 的头像和用户名
										id:this.myInfo.id,
										icon:this.myInfo.icon,
										username:this.myInfo.username
									}
								}
								let index2 = this.replyUserComment.index2
								if(index2){	//回复其他人的回复
									newComment.level = 1;
									newComment.to_user = {
										username : this.replyUserComment.users_model.username
									}
									console.log("new",newComment,this.$parent.children);
									this.$parent.commentData.children.push(newComment);
									// 派发更新评论内容
									uni.$emit('changeCommentContent',this.$parent.commentData);
								}else{	//回复评论
									// 等多少条回复显示，说明回复内容未展开
									if(this.replyUserComment.countShow){
										this.commentData.text = this.content;
										this.commentData.replay_models.length = this.commentData.replay_models.length ?this.commentData.replay_models.length + 1 : 1;
									}else{
										//等多少条回复未显示，说明回复内容已展开
										this.commentData.children.unshift(newComment);
										this.commentData.replay_models.length = this.commentData.children.length;
									}
									// 通知父组件更新评论内容
									this.$emit('changeCommentContent',this.commentData);
								}
								this.content = '';
								this.btnShow = false;
								// 评论总数 + 1
								this.$root.question.comment += 1;
							}else{
								uni.showToast({
									title:'评论失败'
								});
							}
						}
					});
					
				}
			},
			// 是否显示删除项
			pupop(userId){
				uni.getStorage({
					key:'user',
					success:(res) => {
						// 评论或回复的用户id等于当前用户id，增加删除项
						if(userId === res.data.id && !this.isName){
							this.actions.push({name:'删除'});
							this.isName = true;
						} 
					}
				});
				this.popupShow = true;
			},
			//关闭选项菜单
			onClose(){
				this.popupShow = false;
			},
			// 取消操作
			onCancel(){
				this.popupShow = false;
			},
			// 选择选项操作
			async onSelect(event,comment){
				console.log('commentId',comment);
				if(event.detail.name === '回复'){
					this.replyUser(this.commentData);
				}else if(event.detail.name === '复制评论'){
					uni.setClipboardData({
						data:this.commentData.content
					})
				}else if(event.detail.name === '删除'){
					const [errModel, resModel] = await uni.showModal({
						content:"确定要删除评论吗?",
						showCancel:true,
					})
					if(resModel.confirm){
						// 删除评论或回复
						const [error,res] = await this.request({
							url:`${this.SERVER}/api/mycomments?comment=${encodeURIComponent(JSON.stringify(comment))}`,
							method:'delete'
						})
						if(res.data.code === 0){
							if(comment.replay_models){
								// 删除评论
								this.$emit('deleteComment',comment.id);
								// 评论总数-1
								const count = comment.replay_models ? comment.replay_models.length + 1 : 1;
								this.$root.question.comment -= count;
							}else{
								// 删除回复
								this.$parent.commentData.children.forEach((item,index)=>{
									// 找到要删除的回复的下标index
									 if(item.id === comment.id){
										this.$parent.commentData.children.splice(index,1);
									 }
								});
								// 评论总数-1
								this.$root.question.comment -= 1;
							}
							uni.showToast({
								title:'删除成功',
								icon:'success'
							});
						}else{
							uni.showToast({
								title:'删除失败',
								icon:'none'
							});
						}
					}else if(res.cancel){
						console.log('用户点击了取消');
					}
				}
			},
			// 展开更多
			async showMore(commentId){
				// 当前页加 1
				this.pageSize += 1;
				// 判断pageSize 是不是最后一页
				if(this.pageSize <= this.countPage){
					let url = `${this.SERVER}/api/replays/${commentId}/${this.pageSize}`;
					const res = await this.pageLoad(url,this.pageSize,this.commentData.children);
					this.children = res.map(item => {
						// 格式化时间
						if(item.date !== '刚刚'){
							item.date = renderTime(item.date)
						}
						// 回复存储答疑id
						item.AnserquestionModelId = this.commentData.AnserquestionModelId
						return item;
					});
					// 将回复挂载到评论上
					this.commentData.children = this.children;
				}else{
					console.log('没有数据了');
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
	.more{
		color:#507daf;
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
