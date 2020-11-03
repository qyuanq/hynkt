<template>
	<view class="container">
		<view class="search-class">
			<text class="text">我的课程</text>
			<van-search value="" placeholder="请输入搜索关键词" class="search" />
		</view>
		<view class="myClass">
			<shopPane v-for="item in myClass" :picture="item.picture" :title="item.title" :classes="item.classes" :classCode="item.classCode" :btnName="item.btnName"></shopPane>
		</view>
	</view>
</template>

<script>
	import shopPane from '../../components/shop-pane/shop-pane.vue'
	export default {
		components:{shopPane},
		data() {
			return {
				myClass:[
					{picture:"/static/category/pic1.jpg",
					title:"中学综合素质",
					classes:"课程精讲班",
					classCode:"课程代码：H007401",
					btnName:'开始学习'
					},
					{picture:"/static/category/pic1.jpg",
					title:"小学综合素质",
					classes:"课程精讲班",
					classCode:"课程代码：H007401",
					btnName:'开始学习'
					},
					{picture:"/static/category/pic1.jpg",
					title:"健康管理师基础知识",
					classes:"课程精讲班",
					classCode:"课程代码：H007401",
					btnName:'开始学习'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
page{
	background:#F6F7F8;
}
.container{
	.search-class{
		width:100%;
		height:54px;
		line-height:54px;
		background:#fff;
		padding-left:20rpx;
		.text{
			font-size:28rpx;
		}
		.search{
			width:420rpx;
			margin:0 auto;
			display:inline-block;
		}
	}
	.myClass{
		background:#fff;
	}
	.carb{
		padding-left:20rpx;
	}
	.carb .content .price .btn{
		background:#41A5FD;
	}
	.carb .content .price{
		margin-top:0;
	}
}
</style>
