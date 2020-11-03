<template>
	<view class="container">
		<!-- <view class="back-btn"></view> -->
		<image class="bg" src="/static/loginbg.png"></image>
		<view class="wrapper">
			<view class="input-content">
				<view class="input-item">
					<input type="text" class="input-section" placeholder="用户名/学号/手机/邮箱" v-model="phone">
				</view>
				<view class="input-item">
					<input type="password" class="input-section" placeholder="请输入密码" v-model="password">
				</view>
			</view>
			<button class="btn-login" @tap="onLogin">登录</button>
			<button class="btn-try">我要试用</button>
			<view class="forget-section">
				<navigator url="./reg?title=navigate">立即注册</navigator>
				<navigator url="./forgets?title=navigate">忘记密码</navigator>
				<navigator url="./apk?title=navigate">下载APP</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				password:''
			};
		},
		methods:{
			onLogin(){
				let data = {
					phone:this.phone,
					password:this.password
				}
				uni.request({
					url:'http://localhost:7001/login',
					method:'post',
					data:data,
					success: (res) => {
						console.log(res.data)
						uni.setStorage({
							 key: 'token',
							 data: res.data.data.token
						})
						uni.switchTab({
							url:'/pages/tabBar/index'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{background:#fff;}
%form-cour{
	height:35px;
	line-height:35px;
	border-radius:20px;
	text-align: center;
	margin-bottom:20px;
}
.container{
	width:100vw;
	height:100vh;
	overflow:hidden;
	background:#fff;
	.bg{
		width:100%;
		// position:absolute;
		// left:0;
		// top:0;
	}
	.wrapper{
		width:75%;
		margin:25px auto 0;
		// position:relative;
		.input-section{
			@extend %form-cour;
			border:1upx solid #ccc;
		}
		.btn-login{
			@extend %form-cour;
			color:#fff;
			font-size:14px;
			background:linear-gradient( right,#3ec2ff,#258aff);
		}
		.btn-try{
			@extend %form-cour;
			color:#fff;
			font-size: 14px;
			background:linear-gradient( right,#ff800f,#ff9127);
		}
		.forget-section{
			// width:200px;
			// margin:0 auto;
			display:flex;
			justify-content: center;
			font-size:14px;
			navigator:nth-child(n+2){margin-left: 10px;}
		}
	}
}

</style>
