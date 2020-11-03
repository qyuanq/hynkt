<template>
	<view class="container">
		<view class="header">
			<van-uploader :file-list="fileList" @after-read="afterRead">
			  <image :src="user.icon" class="head-img"></image>
			</van-uploader>
			<view class="head-text"><van-icon class="iconfont my-icon-xiangji"></van-icon><text>点击更换头像</text></view>
		</view>
		<view class="base-info">
			<van-cell-group>
				<van-cell title="基本资料" class="tit"/>
				<van-field
				  label="昵称"
				  v-model="user.username"
				  border="false"
				  input-align="right"
				/>
				<van-cell title="性别">
					<van-radio-group v-model="user.sex" @change="changeSex" class="demo-radio-group">
					  <van-radio name="0">男</van-radio>
					  <van-radio name="1">女</van-radio>
					</van-radio-group>
				</van-cell>
				<van-cell
				   v-model="user.phone"
				    title="修改手机号"
					is-link="true"
					@tap="updatePhone"
				/>
				<van-cell title="所在地" v-model="user.adress" is-link @tap="onCity" />
				<view class="overlay" v-if="show" @click="onCancel" catchtouchmove="false"></view>
				<van-picker 
					v-if="show" 
					title="城市选择" 
					show-toolbar 
					:columns="columns" 
					@change="changeCity" 
					@cancel="onCancel"
					@confirm="onConfirm"
				/>
			</van-cell-group>
		</view>
	</view>
</template>

<script>
	const info = [
		{
			'province':'11',
			'name':'安徽',
			'city':[
				{
					'code':'01',
					'name':'安庆',
					'county':[
						{
							'code':'01',
							'name':'河北区'
						}
					]
				}
			]
		},
		{
			'province':'12',
			'name':'山东',
			'city':[
				{
					'code':'01',
					'name':'济南',
					'county':[
						{
							'code':'01',
							'name':'河西区'
						}
					]
				}
			]
		}
	]
	export default{
		data(){
			return{
				province:[],
				show:false,
				fileList:[],
				user:{
					username:'yuan',
					sex:0,
					phone:'18526435118',
					adress:'',
					icon:''
				},
				columns: [
				      {
				        values: '',
				        className: 'column1',
				      },
				      {
				        values: '',
				        className: 'column2',
				        defaultIndex: 0,
				      },
					  {
						  values: '',
						  classname: 'column3',
						  defaultIndex: 0,
					  }
				]
			}
		},
		beforeCreate(){
			 this.columns[0].values = Object.values(this.info)
			
			this.columns[1].values = Object.values(this.info[0].city).
			
			this.columns[2].values = Object.values(this.info[0].city[0].county)
			})
			 this.$nextTick(function(){
				this.pageShow = true;
			})
		},
		created(){
			const token = uni.getStorageSync('token');
			uni.request({
				url:'http://localhost:7001/api/getuser',
				method:'get',
				header:{"Authorization":'Bearer ' + token},
				success:(res) => {
					this.user = res.data;
					this.user.icon = 'http://localhost:7001' + this.user.icon
					console.log(this.user.icon)
				}
			});
			// 初始化省市数据
			uni.request({
				url:'http://localhost:7001/getProvince',
				method:'get',
				success:(res) => {
					console.log(res.data)
					res.data
					   .forEach(
							item => {
								if(item) this.province.push(item.name)
							} 
						)
					console.log(this.province)
				}
			})
		},
		methods:{
			afterRead(event) {
			    const { file } = event.detail;
				console.log(file);
				
				// 获取token
				const token = uni.getStorageSync('token');
			    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			    uni.uploadFile({
			      url: 'http://localhost:7001/api/upload/single', 
			      filePath: file.path,
			      name: 'file',
				  header:{"Authorization":'Bearer ' + token},
			      success(res) {
			        // 上传完成需要更新 fileList
			        // const { fileList = [] } = this.data;
			        // fileList.push({ ...file, url: res.data });
			        // this.fileList = fileList
					console.log('上传成功');
			      },
			    });
			},
			changeSex(event) {
			    this.user.sex = event.detail;
			},
			updatePhone(){
				uni.navigateTo({
					url:'./setPhone'
				})
			},
			onCity(){
				this.show = true;
			},
			onCancel(){
				this.show = false;
			},
			changeCity(event){
				const { picker, value, index } = event.detail;
			    picker.setColumnValues(1, citys[value[0]].name);
				picker.setColumnValues(2, this.info[0].city);
			},
			onConfirm(event){
				const { picker, value, index } = event.detail;
				console.log(value);
				this.user.adress = value.join(' ');
				this.show = false;
			},
			preventTouchMove(){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F8;
		.container{
			.header{
				width:100%;
				height:360rpx;
				background:#41A5FD;
				text-align: center;
				.head-img{
					width:183rpx;
					height:183rpx;
					margin: 0 auto;
					border-radius:50%;
					margin-top:50rpx;
				}
				.head-text{
					margin-top:20rpx;
					color:#fff;
					font-size:28rpx;
					.iconfont{
						width:32rpx;
						height:32rpx;
						margin-right:10rpx;
					}
				}
			}
			.base-info{
				margin-top:20rpx;
				.tit{
					.van-cell__title{
						font-size:34rpx;
					}
				}
				.van-radio{
					display:inline-block;
					vertical-align: middle;
					&:nth-child(n+1){
						margin-left:30rpx;
					}
					.van-radio__icon-wrap{
						display:inline-block;
					}
					.van-radio__label{
						display:inline-block;
					}
				}
				.overlay{
					position:fixed;
					top:0;
					left:0;
					width:100%;
					height:100%;
					background-color:rgba(0,0,0,.7);
					z-index:99;
				}
				.van-picker{
					position:fixed;
					bottom:0;
					width:100%;
					height:560rpx;
					margin-top:30rpx;
					z-index:100;
				}
			}
		}
	}
	
</style>
