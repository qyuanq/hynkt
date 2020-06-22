<template>
	<view class="container">
		<view class="tit">忘记密码</view>
		<y-form :model="model" :rules="rules" class="form1" ref="form1">
			<formItem prop="picYzm">
				<y-input type="text" v-model="model.picYzm" placeholder="请输入图形验证码"></y-input>
				<view class="pic-yzm" @tap="onTap">
					<canvas style="width:160upx;height:70upx;position:absolute;right:0upx;bottom:0upx;text-align: center;z-index:9999;" canvas-id="canvas"></canvas>
				</view>
			</formItem>
			<formItem prop="phone">
				<y-input type="tel" v-model="model.phone" placeholder="请输入手机号"></y-input>
			</formItem>
			<formItem prop="telYzm">
				<y-input type="tel" v-model="model.telYzm" placeholder="请输入手机验证码"></y-input>
				<button class="tel-yzm" @tap="getCode" :disabled="disabled">{{codename}}</button>
			</formItem>
			<formItem prop="password">
				<y-input type="text" v-model="model.password" placeholder="请输入8-12位大小写+数字组合密码"></y-input>
			</formItem>
			<formItem prop="relPass">
				<y-input type="text" v-model="model.relPass" placeholder="请再输入一次密码"></y-input>
			</formItem>
			<formItem>
				<button class="btn" @tap="submit">提交</button>
			</formItem>
		</y-form>
	</view>
</template>

<script>
import yForm from '../../components/form/y-form.vue'
import formItem from '../../components/form/formItem.vue'
import yInput from '../../components/form/y-input.vue'
import Mcaptcha from "../../utils/mcaptcha.js"
	export default {
		components:{
			yForm,
			formItem,
			yInput
		},
		data() {
			var validatePhone = (rule,value,callback)=> {
				if(! /^1([3-9][0-9])\d{8}$/.test(value)){
					callback(new Error('请输入正确手机号'))
				}
			};
			return {
				currentTime:60,
				codename:"获取验证码",
				model:{
					username:'',
					password:'',
					relPass:'',
					phone:'',
					picYzm:'',
					telYzm:'',
					check:true
				},
				rules:{
					picYzm:[
						{required:true,message:"请输入图形验证码"}
					],
					username:[
						{required:true,message:"用户名必填"},
						// {pattern:/\w{8,12}/,message:"用户名8-12位，字母数字或下划线"}
						
					],
					password:[
						{required:true,message:"密码必填"},
						// {pattern:/\w{8,12}/,message:"请输入8-12位的大小写+数字组合密码"}
					],
					relPass:[
						{required:true,message:"密码必填"}
					],
					phone:[
						{required:true,message:"手机号必填"},
						// {min:3,max:10,message:'用户长度为3-10'},
						{validator:validatePhone}
						// {pattern:/^1[3-9][0-9]\d{8}$/,message:"请输入正确手机号"}
					],
					telYzm:[
						{required:true,message:"验证码必填"}
					]
				}
			}
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
			validateYzm(){
				//验证验证码
				let res = this.mcaptcha.validate(this.picYzm)
				if (this.picYzm == '' || this.picYzm == null) {
				uni.showToast({ title: '请输入图形验证码' })
				return false;
				}
				if (!res) {
				uni.showToast({ title: '图形验证码错误' })
				return false;
				}
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
				this.$refs["form1"].validate(valid => {valid ? uni.showToast({title:'登录'}) : uni.showToast({title : '失败'})})
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
	.btn{
		height:35px;
		line-height: 35px;
		background-color: #43A3FD;
		color:#fff;
		border-radius:20px;
		margin-top:25px;
	}
	.tel-yzm{height:35px;line-height:35px;position:absolute;top:0;right:0;z-index:9;border-radius:20px;color:#43A3FD;}
}
</style>
