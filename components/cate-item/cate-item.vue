<template>
	<view class="item">
		<p class="title">{{title}}</p>
		<view class="content">
			<span class="specialty" v-for="item in specialty">{{item}}</span>
		</view>
		<view class="divider"></view>
	</view>
</template>

<script>
export default{
	props:{
		title:{
			type:String,
			default:''
		},
		specialty:{
			type:Array,
			default:() => {
				return []
			}
		}
	},
	data(){
		return{}
	}
}
</script>

<style lang="scss">
	.item{
		width:100%;
		background:#fff;
		padding:10px;
		.title{font-size:14px;color:#333;font-weight:700;}
		.content{
			margin-top:10px;
			.specialty{display:inline-block;font-size:12px;height:20px;line-height:20px;color:#333;background:#f2f1f1;border-radius:10px;padding-left:7px;padding-right:7px;margin-right:10px;margin-top:10px;}
		}
		.divider{margin-top:10px;height:5px;background:#f6f7f8;}
	}
</style>
