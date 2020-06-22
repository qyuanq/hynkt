<template>
	<view class="container">
		<view class="tit">注册账号</view>
		<form class="form1">
			<view class="input-item item-pic">
				<input type="text" class="input-section" placeholder="请输入图形验证码"  v-model="imgcode" >
				<view class="pic-yzm" @tap="onTap">
					<canvas style="width:160upx;height:70upx;position:absolute;right:0upx;bottom:0upx;text-align: center;z-index:9999;" canvas-id="canvas"></canvas>
				</view>
			</view>
			<view class="input-item">
				<input type="tel" class="input-section" placeholder="请输入手机号码"  v-model="phone" >
			</view>
			<view class="input-item item-yzm">
				<input type="text" class="input-section" placeholder="请输入手机验证码" v-model="yzm">
				<button class="tel-yzm" @tap="getCode" :disabled="disabled">{{codename}}</button>
			</view>		
			<checkbox-group class="agree">
				<checkbox class="check" :checked="ischecked" @tap="this.ischecked = !this.ischecked" />我已阅读<text>《用户使用协议》、</text><text>《隐私条款》</text>
			</checkbox-group>
			<button class="btn" @tap="submit">注册</button>
		</form> 
		<view class="forget-section">
			已有账号，
			<navigator  url="./login?title=navigate">马上登录</navigator>
		</view>
	</view>
</template>

<script>
	import picCode from '../../components/form/pic-code.vue'
	import Mcaptcha from "../../utils/mcaptcha.js"
	export default {
		components:{picCode},
		data() {
			return {
				currentTime:60,
				codename:"获取验证码",
				imgcode:'',
				phone:'',
				yzm:'',
				disabled:false,
				timer:null,
				ischecked:false
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
			validatePhone(){
				let reg = /^1([3-9][0-9])\d{8}$/
				let result = reg.test(this.phone)
				if(this.phone == '' ||this.phone == null){
					uni.showToast({ title: '手机号不能为空',icon:'none' })
					return false;
				}
				if(!result){
					uni.showToast({ title: '手机号错误',icon:'none' })
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
			validateCheck(){
				if(this.ischecked === false){
					uni.showToast({ title: '请勾选协议',icon:'none' })
					return false;
				}
				return true;
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
			},
			submit(){
				var resCheck = this.validateCheck();
				var resYzm = this.validateYzm();
				var resPho = this.validatePhone();
				var resPic = this.validatePic();
				if(resPic && resPho && resYzm && resCheck){
					uni.navigateTo({
						url:'./login'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
.container{
	width:85%;
	margin:0 auto;
	margin-top:25upx;
	.tit{
		font-size:16px;
		font-weight:700;
		margin-bottom:25px;
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
		.agree{
			font-size:14px;
			text{color:#FF6600;}
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
	.forget-section{
		display:flex;
		justify-content: center;
		height:40px;
		line-height:40px;
		navigator{color:rgb(35, 153, 224);}
	}
}
</style>
