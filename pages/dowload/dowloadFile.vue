<template>
	<view class="container">
		<van-cell title="小学综合素质 -考前冲刺串讲1直播 惠米诺" @click="dowload(1,'xlsx')">
		  <icon slot="icon" class="iconfont my-icon-excel" />
		  <icon slot="right-icon" class="iconfont my-icon-huancun" />
		</van-cell>
		<van-cell title="小学教师资格证真题讲解   直播" @click="dowload(2,'pdf')">
		  <icon slot="icon" class="iconfont my-icon-pdf" />
		  <icon slot="right-icon" class="iconfont my-icon-huancun" />
		</van-cell>
		<van-cell title="小学综合素质" @click="dowload(3,'docx')">
		  <icon slot="icon" class="iconfont my-icon-word" />
		  <icon slot="right-icon" class="iconfont my-icon-huancun" />
		</van-cell>
		
		<button @tap="onNotice">弹窗</button>
		<notice 
			ref="notice"
			title="现在开始考试，祝你好运" 
			content="答题时间：120分钟|共题"
			cancelText="取消"
			confirmText="开始"
			@cancel="cancel"
			@confirm="confirm"
		/>
	</view>
</template>

<script>
	import create from '@/utils/create.js'
	export default {
		data() {
			return {
				SERVER:this.development
			};
		},
		methods:{
			onNotice(){
				// const notice = create(Notice,{
				// 	title:'现在开始考试，祝你好运',
				// 	content:'答题时间：120分钟|共题',
				// 	cancelText:'取消',
				// 	confirmText:'开始'
				// });
				// notice.show();
				this.$refs['notice'].showL();
			},
			cancel(){
				console.log('取消了')
			},
			confirm(){
				console.log('确认了')
			},
			dowload(id,type){
				//storage是否存在路径信息，存在直接打开
				if(uni.getStorageSync('file')[type]){
					const savedFilePath = uni.getStorageSync('file')[type];
					uni.openDocument({
					  filePath: savedFilePath,
					  success: function (res) {
						console.log('打开文档成功')
					  }
					});
				}else{//未存在下载
					const token = uni.getStorageSync('token')
					uni.downloadFile({
						url:`${this.SERVER}/api/download/${id}`,
						header:{
							"Authorization":'Bearer ' + token
						},
						success:(res) => {
							if(res.statusCode === 200){
								console.log('文件下载',res);
							}
							const filePath = res.tempFilePath;
							//保存到本地
							uni.saveFile({
								tempFilePath:filePath,
								success:(res) => {
									const savedFilePath = res.savedFilePath;
									//保存到storage
									let file = {};
									if(uni.getStorageSync('file')){
										file = uni.getStorageSync('file');
									}
									file[type] = savedFilePath;
									uni.setStorageSync('file',file);
									console.log(savedFilePath);
									//打开本地文件
									uni.openDocument({
									  filePath: savedFilePath,
									  success: function (res) {
										console.log('打开文档成功')
									  }
									});
								}
							});
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
.iconfont{
	font-size:25px;
}
</style>
