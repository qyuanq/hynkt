<template>
	<view class="zan">
		<icon 
			:class="[up ? 'active' : ' ','iconfont','my-icon-dianzan',]" 
			@tap.stop="giveLike"
		/>
		<text class="count">{{count}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			// 点赞数量
			praiseCount:{
				type:Number
			},
			// 点赞/取消点赞接口
			onLikeUrl:{
				type:String
			},
			// 是否点赞标识接口
			isLikeUrl:{
				type:String
			}
		},
		data(){
			return {
				up:false,				//点赞标识
				count:this.praiseCount	//点赞总量
			}
		},
		methods:{
			// 获取点赞标识
			async getUp(isLikeUrl){
				const [errUp,resUp] = await this.request({
					url:isLikeUrl,
					method:'get'
				});
				// console.log('resUp',resUp);
				if(resUp.data.code === 0){
					// 获取点赞标识:判断是否点赞
					this.up = resUp.data.data;
				}else{
					uni.showToast({
						title:'获取信息失败',
						icon:'none'
					})
				}
			},
			// 接收一个url参数，告诉父组件，数量变了
			async giveLike(){
				// 发起请求，点赞请求
				const [err,res] = await this.request({
					url:this.onLikeUrl,
					method:'get'
				});
				if(res.data.code === 0){
					// 已点赞
					if(this.up){
						this.up = !this.up;
						this.count -= 1;
					}else{
						// 未点赞
						this.up = !this.up;
						this.count += 1;
					}
					// 通知父组件 点赞总数发生变化
					this.$emit('changeLike',this.count);
				}else{
					uni.showToast({
						title:'点赞失败',
						icon:'none'
					})
				}
			}
		},
		watch:{
			// 监听props praiseCount的变化
			praiseCount(newCount,oldCount){
				// props数据变了,更新data  count的值
				this.count = newCount;
				this.getUp(this.isLikeUrl);
			}
		},
		created(){
			console.log('isLikeUrl',this.isLikeUrl);
			this.getUp(this.isLikeUrl);
		}
	}
</script>

<style>
	.active{
		color:rgb(255,102,0);
	}
</style>
