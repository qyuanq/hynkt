<template>
	<view>
		<view class="serial">第1题（单选）</view>
		<view class="title">良好的师生关系()</view>
		<view class="options">
			
		</view>
		<van-tabbar :active="active" bind:change="onChange">
		  <van-tabbar-item>
			<icon slot="icon" class="iconfont my-icon-huancun"/>
			<icon slot="icon-active" class="iconfont my-icon-shoucang"/>
		    查看答案
		  </van-tabbar-item>
		  <van-tabbar-item>
			<icon slot="icon" class="iconfont my-icon-shoucang"/>
			<icon slot="icon-active" class="iconfont my-icon-shoucang"/>
		    收藏
		  </van-tabbar-item>
		  <van-tabbar-item>
			<icon slot="icon" class="iconfont my-icon-huancun"/>
			<icon slot="icon-active" class="iconfont my-icon-shoucang"/>
		    答题卡
		  </van-tabbar-item>
		  <van-tabbar-item>
			<icon slot="icon" class="iconfont my-icon-huancun"/>
			<icon slot="icon-active" class="iconfont my-icon-shoucang"/>
		    开始学习
		  </van-tabbar-item>
		  <van-tabbar-item>
			<icon slot="icon" class="iconfont my-icon-huancun"/>
			<icon slot="icon-active" class="iconfont my-icon-shoucang"/>
		    学生答疑
		  </van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				icon: {
				  normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
				  active: 'https://img.yzcdn.cn/vant/user-active.png',
				}
			};
		},
		methods:{
			 onChange(event) {
			    this.active = event.detail; 
				console.log('点击的哪个呀',this.active);
			  }
		}
	}
</script>

<style lang="scss">

</style>
