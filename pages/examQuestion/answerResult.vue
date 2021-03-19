<template>
	<view class="container">
		<view class="result-box" v-if="isType === 'test'">
			<view class="result">{{correct}}%</view>
			<view class="name">{{resultName}}</view>
		</view>
		<view class="result-box" v-else-if="isType === 'simulation'">
			<view class="result-title">{{testName}}</view>
			<view class="result-text">
				<view class="text-item">
					<icon class="iconfont my-icon-time" />
					<text>考试时间：{{userTime}}</text>
				</view>
				<view class="text-item">
					<icon class="iconfont my-icon-score" />
					<text>考试得分：{{score}}</text>
				</view>
			</view>
		</view>
		<testResult
			:result="result"
		/>
		<view class="btns">
			<button class="btn try-again" @tap="tryAgain" v-if="isType === 'test'">再测一次</button>
			<button class="btn confirm" @tap="confirm">确认</button>
		</view>
	</view>
</template>

<script>
	import testResult from '@/components/test-topic/testResult.vue'
	export default {
		components:{
			testResult
		},
		data() {
			return {
				SERVER:this.development,
				result:null,	//答题结果
				correct:0,		//正确率
				isType:'',		//类型 练习/考试
				testName:'',		//试卷名字
				score:0,			//考试分数
				userTime:''			//考试所用时间
			};
		},
		computed:{
			resultName(){
				console.log('computed',this.correct)
				if(this.correct < 60){
					return '学渣'
				}else if(this.correct >= 60 && this.correct < 80){
					return '学霸'
				}else{
					return '学神'
				}
			}
		},
		methods:{
			tryAgain(){
				// 清空做题记录
				this.$store.dispatch('myCource/changeRecord',null);
				uni.redirectTo({
					url:`./testDetail`
				})
			},
			confirm(){
				//发起请求 清空进度记录 更新完成个数和正确个数
				let url;
				// if(this.isType === 'test'){
				// 	url = 
				// }
				uni.switchTab({
					url:'/pages/tabBar/index'
				})
			},
			formatDuring(mss){
				let day = Math.floor((mss) / (86400000)); //天
				day = day > 0 ? day+'天' : '';
				let hours = Math.floor((mss % 86400000) / 3600000); //时
				hours = hours > 0 ? hours+'小时' : '';
				let minutes = Math.floor((mss % 3600000) / 60000); //分
				minutes = minutes > 0 ? minutes+'分' : '';
				let seconds = Math.floor((mss % 60000) / 1000); //秒
				seconds = seconds > 0 ? seconds+'秒' : '';
				return day+hours+minutes+seconds;
			}
		},
		onLoad:async function(option){
			this.isType = option.isType;
			this.testName = this.$store.state.myCource.simulationTest.title;
			// 有错
			this.userTime = this.formatDuring(option.userTime);
			console.log('用时',this.userTime);
			this.result = this.$store.state.myCource.sectionScore;
			if(this.isType === 'test'){
				// 答对的个数
				let correctCount = this.result.filter(item => {
					return item.icon === true;
				}).length;
				this.correct = Math.floor(correctCount / this.result.length * 100);
			}else if(this.isType === 'simulation'){
				this.result.forEach(item => {
					this.score += item.score;
				})
				let data = {
					testId:this.$store.state.myCource.simulationTest.id,
					score:this.score
				}
				const [err,res] = await this.request({
					url:`${this.SERVER}/api/testScore`,
					method:'post',
					data:data
				})
				if(res.data.code === 0){
					console.log('更新分数成功');
				}
			}
			console.log('正确率：',this.correct);
		}
	}
</script>

<style lang="scss">
.container{
	.result-box{
		height:260rpx;
		text-align: center;
		padding-top:50rpx;
		border-bottom:10rpx solid #F6F7F8;
		box-sizing: border-box;
		.result-text{
			display: flex;
			justify-content: space-around;
			margin-top:40rpx;
		}
		.result{
			@include widthCenter(160rpx,0);
			height:160rpx;
			@include boxCenter(160rpx);
			background:$color-primary;
			border-radius:$uni-border-radius-circle;
			@include font(48rpx,$uni-text-color-inverse);
			font-weight:bold;
		}
	}
	.btns{
		background-color: #fff;
		position: fixed;
		bottom:0;
		left:0;
		width:100%;
		height:96rpx;
		padding-top:18rpx;
		box-sizing: border-box;
		display:flex;
		justify-content: space-around;
		border-top:1px solid $uni-text-color-disable;
		.btn{
			width:260rpx;
			height:60rpx;
			@include boxCenter(60rpx);
			@include font(14px,#fff);
		}
		.confirm{
			background-color: $color-primary;
		}
		.try-again{
			background-color: #FF6600;
		}
	}
}
</style>
