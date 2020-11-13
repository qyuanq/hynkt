<template>
	<view class="container">
		<view class="top">
			<image :src="SERVER + '/static/img/logo.png'"></image>
			<van-search  placeholder="请输入搜索关键词"></van-search>
		</view>
		<view class="banner">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" circular="true">
							<swiper-item>
								<view class="swiper-item">
									<image :src="SERVER + '/static/img/banner/cate-ban1.jpg'" mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image :src="SERVER + '/static/img/banner/cate-ban2.jpg'"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image :src="SERVER + '/static/img/banner/cate-ban3.jpg'"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image :src="SERVER + '/static/img/banner/cate-ban4.jpg'"  mode="scaleToFill"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view>
			<van-tabs :active="active" bind:change="onChange" class="tabs">
			  <van-tab title="热门推荐">
				    <view class="pane">
						<shopPane 
					 v-for="item in 8" :picture="picture" :title="title" :classes="classes" :original="original" :current="current" @tap="onCourse">
					    </shopPane>
				    </view>
			  </van-tab>
			  <van-tab  v-for="item in category" :title="item.name">
					<cateItem v-for="item in zk_specialty" :title="item.title" :specialty="item.specialty" @tap="onZikao"></cateItem>
			  </van-tab>
			  <!-- <van-tab title="成人高考">内容 3</van-tab>
			  <van-tab title="职业资格">内容 4</van-tab>
			  <van-tab title="研究生考试">内容 5</van-tab> -->
			</van-tabs>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import shopPane from "@/components/shop-pane/shop-pane.vue"
	import cateItem from "@/components/cate-item/cate-item.vue"
	export default{
		components:{uniSearchBar,uniSegmentedControl,shopPane,cateItem},
		data(){
			return {
				SERVER:this.server,
				active:1,
				picture:this.server +"/static/img/category/pic1.jpg",
				title:"健康管理师专业技能(三级)精讲班",
				classes:"课程精讲班",
				original:3499,
				current:5990,
				btnName:'课程试听',
				category:[],
				zk_specialty:[
					{title:"金融类",specialty:['金融管理专科','金融学本科','金融管理本科']},
					{title:"经管类",specialty:['现代企业管理本科','商务管理专科','商务管理本科']},
					{title:"财贸类",specialty:['市场营销本科','财务管理本科','国际商务本科','会计专科','农村财会与审计专科','财务会计与审计本科','会计学本科']},
					{title:"教育类",specialty:['学前教育本科','小学教育本科','教育管理本科','汉语言文学专科','学前教育专科','教育学本科']},
					{title:"语言类",specialty:['英语本科','商务英语本专科','商务英语本科','汉语言文学本科','英语专科']},
					{title:"文史类",specialty:['法学（本科段）']},
					{title:"艺术类",specialty:['广告学本科','产品设计本科','视觉传播设计与制作专科','环境艺术设计专科','动漫设计专科','数字媒体艺术本科','视觉传达设计本科','环境设计本科']},
					{title:"医学类",specialty:['护理学本科','护理专科']},
					{title:"理工类",specialty:['计算机科学与技术','工程管理本科','工程造价本科']},
					{title:"管理类",specialty:['公共关系学本科','行政管理专科','公共关系专科','电子商务本科','人力资源管理本科','行政管理本科']},
					{title:"食品类",specialty:['食品营养与卫生专科','食品卫生与营养学本科']},
					{title:"旅游类",specialty:['旅游管理专科']}
				]
			}
		},
		created(){
			this.request({
				// url:this.development + '/api/categorys',
				url:'http://localhost:7001/api/categorys',
				method:'get',
				success:(res) => {
					// console.log(res.data)
					this.category = res.data.data
					console.log(this.category)
				}
			})
		},
		methods:{
			onChange(event) {
			    uni.showToast({
			      title: `切换到标签 ${event.detail.name}`,
			      icon: 'none',
			    });
			  },
			onCourse(){
				uni.navigateTo({url:'../product/product'})
			},
			onZikao(){
				uni.navigateTo({url:'../product/showProject'})
			}
		}
	}
</script>

<style lang="scss">
	page{background-color: #F6F7F8;}
	.container{
		.top{
			display:flex;
			justify-content: space-between;
			width:100%;height:50px;background:#fff;
			image{width:120px;height:29px;}
			.search{width:550rpx;height:30px;border:1px solid #ccc;border-radius:20px;}
		}
		.banner{
			width:100%;height:340rpx;
			.uni-padding-wrap{
				height:100%;
				.swiper{
					height:100%;
					.page-section-spacing{
						height:100%;
						.swiper-item{
							height:100%;
							image{width:100%;height:100%;}
						}
					}
				}
				
			}
		}
		.tabs{
			width: 100%;background:#fff;margin-top:10px;
			.pane{width:100%;background:#fff;margin-top:10px;padding-top:12px;padding-left:10px;}
			}
	}
</style>
