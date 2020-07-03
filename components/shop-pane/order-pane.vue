<template>
	<view class="container">
		<view class="top">
			<text class="code">单号：{{code}}</text>
			<view v-if="paid === false" class="icon iconfont my-icon-shanchu"></view>
		</view>
		<view class="center">
			<view class="img">
				<image :src="img_path"></image>
			</view>
			<view class="txt">
				<view class="title">{{title}}</view>
				<view class="time">时间：{{timer}}</view>
				<view class="price">实付:<text class="sign">￥</text><text class="num">{{price}}</text><navigator :class="[paid === false ? 'color-unpaid': 'color-paid' , 'pay-btn']">{{paidText}}</navigator></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			code:{
				type:String,
				default:''
			},
			img_path:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			timer:{
				type:String,
				default:''
			},
			price:{
				type:Number,
				default:0
			},
			paid:{
				type:Boolean
			}
		},
		data() {
			return {
				text:'立即支付'
			}
		},
		created(){
			console.log(this.paid)
		},
		computed:{
			paidText:function(){
				if(! this.paid){
					return '立即支付'
				}else{
					return '已支付'
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.container{
		width:100%;
		border-sizing:border-box;
		padding:8px 16px;
		.top{
			display: flex;
			justify-content: space-between;
			.code{font-size:14px;color:#888888;line-height:24px;}
			.icon{margin-right:30px;}
			.my-icon-shanchu{color:#fd9801;line-height:24px;}
		}
		.center{
			display:flex;
			.img{
				flex:none;width:100px;height:60px;margin-right:10px;
				image{width:100%;height:100%;}
			}
			.txt{
				flex:1;
				// white-space: normal;文本不换行   当文本溢出用省略号代表修建的文本
				.title{font-size:12px;color:#333;line-height:20px;text-overflow:ellipsis;white-space: normal;}
				.time{font-size:10px;line-height:18px;color:#888;text-overflow:ellipsis;white-space: normal;}
				.price{
					font-size:11px;color:#888;
					.sign{color:#FD9801;font-size:11px}
					.num{font-size:14px;color:#FD9801;}
					.pay-btn{display:inline-block;text-align:center;width:60px;height:18px;line-height:18px;color:#fff;border-radius:10px;float:right;margin-right:30px;}
					.color-unpaid{background:#FD9801;}
					.color-paid{background:#ccc;}
				}
			}
		}
	}
</style>
