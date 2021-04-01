<template>
	<view class="cart">
		<image :src="img"></image>
		<view class="content">
			<view class="title"></view>
			<slot name="label"></slot>
			<view class="option" v-if="option"></view>
			<view class="priceAndNumber">
				<view class="price">￥12.8</view>
				<view class="number" v-if="number"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			option:{
				type:Boolean,
				default:false
			},
			number:{
				type:Boolean,
				default:false
			},
			title:{
				type:String
			},
			img:{
				type:String
			}
		}
	}
</script>

<style lang="scss">
	.cart{
		display: flex;
		justify-content: space-between;
	}
</style>
