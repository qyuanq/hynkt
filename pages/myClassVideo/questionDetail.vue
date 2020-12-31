<template>
	<view>
		<Question :question="question" :userInfo="userInfo" v-if="hackReset" ></Question>
		<view class="comments">
			<view class="comment" v-for="item in comments" :key="item.id">
				<view class="box-top user">
					<view class="icon-head">
						<image :src="SERVER + item.users_model.icon" />
					</view>
					<text class="phone">{{item.users_model.phone}}</text>
				</view>
				<view class="box-center">
					<view class="content">{{item.content}}</view>
					<view class="reply">等多少回复</view>
				</view>
				<view class="box-bottom">
					<view class="date">{{item.date}}</view>
					<view class="btns">
						<view class="praise-btn"><icon :class="[up ? 'active' : ' ','iconfont','my-icon-dianzan',]" @tap.stop="giveLike"/><text class="count">{{praiseCount}}</text></view>
						<view class="comment-btn"><icon class="iconfont my-icon-pinglun"></icon></view>
					</view>
				</view>
			</view>
			<view class="published">
				<input type="text" :placeholder="commentPlaceholder" class="input" />
				<button class="btn">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Question from '../../components/questions/question'
	export default {
		components:{
			Question
		},
		data() {
			return {
				question:null,
				userInfo:null,
				hackReset:true,
				SERVER:this.development,
				commentPlaceholder:'请输入评论...',
				comments:[]		//评论
			};
		},
		onLoad:function(options){
			this.question = JSON.parse(decodeURIComponent(options.question));
			this.userInfo = this.question.users_model;
			console.log('提问详情',this.question)
			this.request({
				url:`${this.SERVER}/api/comments/${this.question.id}`,
				method:'get',
				success:(res) => {
					this.comments = res.data.data;
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
		.reply{
			width:100%;
			height:72rpx;
			line-height:72rpx;
			background:#f7f7f7;
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
}
</style>
