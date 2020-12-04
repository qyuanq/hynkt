<template>
	<view class="container">
		<view class="course">
			<view class="video" @tap="changeVideo(goodVideos[0].value[0].path)">
				<image v-if="imgShow" :src="development + cource.head_picture"></image>
				<image v-if="btnShow" :src="SERVER + '/static/img/category/button-play.png'" class="btn-play"></image>
				<video v-if="videoShow" :src="videoPath" :enable-auto-rotation="true" :autoplay="true" controls></video>
			</view>
			<!-- <view class="info">
				<view class="title">{{cource.name}}</view>
				<view class="price"><text class="sign">￥</text><text class="discount">{{cource.disc_price}}</text><text class="original">￥{{cource.retail_price}}</text></view>
			</view> -->
		</view>
		<van-tabs :active="active">
		  <van-tab title="课程目录">
			  <view class="audition">
				  <van-icon class="iconfont my-icon-bofang"></van-icon>
				  <text class="class-name">当前试听：{{cource.name}}</text>
				  <button class="classBtn" @tap="changeClass">切换班型</button>
			  </view>
			  <!-- 所有课程 -->
			  <van-collapse :value="activeNames" @change="onChange">
			    <van-collapse-item v-for="(item,i) in goodVideos" :key="item.section" :title="item.section" :name="i+1">
				<view class="cell-group">
					<!-- <view class="sections">第一节 信息采集</view> -->
					<van-cell-group>
						<van-cell v-for="(video,index) in item.value" :key="video.id" :title="index+1+'.'+video.name"  link-type="navigateTo" @tap="changeVideo(video.path,index,i)">
							<div slot="icon">
								<van-icon :class="['iconfont',(i || (!i && index >= count))? 'my-icon-suo' : 'my-icon-bofang' ]"></van-icon>
							</div>
						</van-cell>
					</van-cell-group>
				</view>
			    </van-collapse-item>
			  </van-collapse>
			  <!-- 试听课程 -->
			  <van-action-sheet :show="changeClassShow" title="选择试听该商品所有课程" close-on-click-overlay="false" @close="onClose">
			    <view class="content">
					<view class="info">
						<view class="tit">选择课程班型</view>
						<view>
							<text :class="['label-item',activelabel===index ? 'active' : 'default']" 
							v-for="(item,index) in labels || 1 " 
							:key="item"
							@tap="onActiveLabel(index)"
							>{{item || cource.label}}</text>
						</view>
						<view class="tit">选择试听课程</view>
						<view :class="['class-item',classId === (item.id || cource.id) ? 'active' : 'default']" 
						v-for="(item,index) in listenClass || 1" 
						:key="item.id"
						@tap="onActiveClass(index)"
						>{{item.name || cource.name}}</view>
					</view>
					<button class="audition-btn" @tap="listen(classId,activelabel)">试听该课程</button>
				</view>
			  </van-action-sheet>
			  <!-- 解决底部被遮挡 -->
			  <view class="white"></view>
		  </van-tab>
		  <van-tab title="课程介绍">
			  <view class="introduce">
				  <view class="product-js">
					  <view class="title">
						  {{cource.name}}
					  </view>
					  <view class="detail">
						  <!-- <text class="validity">有效期:<text class="color">2021-07-10</text></text> -->
						  <text class="courseNum">包含课程：<text class="color">{{cource.class_single_models ? cource.class_single_models.length+'门' : '1门'}}</text></text>
						  <text class="area">所属地区：<text class="color">全国</text></text>
					  </view>
					  <van-divider dashed />
					  
					  <view class="title">
						  考试时间
					  </view>
					  <text class="test-time">{{cource.Exam_time || cource.class_single_models[0].Exam_time ? cource.Exam_time || cource.class_single_models[0].Exam_time : '暂无考试时间信息'}}</text>
					  <van-divider dashed />
					  
					  <!-- <view class="count">
						  <view class="box" v-for="item in 9">
							  <view class="text">总题目数</view>
							  <view class="result"><text class="num">1322</text>题</view>
						  </view>
					  </view> -->
					  <view class="allCource">
						  <view v-if="cource.class_single_models"  class="courceInfo" v-for="item in cource.class_single_models" :key="item.id">
							  <view class="cource-name">{{item.name}}</view>
							  <view class="cource-label">{{item.label}}</view>
						  </view>
						  <view v-if="!cource.class_single_models">
							  <view class="cource-name">{{cource.name}}</view>
							  <view class="cource-label">{{cource.label}}</view>
						  </view>
					  </view>
					   <van-divider dashed />
					   <view class="desc">
						   健康管理师是从事个体和群体从营养和心理两方面健康的检测、分析、评估以及健康咨询、指导和危险因素干预等工作的专业人员。为了适应全面建设小康社会的需要，提高全民族的健康意识和身体素质，培养和造就健康管理人才，人力资源和社会保障部教育培训中心推出健康管理师岗位能力培训课程。
					   </view>
				  </view>
				  <image :src="development + cource.detail_picture" class="learn-img"></image>
				  <view v-for="item in (cource.class_single_models || 1)" :key="item.id">
					  <view class="teacher" v-for="(tea,index) in (item.id ? item.teacher_models : cource.teacher_models)" :key="tea.id" :id="tea.id" @tap="onTeacher">
						  <view >
							  <view class="img">
							  	<image :src="development + tea.headIcon" class="header"></image>
							  </view>
							  <view class="present">
								  <view class="course">{{item ? item.name : cource.name}}</view>
								  <view class="tea-name">教师：<text>{{tea.name}}</text></view>
							  </view>
						  </view>
						  
					  </view>
				  </view>
			  </view>
		  </van-tab>
		  <van-tab title="课程评价">
		  			  
		  </van-tab>
		</van-tabs>
		<!-- 底部按钮 -->
		<van-goods-action>
		  <van-goods-action-icon icon="chat-o" text="客服" />
		  <van-goods-action-icon icon="cart-o" text="收藏" info="5" />
		  <van-goods-action-button color="#be99ff" text="加入购物车" type="warning" />
		  <van-goods-action-button color="#7232dd" text="立即购买" @tap="onBuy(cource)" />
		</van-goods-action>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				activeNames:['1'],
				imgShow:true,
				btnShow:true,
				videoShow:false,
				SERVER:this.server,
				development:this.development,
				goodVideos:[],
				count:null,
				cource:{},
				videoPath:'',
				changeClassShow:false,
				activelabel:0,
				labels:null,
				allListenClass:null,
				listenClass:null,
				classId:0
			};
		},
		methods:{
			// 切换章节效果
			onChange(event){
				this.activeNames = event.detail;
			},
			
			//切换视频
			changeVideo(path,i=null,index=null){
				// console.log(index,i,path)
				//
				if((!i && index < this.count) || (i === null && index === null)){
					this.imgShow = false;
					this.btnShow = false;
					this.videoShow = true;
					this.videoPath = path;
				}else{
					return;
				}
			},
			
			//将json数组按照对象的属性分组
			groupBy(arr){
				//pre 返回值  current当前元素  index当前元素索引
			  return arr.reduce((pre, current, index) => {
			    pre[current.label] = pre[current.label] || [];
			    pre[current.label].push({ name: current.name, id: current.id });
			    return pre;
			  }, {});
			},
			
			// 打开试听课程弹窗
			changeClass(){
				// 打开弹窗
				this.changeClassShow = true;
			},
			// 关闭试听课程弹窗
			onClose(){
				this.changeClassShow = false;
			},
			//试听课程
			async listen(id,index){
				console.log('listen:',id);
				console.log('index',index);
				await this.request({
					url:`${this.development}/goodVideos/${id}`,
					method:'get',
					success:(res) => {
						// 所有视频
						this.goodVideos = res.data.data.content;
						console.log('视频',this.goodVideos);
						//免费试听课程
						this.count = Math.ceil((res.data.data.count) * 0.1);
						//播放新视频
						this.changeVideo(this.goodVideos[0].value[0].path);
						// 关闭课程弹窗
						this.onClose();
					}
				})
			},
			// 循环元素，点击元素动态切换class
			onActiveLabel(index){
				// 用于动态切换选中class
				this.activelabel = index;
				// 点击切换班型，自动切换匹配的试听课程
				this.listenClass = this.allListenClass[this.labels[index]]
			},
			onActiveClass(index){
				// 用于动态切换选中class
				if(this.cource.class_single_models){
					// 套餐班试听课程id
					this.classId = this.listenClass[index].id;
				}else{
					// 单科班试听课程id
					this.classId = this.cource.id;
				}
				console.log(this.classId);
			},
			
			// 跳转教师界面
			onTeacher(event){
				//event.currentTarget.id  当前绑定组件的id    （组件使用 :id="")
				const teacherPid = event.currentTarget.id;
				uni.navigateTo({
					url:`./teacherDetai?teacherPid=${teacherPid}`
				})
			},
			
			// 立即购买
			onBuy(cource){
				let orderCource = {
					name:this.cource.name,
					head_picture:this.cource.head_picture,
					disc_price:this.cource.disc_price,
					type:this.cource.class_single_models ? '套餐班' : '单科班'
				}
				uni.navigateTo({
					url:`../order/detail?cource=${encodeURIComponent(JSON.stringify(orderCource))}`
				})
			}
		},
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log('type',option.type);
			console.log('id:',option.id); //打印出上个页面传递的参数。
			// 根据班型类型不同，请求不同课程信息API
			let url = option.type === 'single' ? `${this.development}/cource/${option.id}` : `${this.development}/mealClass/${option.id}`
			await this.request({
				url:url,
				method:'get', 
				success:async (res) => {
					this.cource = res.data.data;
					console.log(this.cource);
					
					// 试听课程如果是全科班课程
					if(this.cource.class_single_models){
						// 获得形如{'模拟实战班':[id:4,name:'幼儿教师资格证-模拟实战班']}所有课程
						this.allListenClass = this.groupBy(this.cource.class_single_models);
						console.log('数组分组后的json',this.allListenClass);
						// 全科班所有标签
						this.labels = Object.keys(this.allListenClass);
						// 默认显示第一个标签下的所有课程
						this.listenClass = this.allListenClass[this.labels[0]];
						// 默认选中第一个课程
						this.classId = this.listenClass[0].id;
					}else{
						// 单科班默认唯一课程id
						this.classId = this.cource.id;
					}
					
					// 根据班型不同请求不同课程视频API
					let video_url = option.type === 'single' ? `${this.development}/goodVideos/${option.id}` : `${this.development}/goodVideos/${this.cource.class_single_models[0].id}`;
					await this.request({
						url:video_url,
						method:'get',
						success:(res) =>{
							// 所有视频
							this.goodVideos = res.data.data.content;
							console.log('视频',this.goodVideos);
							//免费试听课程
							this.count = Math.ceil((res.data.data.count) * 0.1);
						}
					});
				}
			});
			
		}
	}
