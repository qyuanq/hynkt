<template>
	<view class="container">
		<view class="box product-info" v-for="info in cource" :key="info.name">
			<shop-pane :hotCource="info" ></shop-pane>
			<view class="product-price">
				<text>商品金额</text>
				<text>￥{{info.price}}</text>
			</view>
		</view>
		<view class="box payment clearfix">
			<view class="title">选择支付方式</view>
			<van-radio-group :value="radio" @change="onChange">
			  <van-cell-group>
				<van-icon class="iconfont" class-prefix="my-icon" name="wxpay" />
			    <van-cell title="微信" clickable data-name="1" @click="onClick">
			      <van-radio slot="right-icon" name="1" />
			    </van-cell>
				<van-icon class="iconfont" class-prefix="my-icon" name="zfb" />
			    <van-cell title="支付宝" clickable data-name="2" @click="onClick">
			      <van-radio slot="right-icon" name="2" />
			    </van-cell>
			  </van-cell-group>
			</van-radio-group>
		</view>
		<view class="box order-info">
			<view>
				<text class="order-title">订单编号：</text>H2012021125192771784127
			</view>
			<view>
				<text class="order-title">下单时间：</text>{{date}}
			</view>
		</view>
		<view class="box note">
			<view class="title">备注信息</view>
			<textarea class="textarea" auto-height="true" placeholder="若有推荐老师，请输入老师名称"></textarea>
		</view>
		<van-submit-bar
		  :price="price"
		  button-text="立即支付"
		  @submit="onSubmit"
		>
		<van-icon class="iconfont" class-prefix="my-icon" name="kefu" />
		</van-submit-bar>
	</view>
</template>

<script>
	import shopPane from "@/components/shop-pane/shop-pane.vue"
	
	export default {
		data() {
			return {
				radio: '1',
				cource:[],
				date:null,
				development:this.development,
				price:0
			};
		},
		methods:{
			onChange(event) {
				this.radio = event.detail;
			},
		
		    onClick(event) {
			    this.radio = event.currentTarget.dataset.name;
				console.log('radio:',this.radio);
			},
			
			// 生成唯一订单号
			tradeNo(){
				
			},
			
			// 微信支付
			onSubmit(){
				this.request({
					url:`this.development/pay/wx`,
					method:'get',
					sucess: (res) => {
						console.log('支付成功');
					}
				})
			}
		},
		onLoad:async function(option){
			if(option.orderType === 'cart'){	//购物车
				this.cource = this.$store.getters['Cart/checkCart'];
				this.price = this.$store.getters['Cart/totalPrice'];
			}else if(option.cource){	//立即购买
				const product = JSON.parse(decodeURIComponent(option.cource));
				this.cource.push(product);
				this.price = parseInt(product.price) * 100;
			}
			
			this.date = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
			console.log('cource:',this.cource);
		}
	}
</script>

<style lang="scss">
.container{
	padding:0 24rpx;
	.box{
		border-radius:5px;
		box-shadow:gainsboro 0px 0px 5px;
		margin-top:24rpx;
		padding:0 20rpx;
	}
	.product-info{
		// shop-pane
		.carb{padding:24rpx 0;}
		.product-price{
			display: flex;
			justify-content: space-between;
			height:80rpx;
			line-height:80rpx;
			border-top:1px dashed #ccc;
		}
	}
	.payment{
		.iconfont{
			float:left;
			font-size:50rpx;
			margin-top:20rpx;
		}
		// 支付单选
		.van-cell{
			width:612rpx;
			float:left;
		}
		.title{
			color:#333;
			font-size:30rpx;
			height:80rpx;
			line-height:80rpx;
			border-bottom:1px dashed #ccc;
		}
	}
	.order-info{
		.order-title{
			color:#888;
			font-size:24rpx;
		}
	}
	.note{
		.title{
			color:#333;
			font-size: 24rpx;
			height:80rpx;
			line-height:80rpx;
			border-bottom:1px dashed #ccc;
		}
		.textarea{
			padding:20rpx 0;	
		}
	}
	.van-submit-bar{
		.iconfont{
			font-size:60rpx;
		}
	}
}
</style>
