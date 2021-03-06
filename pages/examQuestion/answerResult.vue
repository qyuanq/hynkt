<template>
	<view class="container">
		<view class="result-box">
			<view class="result">{{correct}}%</view>
			<view class="name">{{resultName}}</view>
		</view>
		<view :class="['queAndAns',index === 0 ? 'border-none' : ' ']" v-for="(item,index) in result" :key="item.title">
			<text class="test-title">第{{index + 1}}题&nbsp;&nbsp;{{item.title}}</text>
			<icon :class="['iconfont',item.icon ? 'my-icon-correct' : 'my-icon-error']"></icon>
		</view>
		<view class="btns">
			<button class="btn try-again" @tap="tryAgain">再测一次</button>
			<button class="btn confirm" @tap="confirm">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:null,	//答题结果
				correct:0,		//正确率
				sectionId:0		//章节id
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
				uni.redirectTo({
					url:`./testDetail?sectionId=${this.sectionId}`
				})
			},
			confirm(){
				uni.switchTab({
					url:'/pages/tabBar/index'
				})
			}
		},
		onLoad:function(option){
			this.sectionId = option.sectionId;
			this.result = this.$store.state.myCource.sectionScore;
			// 答对的个数
			let correctCount = this.result.filter(item => {
				return item.icon === true;
			}).length;
			this.correct = correctCount / this.result.length * 100;
			
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
	.queAndAns{
		height:100rpx;
		line-height: 100rpx;
		padding:0 30rpx;
		display: flex;
		justify-content: space-between;
		border-top:1px dashed $uni-text-color-disable;
		.test-title{
			width:580rpx;
			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.border-none{
		border-top:none;
	}
	.btns{
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
