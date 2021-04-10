<template>
	<view class="container_cart">
		<movable-area>
			<!-- damping="100" friction="100"  控制滑动效果速度 -->
			<movable-view 
				direction="horizontal" 
				:x="x" 
				:out-of-bounds="true"
				friction="100"
				damping="100"
				@touchstart="touchStart"
				@touchend="touchEnd"
			>
				<view class="cart">
					<view class="picture">
						<image :src="SERVER + cart.head_picture" mode="widthFix"></image>
					</view>
					<view class="content">
						<view class="title">{{cart.name}}</view>
						<slot name="label"></slot>
						<view class="option" v-if="option"></view>
						<view class="priceAndNumber">
							<view class="price">￥{{cart.price}}</view>
							<view @tap.stop="stop">
								<vanStepper v-if="count" integer :value="count" @change.native="changeNumber" />
							</view>
						</view>
					</view>
				</view>
			</movable-view>
		</movable-area>
		<view class="delete" @tap.stop="deteleCart"><text>删除</text></view>
	</view>
</template>

<script>
	import vanStepper from '@/static/vant-weapp/stepper/index'
	import {mapActions} from 'vuex'
	export default {
		components:{
			vanStepper
		},
		data(){
			return {
				SERVER:this.development,
				count:this.cart.count,	//数量
				checked:false,
				x:0,	//x轴偏移
				start_x:0,	//触摸开始横坐标
				start_y:0	//触摸开始纵坐标
			}
		},
		props:{
			cart:{
				type:Object
			}
		},
		methods:{
			//改变计数
			changeNumber(event){
				this.count = event.detail;
				// this.changeCount({cartId:this.cartInfo.id,count:this.cartInfo.count})
				this.$store.dispatch('Cart/changeCount',{cartId:this.cart.id,count:this.count})
				console.log(event.detail);
			},
			isChecked(event){
				this.checked = event.detail;
			},
			touchStart(event){
				const {clientX,clientY} = event.touches[0];// 触摸开始时的横纵坐标
				this.start_x = clientX; 
				this.start_y = clientY;
			},
			touchEnd(event){
				const {clientX,clientY} = event.changedTouches[0];  // 触摸结束时的横纵坐标
				  const direction = clientX - this.start_x; 		// 判断滑动的方向
				  if(Math.abs(clientY - this.start_y) > 50) return; // 处理上下滑动误触左右滑动的情况
				  //这里使用1来判断方向，保证用户在非滑动时不触发滚动（有时点击也会产生些许x轴坐标的变化）
				  if(direction < -1){	//左滑
					  this.x = -120;
				  }else if(direction > 1){	//右滑
					  this.x = 0
				  }
			},
			// 删除购物车
			deteleCart(){
				uni.showModal({
					content:'确定要删除该商品吗？',
					success:(res) => {
						if(res.confirm){
							this.$store.dispatch('Cart/deleteCart',this.cart.id)
						}
					}
				})
			}
			// ...mapActions['Cart',['changeCount']]
		}
	}
</script>

<style lang="scss">
.container_cart{
	width:700rpx;
	height:200rpx;
	background:#fff;
	border-radius:20px;
	position:relative;
	display: flex;
	movable-area{
		width:600rpx;
		movable-view{
			width:700rpx;
			height:200rpx;
			z-index:5;
			overflow: hidden;
			background:#fff;
		}
	}
	.cart{
		width:600rpx;
		margin:0 auto;
		height:200rpx;
		display: flex;
		flex-direction: row;
		.picture{
			width:200rpx;
			image{width:100%;}
		}
		.content{
			margin-left:20rpx;
			width:400rpx;
			height:80rpx;
			.title{
				font-size:28rpx;
				// white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.priceAndNumber{
			margin-top:20rpx;
			display: flex;
			justify-content: space-between;
			.price{
				color:#ED6A0C;
				line-height:30px;
			}
		}
	}
	.delete{
		position: absolute;
		top:0;
		right:0;
		z-index:1;
		width:140rpx;
		height:200rpx;
		padding-right:20rpx;
		box-sizing: border-box;
		line-height:200rpx;
		text-align: right;
		background:red;
		color:#fff;
	}
}
</style>
