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
			praiseCount:{
				type:Number
			},
			onLikeUrl:{
				type:String
			},
			isLikeUrl:{
				type:String
			}
		},
		data(){
			return {
				up:false,	//点赞标识
				count:this.praiseCount
			}
		},
		watch:{
			// 监听props praiseCount的变化
			praiseCount(){
				// props数据变了,更新data  count的值
				this.count = this.praiseCount;
				// this.request({
				// 	url:this.isLikeUrl,
				// 	method:'get',
				// 	success: (res) => {
				// 		// 获取点赞标识
				// 		this.up = res.data.data;
				// 	}
				// });
			}
		},
		created(){
			this.request({
				url:this.isLikeUrl,
				method:'get',
				success: (res) => {
					// 获取点赞标识
					this.up = res.data.data;
					console.log('是否点赞',this.up);
				}
			});
		},
		methods:{
			// 接收一个url参数，告诉父组件，数量变了
			async giveLike(){
				// 发起请求，点赞请求
				await this.request({
					url:this.onLikeUrl,
					method:'get',
					success:(res) => {
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
					}
				});
			}
		}
	}
</script>

<style>
	.active{
		color:rgb(255,102,0);
	}
</style>
