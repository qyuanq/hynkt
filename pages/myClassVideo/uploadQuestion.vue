<template>
	<view class="container">
		<form>
			<textarea :class="[state ? 'testBorder' : '','textarea']" @blur="blurBorder" @focus="focusBorder" placeholder="请输入您的疑问(1000字以内)..."></textarea>
			<view class="text">上传图片</view>
			<van-uploader  file-list="fileList" max-count="3" @after-read="afterRead" />
			<view class="btn"><button>提交</button></view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList:[{
					url:''
				}],
				state:false
			};
		},
		methods:{
			afterRead(event){
				const {file} = event.detail;
				uni.uploadFile({
					url:'https://example.weixin.qq.com/upload',
					filePath:file.path,
					name:'file',
					formData:{user:'test'},
					success(res){
						const {fileList = []} = this.data;
						fileList.push({...file,url:res.data});
						this.fileList = fileList;
					}
				})
			},
			blurBorder(){
				this.state = false;
			},
			focusBorder(){
				this.state = true;
			}
		}
	}
</script>

<style lang="scss">
.container{
	padding:0 20rpx;
	.textarea{
		width:710rpx;
		height:300rpx;
		margin:20rpx auto 0;
		background:#f6f7f8;
		padding:15rpx;
		border-radius:20rpx;
		box-sizing: border-box;
	}
	.testBorder{
		border:1px solid orange;
	}
	.text{
		margin: 20rpx 0;
	}
	.btn{
		position:fixed;
		bottom:20rpx;
		width:100%;
		button{
			width:50%;
			height:80rpx;
			line-height:80rpx;
			background:#41A5FD;
			color:#fff;
			margin:0 auto;
		}
	}
}
</style>
