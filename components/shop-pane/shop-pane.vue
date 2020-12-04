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
				<view class="num"><text class="sign">￥</text><text class="original">{{hotCource.disc_price}}</text><text class="current" v-if="hotCource.retail_price">￥{{hotCource.retail_price}}</text></view>
				<button class="btn" v-if="hotCource.label">点击试听</button>
				<button class="btn" v-if="hotCource.mylearn">开始学习</button>
				<button class="btn" v-if="hotCource.renewal">去续费</button>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		hotCource:{
			type:Object
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
				button{padding-left:0;padding-right:0;}
				.btn{float:right;width:60px;height:18px;line-height:18px;text-align: center;background:#FD9801;color:#fff;font-size:12px;border-radius:10px;margin-right:15px;margin-top:5px;}
			}
		}
	}
	
</style>
