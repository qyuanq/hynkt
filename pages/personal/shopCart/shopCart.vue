<template>
	<view class="container">
		<cartPane  
			title="幼儿教师资格证-课程精讲班"
			
		/>
	</view>
</template>

<script>
	import cartPane from '@/components/shop-pane/cart-pane.vue'
	export default {
		components:{
			cartPane
		},
		data() {
			return {
				SERVER:this.development
			};
		},
		onLoad:async function(){
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/myCart`,
				method:'get'
			})
			if(res.data.code === 0){
				console.log('我的购物车',res);
			}
		}
	}
</script>

<style lang="scss">

</style>
