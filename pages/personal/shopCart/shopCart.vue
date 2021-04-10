<template>
	<view class="container">
		<van-nav-bar
		  :title="'共' + checkCount + '件商品'"
		  right-text="删除"
		  @click-right="onClickRight"
		/>
		
		<view class="goods" v-for="cart in cart" :key="cart.id">
			<van-checkbox :value="cart.checked" @change.native="checkCartOne(cart.id)"/>
			<cartPane
				:cart = "cart"
				@tap = "onProduct(cart.productType,cart.productid)"
			/>	
		</view>
		
		<van-submit-bar
		  :price="totalPrice"
		  button-text="结算"
		  @submit="onSettlement"
		  :tip="true"
		>
		  <view>
			  <van-checkbox  :value="isSelectAll" @change="onSelectAll">全选</van-checkbox>
		  </view>
		  <!-- <van-tag type="primary">标签</van-tag> -->
		  <!-- <view slot="tip">您的收货地址不支持同城送, <text>修改地址</text></view> -->
		</van-submit-bar>
	</view>
</template>

<script>
	import cartPane from '@/components/shop-pane/cart-pane.vue'
	import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
	export default {
		components:{
			cartPane
		},
		data() {
			return {
				SERVER:this.development
			};
		},
		computed:{
			...mapState('Cart',['cart']),
			...mapGetters('Cart',['totalPrice','checkCount','isSelectAll','checkCart'])
		},
		methods:{
			// 管理删除
			onClickRight(){
				uni.showModal({
					content:'是否要删除已选中的商品',
					success:(res) => {
						if(res.confirm){
							const res = this.deleteAllCart();
							if(res){
								uni.showToast({
									title:'删除成功'
								})
							}else{
								uni.showToast({
									title:'删除失败',
									icon:'none'
								})
							}
						}
					}
				})
			},
			// 全选按钮
			onSelectAll(event){
				if(event.detail){	//当前全选框状态
					this.checkAll(true);
				}else{
					this.checkAll(false);
				}
			},
			//结算
			onSettlement(){
				// 跳转订单页
				if(this.checkCart.length > 0){
					uni.navigateTo({
						url:"../../order/detail?orderType=cart"
					})
				}else{
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
				}
			},
			//进入课程详情页
			onProduct(productType,courceId){
				uni.navigateTo({
					url:`../../product/product?type=${productType}&id=${courceId}`
				})
			},
			...mapActions('Cart',['getCart','checkAll','checkCartOne','deleteAllCart']),
		},
		onLoad:async function(){
			await this.getCart();
		}
	}
</script>

<style lang="scss">
.goods{
	display: flex;
	box-sizing: border-box;
	justify-content: space-around;
	.van-checkbox{
		margin-top:34rpx;
	}
}
</style>
