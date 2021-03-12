<template>
	<view class="container">
		<van-tabs>
		  <van-tab title="收藏视频">
			  内容 1
		  </van-tab>
		  <van-tab title="收藏练习">
			  <topic :data="topics" isType="collection"></topic>
		  </van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import topic from '../../components/test-topic/topic.vue'
	export default {
		components:{topic},
		data() {
			return {
				topics:null,	//收藏的题
				SERVER:this.development
			};
		},
		computed:{
			// 当前用户信息
			users(){
				return uni.getStorageSync('user');
			}	
		},
		onLoad:async function(){
			// 获取章节下所有习题
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/collectionall?userId=${this.users.id}&isTest=true`,
				method:'get'
			})
			if(res.data.code === 0){
				this.topics = res.data.data;
				console.log('收藏的练习',res.data.data);
			}
		}
	}
</script>

<style lang="scss">
.van-tabs__line{
	background-color: #000 !important;
}
</style>
