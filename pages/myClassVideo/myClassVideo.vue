<template>
	<view class="container">
		<view class="course">
			<view class="video">
				<image v-if="imgShow" :src="SERVER + '/static/img/category/course-bg.jpg'"></image>
				<image v-if="btnShow" :src="SERVER +'/static/img/category/button-play.png'" class="btn-play" @tap="changeVideo"></image>
				<video v-if="videoShow" src="https://jdvodluwytr3t.vod.126.net/jdvodluwytr3t/nos/mp4/2019/04/21/1214598912_f3f239fb46b448e4909da386a7a0439f_sd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de80cf71d5a4f376edb80607903f1ca760220eebf43112a9492238f198ed1882f2922117d840132767793f969aceceae3793fd3e61bc84b767a68b30f9427eeb2e54426afeac364f76a817da3b2623cd41e" :enable-auto-rotation="true" :autoplay="true" controls></video>
			</view>
			<view class="info">
				<view class="title">模块一（2020）>第二讲 学生观 > 学生观(一)</view>
				<view class="nav">
					<view class="looked">已看</view>
					<view :class="[collect_state ? 'collect-check' : '','collect']" @tap="onCollect" >
						<icon class="iconfont my-icon-shoucang"></icon>
						收藏
					</view>
					<view class="cache" @tap="onCache">
						<icon class="iconfont my-icon-huancun"></icon>
						缓存
					</view>
					<view class="answer" @tap="onAnswer">
						<icon class="iconfont my-icon-dayi"></icon>
						答疑
					</view>
				</view>
			</view>
		</view>
		<view class="learn-box">
			<view class="catalog">目录</view>
			<view class="learn-list">
				<van-collapse :value="activeNames" @change="onChange" icon="">
				  <van-collapse-item title="模块一(2020)" name="1">
				    <view class="cell" v-for="item in 3" @tap="changeVideo">
						<icon class="iconfont my-icon-video"></icon>
						第一讲 教育观0/9
						<icon class="iconfont my-icon-xiazai"></icon>
					</view>
				  </van-collapse-item>
				  <van-collapse-item title="模块二(2020)" name="2">
				    <view class="cell" v-for="item in 3">
						<icon class="iconfont my-icon-video"></icon>
				    	第一讲 教育观0/9
				    </view>
				  </van-collapse-item>
				  <van-collapse-item title="模块三(2020)" name="3">
					<view class="cell" v-for="item in 3" @tap="changeVideo">
						<icon class="iconfont my-icon-video"></icon>
						第一讲 教育观0/9
						<icon class="iconfont my-icon-xiazai"></icon>
					</view>
				  </van-collapse-item>
				</van-collapse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow:true,
				btnShow:true,
				videoShow:false,
				activeNames:'',
				collect_state:false,
				SERVER:this.server
			};
		},
		methods:{
			onChange(event){
				this.activeNames = event.detail;
			},
			changeVideo(){
				this.imgShow = false;
				this.btnShow = false;
				this.videoShow = true;
			},
			onCollect(){
				// this.collect_state  为true 说明已收藏
				if(this.collect_state){
					this.collect_state = !this.collect_state;
					uni.showToast({
						title:'取消收藏成功',
						icon:'success',
						duration:2000
					})
				}else{
					this.collect_state = !this.collect_state;
					uni.showToast({
						title:'收藏成功',
						icon:'success',
						duration:2000
					})
				}
			},
			onCache(){
				uni.navigateTo({
					url:'./collect'
				})
			},
			onAnswer(){
				uni.navigateTo({
					url:'./videoQuestion'
				})
			}
		}
	}
</script>

<style lang="scss">
page{background:#c6c7c8;}
.container{
	padding-top:565rpx;
	.course{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		z-index:999;
		.video{
			width:100%;
			height:400rpx;
			position:relative;
			image{
				width:100%;
				height:100%;
			}
			.btn-play{
				width:80px;
				height:80px;
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}
			video{width:100%;}
		}
		.info{
			height:115rpx;
			background:#fff;
			padding:20rpx 30rpx 30rpx 30rpx;
			.title{
				height:60rpx;
				font-weight:600;
				line-height:1.6;
				font-size:24rpx;
			}
			.nav{
				display:flex;
				justify-content: space-around;
				font-size:22rpx;
				.iconfont{
					font-size:22rpx;
				}
				.looked{
					vertical-align: bottom;
				}
				.collect-check{
					color:rgb(255,102,0);
				}
			}
		}
	}
	.learn-box{
		.catalog{
			height:80rpx;
			line-height:80rpx;
			background:#fff;
			border-bottom:1px solid #ccc;
			padding-left:30rpx;
		}
		.learn-list{
			.cell{
				height:60rpx;
				line-height:60rpx;
				vertical-align: middle;
				font-size:24rpx;
				color:#333;
				margin-top:10rpx;
				.iconfont{margin-right:10rpx;font-size:24rpx;}
				.my-icon-video{color:#41a5fd;}
				.my-icon-xiazai{float:right;color:#41a5fd;font-size:28rpx;zindex:999;}
			}
		}
	}
}
</style>
