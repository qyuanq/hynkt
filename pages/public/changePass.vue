<template>
	<view class="container">
		<view class="tit">修改密码</view>
		<form class="form1">
			<view class="input-item">
				<input type="tel" class="input-section" placeholder="请输入原密码"  v-model="oldPass" >
			</view>
			<view class="input-item">
				<input type="tel" class="input-section" placeholder="请输入新密码"  v-model="newPass" >
			</view>
			<view class="input-item">
				<input type="tel" class="input-section" placeholder="请再次输入新密码"  v-model="relPass" >
			</view>
			<view class="input-item item-pic">
				<input type="text" class="input-section" placeholder="请输入图形验证码"  v-model="imgcode" >
				<view class="pic-yzm" @tap="onTap">
					<canvas style="width:160upx;height:70upx;position:absolute;right:8upx;bottom:15upx;text-align: center;z-index:9999;" canvas-id="canvas"></canvas>
				</view>
			</view>
			<view class="input-item">
				<input type="tel" class="input-section" placeholder="请输入手机号码"  v-model="phone" >
			</view>
			<view class="input-item item-yzm">
				<input type="text" class="input-section" placeholder="请输入手机验证码" v-model="yzm">
				<button class="tel-yzm" @tap="getCode" :disabled="disabled">{{codename}}</button>
			</view>		
			<button class="btn" @tap="submit">确认修改</button>
		</form> 
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
				oldPass:'',
				newPass:'',
				relPass:'',
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
			// 手机验证码
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
			// 表单验证
			validateOldPass(){
				if(this.oldPass == '' || this.oldPass == null){
					uni.showToast({ title: '原密码不能为空',icon:'none' })
					return false;
				}
				return true;
			},
			validateNewPass(){
				if(this.newPass == '' || this.newPass == null){
					uni.showToast({ title: '新密码不能为空',icon:'none' })
					return false;
				}
				return true;
			},
			validateRelPass(){
				if(this.relPass == '' || this.relPass == null){
					uni.showToast({ title: '新密码不能为空',icon:'none' })
					return false;
				}
				if(this.relPass != this.newPass){
					uni.showToast({ title: '两次密码输入不一致',icon:'none' })
					return false;
				}
				return true;
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
				return true;
			},
			submit(){
				if(this.validateOldPass() && this.validateNewPass() && this.validateRelPass() && this.validatePic() && this.validatePhone() && this.validateYzm()){
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
