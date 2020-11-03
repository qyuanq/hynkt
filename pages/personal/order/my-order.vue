<template>
	<view class="container">
		<view class="unpaid">
			<view class="untxt">未支付</view>
			<orderPane :code="model.code" :img_path="model.img_path" :title="model.title" :timer="model.timer" :price="model.price" :paid="false"></orderPane>
		</view>
		<view class="paid">
			<view class="paid-text">已支付</view>
			<orderPane :code="model.code" :img_path="model.img_path" :title="model.title" :timer="model.timer" :price="model.price" :paid="true"></orderPane>
		</view>
		
	</view>
</template>

<script>
import orderPane from '../../../components/shop-pane/order-pane'
	export default{
		components:{orderPane},
		data(){
			return {
				model:{
					code:'H2005052020512771785368',
					img_path:this.server +'/static/category/pic1.jpg',
					title:'[精讲班]健康管理师专业技能（三级）精讲班',
					timer:'2020-05-05 20:20:51',
					price:499
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.unpaid{
			.untxt{width:100%;height:30px;line-height:30px;background:#f1f1f1;padding-left:16px;}
		}
		.paid{
			.paid-text{width:100%;height:30px;line-height:30px;background:#f1f1f1;padding-left:16px;}
		}
	}
</style>
