<template>
	<view class="container">
		<form>
			<textarea :class="[state ? 'testBorder' : '','textarea']" v-model="text" @blur="blurBorder" @focus="focusBorder" placeholder="请输入您的疑问(1000字以内)..."></textarea>
			<view class="text">上传图片</view>
			<van-uploader  :file-list="fileList" max-count="3"  @after-read="afterRead" />
			<view class="btn"><button @tap="submit">提交</button></view>
		</form>
	</view>
</template>

<script>
	import {renderTime} from '../../static/js/common.js'
	export default {
		data() {
			return {
				SERVER:this.development,
				fileList:[],
				state:false,
				filePath:'',
				text:' ',
				coureId:null
			};
		},
		methods:{
			afterRead(event){
				this.filePath = event.detail.file.path;
				this.fileList.push({ url:this.filePath});
			},
			delete(event){
				console.log(event.detail.index);
			},
			blurBorder(){
				this.state = false;
			},
			focusBorder(){
				this.state = true;
			},
			submit(){
				// 格式化当前时间
				let date = renderTime(new Date());
				const token = uni.getStorageSync('token');
				let source;
				if(uni.getStorageSync('courceName') && uni.getStorageSync('vid_title')){
					source = '视频 > ' + uni.getStorageSync('courceName') + uni.getStorageSync('vid_title');
				}		
				let data = {
					'content':this.text,
					'date':date,
					'source':source,
					'ClassSingleModelId':this.coureId
				}
				console.log('文件上传',this.filePath);
				if(this.filePath){
					console.log('有文件');
					// 上传图片到服务器
					uni.uploadFile({
						url:`${this.SERVER}/api/answerQuestion`,
						filePath: this.filePath,
						name: 'file',
						formData:data,
						header:{
							"Authorization":'Bearer ' + token,
							'Content-Type': 'multipart/form-data;charset=utf-8'
						},
						success:(res) => {
							if(res.statusCode === 200){
								uni.showToast({
									title:"提交成功",
									icon:"none"
								});
								setTimeout(function(){
									uni.navigateBack({delta:1})
								},2000)
							}
						}
						
					});
				}else if(this.text && !this.filePath){
					this.request({
						url:`${this.SERVER}/api/answerQuestion`,
						method:'post',
						data:data,
						success:(res) => {
							if(res.statusCode === 200){
								uni.showToast({
									title:"提交成功",
									icon:"none"
								});
								setTimeout(function(){
									uni.navigateBack({delta:1})
								},2000)
							}
						}
					})
				}else{
					uni.showToast({
						title:'输入不能为空'
					})
				}
			}
		},
		onLoad:function(option){
			this.coureId = option.coureId;
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
