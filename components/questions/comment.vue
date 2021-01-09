<template>
	<view class="comment" @tap="replyUser(comment,0)">
		<view class="box-top user">
			<view class="icon-head">
				<image :src="SERVER + comment.users_model.icon" />
			</view>
			<text class="phone">{{comment.users ? comment.users.username : comment.users_model.username}}</text>
		</view>
		<view class="box-center">
			<view class="content" v-if="comment.level">
				<text>回复</text>
				<text class="username">{{'@' + comment.to_user.username}}</text>
				<text>{{comment.content}}</text>
			</view>
			<view class="content" v-else>{{comment.content}}</view>
			<!-- 没有回复或者回复未展开提交回复时显示 -->
			<view class="replay_content" v-if="comment.text && isShow === !countShow">
				<text>{{'@' + userInfo.username}}</text><text class="text">{{comment.text}}</text>
			</view>
			<view class="replayCount" v-if="comment.replay_models.length > 0 && countShow" @tap.stop="getReplay(comment.id)">等{{comment.replay_models.length}}条回复</view>
			<view class="replay" v-if="children">
				<comment v-for="comment in children" :comment="comment" :key="comment.id" @tap.stop="replyUser(comment,1)"></comment>
			</view>
		</view>
		<!-- 点赞封装成组件 -->
		<view class="box-bottom">
			<view class="date">{{comment.date}}</view>
			<view class="btns">
				<view class="praise-btn"><icon :class="[up ? 'active' : ' ','iconfont','my-icon-dianzan',]" @tap.stop="giveLike"/><text class="count">{{praiseCount}}</text></view>
				<view class="comment-btn"><icon class="iconfont my-icon-pinglun"></icon></view>
			</view>
		</view>
	</view>
</template>

<script>
	import comment from './comment';
	import {renderTime} from '../../static/js/common.js'
	export default{
		name:'comment',
		components:[comment],
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
				children:null,
				countShow:true,
				commentPlaceholder:'',
				replyUserComment:null,
				isShow:false
			}
		},
		methods:{
			getReplay(commentId){
				this.request({
					url:`${this.SERVER}/api/replays/${commentId}`,
					method:'get',
					success: (res) => {
						this.children = res.data.data.map(item => {
							item.date = renderTime(item.date)
							return item;
						});
						console.log('children:',this.children);
						this.countShow = false;
						this.$emit('getReplay',this.children);
					}
				})
			},
			replyUser(comment,level){
				// 改变输入框提示内容
				this.commentPlaceholder = '回复@' + comment.users_model.username;
				comment.index2 = level;
				comment.countShow = this.countShow;
				this.replyUserComment = comment;	//保存当前评论对象
				console.log('查看to_user',this.replyUserComment)
				// 将评论对象和输入框提示内容传给父组件
				this.$emit('replyUser',this.replyUserComment,this.commentPlaceholder);
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
</style>
