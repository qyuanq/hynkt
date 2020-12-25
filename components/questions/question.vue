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
				<view class="zan"><icon :class="[up ? 'active' : ' ','iconfont','my-icon-dianzan',]" @tap="giveLike" /><text class="count">{{question.praise}}</text></view>
				<view class="comments"><icon class="iconfont my-icon-pinglun"></icon><text class="count">0</text></view>
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
	import {renderTime} from '../../static/js/common.js'
	export default{
		props:{
			userInfo:{
				type:Object
			},
			question:{
				type:Object
			}
		},
		data(){
			return{
				SERVER:this.development,
				up:false,
				date:null
			}
		},
		methods:{
			giveLike(){
				this.up = !this.up;
			}
		},
		created(){
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
				.comments,.zan{
					display: inline-block;
					.count{margin-left:20rpx;}
				}
				.comments{
					margin-left:30rpx;
				}
				.active{
					color:rgb(255,102,0);
				}
			}
		}
		.center{
			margin-left:95rpx;
			margin-right:60rpx;
			.content{
				width:100%;
				height:auto;
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
