<template>
	<view class="content">
		<view :class="['queAndAns',index === 0 ? 'border-none' : ' ']" v-for="(item,index) in result" :key="item.title">
			<text class="test-title">第{{index + 1}}题&nbsp;&nbsp;{{item.title}}</text>
			<icon :class="['iconfont',item.icon ? 'my-icon-correct' : 'my-icon-error']"></icon>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			result:{
				type:Array
			}
		}
	}
</script>

<style lang="scss">
.content{
	margin-bottom:96rpx;
	.queAndAns{
		height:100rpx;
		line-height: 100rpx;
		padding:0 30rpx;
		display: flex;
		justify-content: space-between;
		border-top:1px dashed $uni-text-color-disable;
		.test-title{
			width:580rpx;
			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
.border-none{
	border-top:none;
}
</style>
