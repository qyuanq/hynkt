<template>
	<view class="carb">
		<view class="pic">
			<image :src="development + hotCource.head_picture"></image>
		</view>
		<view class="content">
			<view class="title">{{hotCource.name}}</view>
			<view class="classes" v-if="hotCource.label">[{{hotCource.label}}]</view>
			<view class="class-code" v-if="hotCource.classCode">{{hotCource.classCode}}</view>
			<view class="classes" v-if="hotCource.type">({{hotCource.type}})</view>
			<view class="price clearfix">
				<view class="num"><text class="sign" v-if="hotCource.retail_price">￥</text><text class="original">{{hotCource.disc_price}}</text><text class="current" v-if="hotCource.retail_price">￥{{hotCource.retail_price}}</text></view>
				<button class="btn btnA" v-if="audition">点击试听</button>
				<button class="btn btnB" v-if="normal">开始学习</button>
				<button class="btn btnO" v-if="renewal">去续费</button>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		hotCource:{
			type:Object
		},
		normal:{
			type:Boolean
		},
		renewal:{
			type:Boolean
		},
		audition:{
			type:Boolean
		}
	},
	data(){
		return{
			development:this.development
		}
	}
}
</script>

<style lang="scss">
	.carb{
		display:flex;
		margin-top:20rpx;
		.pic{
			width:300rpx;height:auto;margin-right:12rpx;
			image{width:100%;height:100%;border-radius:7px;}
		}
		.content{
			flex:1;
			width:426rpx;
			.title{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:12px;color:#333;font-weight:bold;}
			.classes,.class-code{font-size:11px;color:#888;margin-top:10px;}
			.price{
				margin-top:10px;
				.num{
					float:left;
					.sign{font-size:11px;color:#FD9801;}
					.original{font-size:17px;color:#FD9801;}
					.current{font-size:12px;color:#969799;text-decoration: line-through;display:line-height;margin-left:5px;}
				}
				button{padding-left:0;padding-right:0;margin-left:0;margin-right:0;}
				.btn{width:120rpx;height:36rpx;line-height: 36rpx;text-align: center;color:#fff;font-size:12px;border-radius:20rpx;}
				.btnA{float:right;background:#FD9801;margin-right:15px;margin-top:5px;}
				.btnB{background:#41A5FD;}
				.btnO{background:#FD9801;}
			}
		}
	}
	
</style>
