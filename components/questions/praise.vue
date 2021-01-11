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
			url:{
				type:String
			}
		},
		data(){
			return {
				up:false,
				count:this.praiseCount
			}
		},
		computed:{
			count(){
				return this.praiseCount
			}
		},
		methods:{
			// 接收一个url参数，告诉父组件，数量变了
			async giveLike(){
				// 发起请求
				await this.request({
					// `${this.SERVER}/api/like?userId=${this.userInfo.id}&anserQuestionId=${this.question.id}`
					url:this.url,
					method:'get',
					success:(res) => {
						console.log(res);
						
						// 已点赞
						if(this.up){
							this.up = !this.up;
							this.count -= 1;
							// this.praiseCount -= 1;
						}else{
							// 未点赞
							this.up = !this.up;
							this.count += 1;
							// this.praiseCount += 1;
						}
						
						// 通知父组件
						// this.$emit('changeLike',count);
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
