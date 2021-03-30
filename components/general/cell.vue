<template>
	<view class="cell">
		<slot name="icon"></slot>
		<text>{{value}}</text>
		<slot name="btn"></slot>
	</view>
</template>

<script>
	export default{
		props:{
			value:
		},
		data(){
			return{}
		}
	}
</script>

<style>
</style>
