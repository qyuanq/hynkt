<template>
	<view class="zan">
		<icon 
			:class="[up ? 'active' : ' ','iconfont','my-icon-dianzan',]" 
			@tap.stop="giveLike"
		/>
		<text class="count">{{praiseCount}}</text>
	</view>
</template>

<script>
	export default{
		props:[praiseCount],
		methods:{
			// 接收一个url参数，告诉父组件，数量变了
			async giveLike(){
				// 已点赞
				if(this.up){
					this.up = !this.up;
					this.praiseCount -= 1;
				}else{
					this.up = !this.up;
					this.praiseCount += 1;
				}
				// 发起请求
				await this.request({
					url:`${this.SERVER}/api/like?userId=${this.userInfo.id}&anserQuestionId=${this.question.id}`,
					method:'get',
					success:(res) => {
						console.log(res)
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
