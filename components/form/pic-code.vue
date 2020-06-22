<template>
	<view class="pic-yzm">
		<input type="text" class="inputs" placeholder="请输入图形验证码" @blur="validateYzm" v-model="imgcode" >
		<view class="pic-yzm" @tap="onTap">
			<canvas style="width:160upx;height:70upx;position:absolute;right:0upx;bottom:0upx;text-align: center;z-index:9999;" canvas-id="yzm"></canvas>
		</view>
	</view>
</template>

<script>
	import Mcaptcha from "../../utils/mcaptcha.js"
	export default {
		data() {
			return {
				imgcode:'',
			};
		},
		onReady:function(){
			this.mcaptcha=new Mcaptcha({
			sl:this,	
			el: 'yzm',
			width: 80,
			height: 35,
			createCodeImg: ""
			});
		
		},
		methods:{
			//刷新验证码
			onTap(){
				this.mcaptcha.refresh();
			},
			validateYzm(){
				//验证验证码
				let res = this.mcaptcha.validate(this.imgcode)
				if (this.imgcode == '' || this.imgcode==null) {
				uni.showToast({ title: '请输入图形验证码' })
				return false;
				}
				if (!res) {
				uni.showToast({ title: '图形验证码错误' })
				return false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.pic-yzm{
		position:relative;
		.inputs{
			height:35px;
			line-height: 35px;
			border:1px solid #ccc;
			padding: 0 15px;
			border-radius:20px;
			margin-bottom: 15px;
		}
		.tel-yzm{height:35px;line-height:35px;position:absolute;top:0;right:0;z-index:9;border-radius:20px;color:#43A3FD;}
	}
</style>
