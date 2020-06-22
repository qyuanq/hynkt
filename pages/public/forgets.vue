<template>
	<view class="container">
		<view class="tit">忘记密码</view>
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
			<view class="input-item">
				<input type="password" class="input-section" placeholder="请输入8-12位的大小写+数字组合密码" v-model="password">
			</view>	
			<view class="input-item">
				<input type="password" class="input-section" placeholder="请在输入一次密码" v-model="relPassword">
			</view>	
			<button class="btn" @tap="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import Mcaptcha from "../../utils/mcaptcha.js"
	export default {
		onReady:function(){
			this.mcaptcha=new Mcaptcha({
			el: 'canvas',
			width: 80,
			height: 35,
			createCodeImg: ""
			});
		
		},
		data() {
			return {
				currentTime:60,
				codename:"获取验证码",
				imgcode:'',
				phone:'',
				yzm:'',
				password:'',
				relPassword:'',
				disabled:false,
				timer:null,
				ischecked:false
			};
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
			validatePass(){
				if(this.password == '' || this.password == null){
					uni.showToast({ title: '密码不能为空',icon:'none' })
					return false;
				}
				if(! /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/.test(this.password)){
					uni.showToast({ title: '密码为8-12位大小写字母+数字',icon:'none' })
					return false;
				}
				return true;
			},
			validateRel(){
				if(this.relPassword !== this.password){
					uni.showToast({ title: '两次密码输入不一致',icon:'none' })
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
				const resRel = this.validateRel();
				const resPass = this.validatePass();
				const resYzm = this.validateYzm();
				const resPho = this.validatePhone();
				const resPic = this.validatePic();
				if(resPic && resPho && resYzm && resRel && resPass){
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
