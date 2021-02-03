<template>
	<view class="question">
		<view class="head">
			<view class="user">
				<view class="icon-head">
					<image :src="SERVER + userInfo.icon" />
				</view>
				<text class="phone">{{userInfo.phone}}</text>
			</view>
			<view class="btns">
				<Praise class="zan" :praiseCount="praiseCount" :onLikeUrl="onLikeUrl" :isLikeUrl="isLikeUrl" @changeLike="changeLike"></Praise>
				<view class="comment-btn"><icon class="iconfont my-icon-pinglun"></icon><text class="count">{{commentCounnt}}</text></view>
				<icon class="iconfont my-icon-shanchu" v-if="userInfo.id === currentUserId" @tap.stop="deleteQuestion(question.id)" />
			</view>
		</view>
		<view class="center">
			<view class="content">
				{{question.content}}
			</view>
			<view class="img" v-if="question.picture">
				<image class="pic" :src="SERVER + question.picture"></image>
			</view>
			<view class="date">{{date}}</view>
		</view>
		<view class="bottom">
			发自: <text class="bread">  {{question.source}}</text>
		</view>
	</view>
</template>

<script>
	import Praise from './praise';
	import {renderTime} from '../../static/js/common.js'
	export default{
		components:{
			Praise
		},
		props:{
			userInfo:{
				type:Object
			},
			question:{
				type:Object
			},
			index:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				SERVER:this.development,
				date:null,		//发表时间
				onLikeUrl:'',	//点赞请求url
				isLikeUrl:'',	//是否点赞标识url
				currentUserId:null //当前用户id
			}
		},
		computed:{
			commentCounnt(){
				return this.question.comment
			},
			// 点赞总量
			praiseCount(){
				console.log('questionpraise',this.question.praise);
				return this.question.praise
			}
		},
		methods:{
			// 接收点赞总数
			changeLike(arg){
				// this.praiseCount = arg;
				console.log('question接收改变praiseCount',arg)
				// 通知页面修改点赞总数，参数1：总数；参数2:question下标
				uni.$emit('change_praise',[arg,this.index]);
			},
			// 删除该用户的答疑
			async deleteQuestion(id){
				const [err,res] = await uni.showModal({
					content:"确定要删除吗?"
				})
				if(res.confirm){
					const [errdelete,resultdelete] = await this.request({
						url:`${this.SERVER}/api/answerQuestions/${id}`,
						method:'delete'
					})
					if(resultdelete.data.data){
						uni.showToast({
							title:'删除成功'
						});
						// 通知页父组件我删除了，参数1：总数；参数2:question下标
						this.$emit('delete',this.index);
					}
				}
			}
		},
		async created(){
			// 获取当前用户id
			const [err,res] = await uni.getStorage({
				key:'user'
			})
			this.currentUserId = res.data.id;
			this.onLikeUrl =`${this.SERVER}/api/like?userId=${this.userInfo.id}&anserQuestionId=${this.question.id}`;
			this.isLikeUrl =`${this.SERVER}/api/isLike?userId=${this.userInfo.id}&anserQuestionId=${this.question.id}`;
			// 日期时间格式化
			this.date = renderTime(this.question.date);
		}
	}
</script>

<style lang="scss">
	.question{
		margin-top:10rpx;
		box-shadow: 2rpx 2rpx 10rpx #e3e2e2;
		width:710rpx;
		margin:0 auto;
		border-radius: 20rpx;
		padding:0 0 40rpx 10rpx;
		.head{
			width:660rpx;
			display:flex;
			justify-content: space-between;
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
			.btns{
				padding-top:20rpx;
				.comment-btn,.zan{
					display: inline-block;
					.count{margin-left:20rpx;}
				}
				.comment-btn{
					margin-left:30rpx;
				}
				.active{
					color:rgb(255,102,0);
				}
				.my-icon-shanchu{
					position:absolute;
					right:20rpx;
				}
			}
		}
		.center{
			margin-left:95rpx;
			margin-right:60rpx;
			.content{
				width:100%;
				height:auto;
				word-wrap:break-word;
				word-break:normal; 
			}
			.date{color:#ccc;font-size: 20rpx;}
			.img{
				.pic{width:100%;}
			}
		}
		.bottom{
			margin:40rpx 180rpx 0 95rpx;
			font-size:24rpx;
			.bread{
				color:#41A5FD;
			}
		}
	}
</style>
