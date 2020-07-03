<template>
	<view class="carb">
		<view class="pic">
			<image :src="picture"></image>
		</view>
		<view class="content">
			<view class="title">{{title}}</view>
			<view class="classes">[{{classes}}]</view>
			<view class="price">
				<view class="num"><text class="sign">￥</text><text class="original">{{original}}</text><text class="current">￥{{current}}</text></view>
				<button class="btn">课程试听</button>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		picture:{
			type:String,
			default:''
		},
		title:{
			type:String,
			defalut:'健康管理师专业技能（三级）精讲班'
		},
		classes:{
			type:String,
			defalut:'课程精讲班'
		},
		original:{
			type:Number,
			default:499
		},
		current:{
			type:Number,
			default:799
		}
	},
	data(){
		return{}
	}
}
</script>

<style lang="scss">
	.carb{
		display:flex;
		.pic{
			width:150px;height:90px;margin-right:12rpx;
			image{width:100%;height:100%;border-radius:7px;}
		}
		.content{
			flex:1;
			.title{font-size:12px;color:#333;font-weight:bold;}
			.classes{font-size:11px;color:#888;margin-top:5px;}
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
