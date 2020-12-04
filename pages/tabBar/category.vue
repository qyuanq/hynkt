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
					 v-for="item in hotCource" :hotCource="item" @tap="onCourse(item.label.indexOf('全程') != -1 ? 'meal' : 'single',item.id)">
					    </shopPane>
				    </view>
			  </van-tab>
			  <van-tab  v-for="item in category" :title="item.name">
					<cateItem v-for="spe in item.speclallty_models" :title="spe.name" :specialty="spe.classgory_models"></cateItem>
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
				active:0,
				category:[],
				hotCource:[]
			}
		},
		created(){
			this.request({
				url:this.development + '/api/categorys',
				// url:'http://localhost:7001/spe',
				method:'get',
				success:(res) => {
					// 设置分类导航
					this.category = res.data.data.rows
					this.request({
						url:this.development + '/hotcources',
						method:'get',
						success: (res) => {
							this.hotCource = res.data.data
						}
					})
				}
			});
			
		},
		methods:{
			onChange(event) {
			    uni.showToast({
			      title: `切换到标签 ${event.detail.name}`,
			      icon: 'none',
			    });
			  },
			onCourse(type,pid){
				// console.log(pid);
				uni.navigateTo({url:`../product/product?type=${type}&id=${pid}`})
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
