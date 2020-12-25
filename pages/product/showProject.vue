<template>
	<view class="container">
		<view class="course">
			<view class="video" @tap="onProduct('single',classSingle[0].id)">
				<image v-if="imgShow" :src="development + classSingle[0].head_picture"></image>
				<image v-if="btnShow" :src="SERVER + '/static/img/category/video_play.png'" class="btn-play"></image>
				<!-- <video v-if="videoShow" src="https://jdvodluwytr3t.vod.126.net/jdvodluwytr3t/nos/mp4/2019/04/21/1214598912_f3f239fb46b448e4909da386a7a0439f_sd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de80cf71d5a4f376edb80607903f1ca760220eebf43112a9492238f198ed1882f2922117d840132767793f969aceceae3793fd3e61bc84b767a68b30f9427eeb2e54426afeac364f76a817da3b2623cd41e" :enable-auto-rotation="true" :autoplay="true" controls></video> -->
			</view>
		</view>
		<view class="pro-box">
			<view class="title">专业咨询</view>
			<view class="nav">
				<view class="nav-btn" v-for="item in icons" @tap="onConsulting(item.param,item.text)">
					<van-icon class="iconfont" class-prefix="my-icon" :name="item.name" />
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<view class="pro-box couse-class">
			<view class="title">单科班</view>
			<view class="class-pane">
				<classPane v-for="item in classSingle" :single="item" @tap="onProduct('single',item.id)"></classPane>
			</view>
		</view>
		<view class="pro-box couse-class">
			<view class="title">套餐班</view>
			<view class="class-pane">
				<classPane v-for="item in classMeal" :single="item" @tap="onProduct('meal',item.id)"></classPane>
			</view>
		</view>
		<view class="content-img">
			<image :src="SERVER + '/static/img/category/content_img.png'"></image>
		</view>
	</view>
</template>

<script>
	import classPane from "@/components/shop-pane/class-pane"
	export default {
		components:{classPane},
		data() {
			return {
				imgShow:true,
				btnShow:true,
				videoShow:false,
				SERVER:this.server,
				development:this.development,
				classSingle:[],
				classMeal:[],
				classInfo:{},
				icons:[],
			};
		},
		created(){
			
			
		},
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			await this.request({
				url:`${this.development}/api/classes/${option.id}`,
				method:'get',
				success:(res) =>{
					console.log(res.data.data);
					this.classInfo = res.data.data;
					//设置本页标题
					uni.setNavigationBarTitle({
					　　title:this.classInfo.name
					})
					this.classSingle = res.data.data.single;
					this.classMeal = res.data.data.meal;
					this.icons =[ 
						{"name":"baoming","text":"报考条件",param:this.classInfo.conditions},
						{"name":"baoming","text":"考试报名",param:this.classInfo.registratio},
						{"name":"kaoshizhinan","text":"考试指南",param:this.classInfo.examguide},
						{"name":"changjianwenti","text":"常见问题",param:this.classInfo.question}];
				}
			})
		},
		methods:{
			onProduct(type,pid){
				uni.navigateTo({
					// 向课程页传递两个参数：type:班型类型（单科班，全科班）,id:某一课程的id
					url:`./product?type=${type}&id=${pid}`
				})
			},
			onConsulting(content,title){
				console.log('content:',content);
				uni.navigateTo({
					// 传递对象，将对象转换成字符串，进行encodeURIComponent编码浏览器识别
					url:`../category/consulting?content=${encodeURIComponent(JSON.stringify(content))}&title=${title}`
				})
			}
		}
	}
</script>

<style lang="scss">
.container{
	.course{
		width:100%;
		height:170px;
		.video{
			position:relative;
			.btn-play{
				position:absolute;
				width:138px;
				height:32px;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
			}
			image{width:100%;height:170px;}
		}
	}
	.pro-box{
		text-align:center;
		padding:20rpx 0;
		.title{
			display:inline-block;
			font-size:16px;
			height:35px;
			&::before{
				content:" ";
				display:inline-block;
				width:38px;
				height:14px;
				margin-right:5px;
				background:url('/static/img/label_left.png') no-repeat;
				background-size:100%;
			}
			&::after{
				content: " ";
				display:inline-block;
				width:38px;
				height:14px;
				margin-left:5px;
				background:url('/static/img/label_right.png') no-repeat;
				background-size:100%;
			}
		}
		.nav{
			width:100%;display:flex;justify-content: space-around;
			.nav-btn{
				width:70px;height:70px;border-radius:5px;box-shadow: gainsboro 0px 0px 5px;text-align:center;font-size:12px;padding-top:5px;box-sizing: border-box;
				.iconfont{font-size: 36px;} 
			}
		}
	}
	.couse-class{
		.class-pane{
			display:flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding:0 30rpx;
		}
	}
	.content-img{
		width:100%;
		image{width:100%;height:654rpx;}
	}
}
</style>
