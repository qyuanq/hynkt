<template>
	<view class="container">
		<van-tabs>
		  <van-tab title="已开放">
				<view class="test-item" v-for="item in simTest" :key="item.id">
					<view class="test-title">{{item.title}}</view>
					<view class="test-box">
						<view class="test-info">
							<view class="test-text">考试次数: {{item['mysimulation_models.count'] || 0}}/不限次</view>
							<view class="test-text">最后一次得分: {{item['mysimulation_models.score'] || 0}}分</view>
							<view class="test-text">考试开放时间: {{item.test_time}}</view>
						</view>
						<view class="test-action" @tap="onTest(item)">
							开始<br>考试
						</view>
					</view>
				</view>
		  </van-tab>
		  <van-tab title="未开放">
			还没有模拟考哟
		  </van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SERVER:this.development,
				simTest:[]	//模拟考试
			};
		},
		methods:{
			onTest(item){
				uni.showModal({
					title:"现在开始考试，祝你好运",
					content:"答题时间：120分钟|共题<br>该试卷为不限制考试次数试卷",
					confirmText	:"开始",
					success:res => {
						if(res.confirm){
							this.$store.dispatch('myCource/changeSimulationTest',item);
							console.log('vuex',this.$store.state.myCource.simulationTest);
							uni.navigateTo({
								url:`./testQuestion?testId=${item.id}`
							})
						}
					}
				})
			},
			async initData(){
				let courceId = this.$store.state.myCource.courceId;
				const [err,res] = await this.request({
					url:`${this.SERVER}/api/alltests/${courceId}`,
					method:'get'
				})
				if(res.data.code === 0){
					this.simTest =res.data.data;
					console.log('考试',res.data.data);
				}
			}
		},
		onLoad:function(){
			this.initData()
		}
	}
</script>

<style lang="scss">
.test-item{
	padding:20rpx;
	box-sizing: border-box;
	width:100%;
	.test-title{
		@include font(28rpx,#333);
	}
	.test-box{
		display: flex;
		justify-content: space-between;
		.test-info{
			.test-text{
				margin-top:20rpx;
				@include font(24rpx,#999);
			}
		}
		.test-action{
			width:110rpx;
			height:110rpx;
			text-align: center;
			border-radius:50%;
			background:#41A5FD;
			padding:14rpx 0;
			box-sizing: border-box;
			@include font(28rpx,#fff);
		}
	}
	&:nth-child(n+1){
		border-bottom:10rpx solid #ccc;
	}
}
</style>
