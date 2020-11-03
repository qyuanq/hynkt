<template>
	<view class="container">
		<view class="title">修改绑定手机号</view>
		<view class="desc">请输入185****5118收到的短信验证消息</view>
		<form class="form1" ref="form1">
			<view class="input-item item-pic">
				<input type="text" class="input-section" placeholder="请输入图形验证码"  v-model="imgcode" >
				<view class="pic-yzm" @tap="onTap">
					<canvas style="width:160upx;height:70upx;position:absolute;right:0upx;bottom:0upx;text-align: center;z-index:9999;" canvas-id="canvas"></canvas>
				</view>
			</view>
			<view class="input-item item-yzm">
				<input type="text" class="input-section" placeholder="请输入手机验证码" name="phoneyzm" v-model="yzm">
				<button class="tel-yzm" @tap="getCode" :disabled="disabled">{{codename}}</button>
			</view>		
			<button class="btn" @tap="submit">下一步</button>
		</form> 
	</view>
</template>

<script>
	import picCode from '../../../components/form/pic-code.vue'
	import Mcaptcha from "../../../utils/mcaptcha.js"
	export default {
		components:{picCode},
		data() {
			return {
				currentTime:60,
				codename:"获取验证码",
				imgcode:'',
				yzm:'',
				disabled:false,
				timer:null,
			};
		},
		onReady:function(){
			this.mcaptcha=new Mcaptcha({
			el: 'canvas',
			width: 80,
			height: 35,
			createCodeImg: ""
			});
		
		},
		methods:{
			// 刷新验证码
			onTap(){
				this.mcaptcha.refresh();
			},
			validatePic(){
				//验证验证码
				let res = this.mcaptcha.validate(this.imgcode)
				if (this.imgcode == '' || this.imgcode==null) {
				uni.showToast({ title: '请输入图形验证码',icon:'none'})
				return false;
				}
				if (!res) {
				uni.showToast({ title: '图形验证码错误',icon:'none' })
				return false;
				}
				return true;
			},
			validateYzm(){
				if(this.yzm == '' || this.yzm == null){
					uni.showToast({ title: '验证码不能为空',icon:'none' })
					return false;
				}
				return true
			},
			getCode(){
				this.disabled = true;
				this.timer = setInterval(() => {
					if(this.currentTime <= 0){
						this.timer && clearInterval(this.timer)
						this.reset();
					}else{
						this.loadCode();	
					}
				},1000)
				
			},
			reset(){
				this.currentTime = 60;
				this.codename = "重新获取";
				this.disabled = false;
			},
			loadCode(){
				this.currentTime -=1;
				this.codename = "倒计时"+this.currentTime+'s';
			}
		}	
	}
</script>

<style lang="scss">
	.container{
		width:600rpx;
		margin:0 auto;
		.title{
			font-size: 40rpx;
			font-weight: 700;
		}
		.desc{
			color:#888888;
			font-size: 32rpx;
			margin-top:64rpx;
			margin-bottom:32rpx;
		}
		.form1{
			width:100%;
			.input-item{
				.input-section{
					height:35px;
					line-height: 35px;
					border:1px solid #ccc;
					padding: 0 15px;
					border-radius:20px;
					margin-bottom: 15px;
				}
				.tel-yzm{height:35px;line-height:35px;position:absolute;top:0;right:0;z-index:9;border-radius:20px;color:#43A3FD;}
			}
			.item-pic{
				position:relative;
			}
			.item-yzm{
				position:relative;
			}
			.btn{
				height:35px;
				line-height: 35px;
				background-color: #43A3FD;
				color:#fff;
				border-radius:20px;
				margin-top:25px;
			}
		}
	}

</style>
