<template>
	<view class="container">
		<view class="course">
			<view class="video">
				<image v-if="imgShow" src="/static/category/course-bg.jpg"></image>
				<image v-if="btnShow" src="/static/category/button-play.png" class="btn-play"></image>
				<video v-if="videoShow" src="https://jdvodluwytr3t.vod.126.net/jdvodluwytr3t/nos/mp4/2019/04/21/1214598912_f3f239fb46b448e4909da386a7a0439f_sd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de80cf71d5a4f376edb80607903f1ca760220eebf43112a9492238f198ed1882f2922117d840132767793f969aceceae3793fd3e61bc84b767a68b30f9427eeb2e54426afeac364f76a817da3b2623cd41e" :enable-auto-rotation="true" :autoplay="true" controls></video>
			</view>
			<view class="info">
				<view class="title">健康管理师专业技能（三级）精讲班</view>
				<view class="price"><text class="sign">￥</text><text class="discount">499</text><text class="original">￥799</text></view>
			</view>
		</view>
		<van-tabs :active="active">
		  <van-tab title="课程目录">
			  <van-collapse :value="activeNames" @change="onChange">
			    <van-collapse-item title="第一章" name="1">
				<view class="cell-group">
					<view class="sections">第一节 信息采集</view>
					<van-cell-group>
						<van-cell v-for="(item,index) in 5" :key="index" title="1.信息采集(一)"  link-type="navigateTo" @tap="changeVideo">
							<div slot="icon">
								<van-icon class="iconfont my-icon-xiazai"></van-icon>
							</div>
						</van-cell>
					</van-cell-group>
				</view>
			    </van-collapse-item>
			    <van-collapse-item title="第二章" name="2">
			      <view class="cell-group">
			      	<view class="sections">第一节 信息采集</view>
			      	<van-cell-group>
			      		<van-cell v-for="(item,index) in 5" :key="index" title="1.信息采集(一)"  @tab="changeVideo">
			      			<div slot="icon">
			      				<van-icon class="iconfont my-icon-xiazai"></van-icon>
			      			</div>
			      		</van-cell>
			      	</van-cell-group>
			      </view>
			    </van-collapse-item>
			    <van-collapse-item title="第三章" name="3" >
			      线上拓客，随时预约，贴心顺手的开单收银
			    </van-collapse-item>
			  </van-collapse>
		  </van-tab>
		  <van-tab title="课程介绍">
			  <view class="introduce">
				  <view class="product-js">
					  <view class="title">
						  营养师-高级（单科全程班）
					  </view>
					  <view class="detail">
						  <text class="validity">有效期:<text class="color">2021-07-10</text></text>
						  <text class="courseNum">包含课程：<text class="color">2门</text></text>
						  <text class="area">所属地区：<text class="color">全国</text></text>
					  </view>
					  <van-divider dashed />
					  
					  <view class="title">
						  考试时间
					  </view>
					  <text class="test-time">暂无考试时间信息</text>
					  <van-divider dashed />
					  
					  <view class="count">
						  <view class="box" v-for="item in 9">
							  <view class="text">总题目数</view>
							  <view class="result"><text class="num">1322</text>题</view>
						  </view>
					  </view>
					   <van-divider dashed />
					   <view class="desc">
						   健康管理师是从事个体和群体从营养和心理两方面健康的检测、分析、评估以及健康咨询、指导和危险因素干预等工作的专业人员。为了适应全面建设小康社会的需要，提高全民族的健康意识和身体素质，培养和造就健康管理人才，人力资源和社会保障部教育培训中心推出健康管理师岗位能力培训课程。
					   </view>
				  </view>
				  <image src="/static/category/introduce.jpg" class="learn-img"></image>
				  <view class="teacher">
					  <view class="img">
						  <image src="/static/category/teacher.png" class="header"></image>
					  </view>
					  <view class="present">
						  <view class="course">健康管理师-专业技能（三级）(课程精讲班)</view>
						  <view class="tea-name">教师：<text>陈禹斌</text></view>
					  </view>
				  </view>
			  </view>
		  </van-tab>
		  <van-tab title="课程评价">
		  			  
		  </van-tab>
		</van-tabs>
		<van-goods-action>
		  <van-goods-action-icon icon="chat-o" text="客服" />
		  <van-goods-action-icon icon="cart-o" text="收藏" info="5" />
		  <van-goods-action-button color="#be99ff" text="加入购物车" type="warning" />
		  <van-goods-action-button color="#7232dd" text="立即购买" />
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
				videoShow:false
			};
		},
		methods:{
			onChange(event){
				this.activeNames = event.detail;
			},
			changeVideo(){
				this.imgShow = false;
				this.btnShow = false;
				this.videoShow = true;
			}
		}
	}
</script>

<style lang="scss">
.container{
	width:100%;
	.video{
		width:100%;
		height:170px;
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
				.tea-name{color:#888;}
			}
		}
	}
}
</style>