</script>

<style lang="scss">
.container{
	width:100%;
	.video{
		width:100%;
		height:225px;
		position:relative;
		image{
			width:100%;
			height:100%;
		}
		.btn-play{
			width:80px;
			height:80px;
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
		}
		video{width:100%;}
	}
	.info{
		padding:5px 12px;
		.title{
			font-size:15px;
		}
		.price{
			.sign{font-size:11px;color:#FD9801;}
			.discount{font-size:17px;color:#FD9801;}
			.original{font-size:10px;color:#969799;text-decoration:line-through;}
		}
	}
	.white{
		width:100%;
		height:60px;
	}
	.audition{
		width:100%;
		height:60rpx;
		padding:20rpx 30rpx;
		font-size:24rpx;
		box-sizing:border-box;
		.class-name{
			display:inline-block;
			width:500rpx;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
		}
		.classBtn{
			width:120rpx;
			height:40rpx;
			font-size:24rpx;
			text-align:center;
			line-height:40rpx;
			background:#7CC1FE;
			color:#fff;
			border-radius:20rpx;
			margin-right:15rpx;
			padding:0;
			float:right;
		}
		.my-icon-bofang{
			color:#7CC1FE;
		}
	}
	.van-action-sheet__header{
		text-align:left;
		padding-left:30rpx;
		font-size:30rpx;
	}
	.content{
		width:calc(100%-20rpx);
		overflow: hidden;
		.info{
			width:100%;
			height:500rpx;
			overflow-y: scroll;
			overflow-x:hidden;
		}
		.tit{
			margin-top:20rpx;
			font-size:24rpx;
		}
		.label-item{
			display:inline-block;
			width:150rpx;
			height:50rpx;
			margin:30rpx 20rpx 0 0; 
			text-align:center;
			font-size:22rpx;
			line-height:50rpx;
			border-radius:25rpx;
		}
		.active{
			background:#41A5FD;
			color:#fff;
		}
		.default{
			background:#F2F1F1;
		}
		.class-item{
			width:680rpx;
			height:50rpx;
			font-size:22rpx;
			line-height:50rpx;
			border-radius:8rpx;
			margin-top:10rpx;
			text-overflow:ellipsis;
			padding-left:20rpx;
		}
		.audition-btn{
			width:690rpx;
			height:80rpx;
			line-height:80rpx;
			font-size:32rpx;
			border-radius:40rpx;
			color:#fff;
			text-align:center;
			margin:0 auto;
			margin-bottom:20rpx;
			background:#41A5FD;
		}
	}
	.cell-group{
		background:#f0f0f0;
	}
	.introduce{
		padding:5px 12px;
		.title{
			font-size:15px;
			color:#333;
			font-weight:bold;
		}
		.detail{
			display:flex;
			justify-content: space-between;
			flex-wrap:wrap;
			font-size:13px;
			color:#888;
			.validity,.courseNum,.area{display:inline-block;width:50%;margin-top:5px;}
			.color{color:#FD9801;}
		}
		.learn-img{width:100%;height:2959rpx;}
		.test-time{color:#888;font-size:13px;}
		.count{
			display:flex;justify-content: space-between;flex-wrap:wrap;
			.box{
				width:23%;height:50px;border: 1px dashed #ccc;text-align: center;margin-top:5px;
				.text{height:25px;line-height:25px;font-size:12px;color:#888888;}
				.result{height:25px;line-height:25px;font-size:12px;color:#000;}
			}
		}
		.allCource{
			margin-top:10rpx;
			.cource-name{
				font-size:28rpx;
			}
			.cource-label{
				font-size:24rpx;
				color:rgb(136, 136, 136);
			}
		}
		.desc{font-size:12px;color:#787878;margin-bottom:10px;}
		.teacher{
			margin-bottom:50px;
			display:flex;
			// justify-content: space-between;
			.img{
				width:32px;height:48px;float:left;margin:0 10px;
				.header{width:100%;height:100%;}
			}
			.present{
				flex:1;
				font-size:14px;
				color:#333;
				white-space:nowrap;
				text-overflow:ellipsis;
				overflow: hidden;
				.cource{margin-top:10rpx;}
				.tea-name{color:#888;margin-top:10rpx;}
			}
		}
	}
}
</style>
