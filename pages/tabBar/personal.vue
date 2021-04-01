<template>
	<view class="container">
		<view class="user">
			<view class="user-info">
				<image class="head-sculpture" :src="SERVER +'/static/img/personal/boy.png'" ></image>
				<!-- <van-icon class="iconfont my-icon-yaoqinghaoyou"></van-icon> -->
				<text class="sex">男</text>
				<view class="jf"><text>积分</text><text>0</text></view>
				<navigator url="../personal/editInfo/edit-info"><image class="editor" :src="SERVER + '/static/img/personal/editor.png'"></image></navigator>
			</view>
		</view>
		<view class="cell">
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="我的订单" is-link link-type="navigateTo" url="/pages/personal/order/my-order" >
						<div slot="icon">
							<!-- <van-icon class="iconfont my-icon-dingdan"></van-icon> -->
							<van-icon class="iconfont" class-prefix="my-icon" name="dingdan" />
						</div>
					</van-cell>
				</van-cell-group>
			</view>
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="我的购物车" is-link link-type="navigateTo" url="/pages/personal/shopCart/shopCart" >
						<div slot="icon">
							<!-- <van-icon class="iconfont my-icon-dingdan"></van-icon> -->
							<van-icon class="iconfont" class-prefix="my-icon" name="cart" />
						</div>
					</van-cell>
				</van-cell-group>
			</view>
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="邀请好友" is-link link-type="navigateTo" url="/pages/personal/invite/invite" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-yaoqinghaoyou"></van-icon>
						</div>
					</van-cell>
				</van-cell-group>
			</view>
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="通知消息" is-link link-type="navigateTo" url="/pages/personal/notice/notice" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-tongzhixiaoxi"></van-icon>
						</div>
					</van-cell>
					<van-cell title="我的提问" is-link link-type="navigateTo" url="/pages/personal/question/question" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-tiwen"></van-icon>
						</div>
					</van-cell>
				</van-cell-group>
			</view>
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="咨询" is-link link-type="navigateTo" url="/pages/dashboard/index" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-zixun"></van-icon>
						</div>
					</van-cell>
					<van-cell title="微信公众号" is-link link-type="navigateTo" @click="showPopup" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-weixin"></van-icon>
						</div>
					</van-cell>
					<van-cell title="电话联系" is-link link-type="navigateTo" @tap="makePhoneCall" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-dianhualianxi"></van-icon>
						</div>
					</van-cell>
				</van-cell-group>
			</view>
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="我的缓存" is-link link-type="navigateTo" url="/pages/dashboard/index" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-xiazai"></van-icon>
						</div>
					</van-cell>
				</van-cell-group>
			</view>
			<view class="cell-group">
				<van-cell-group>
					<van-cell title="设置" is-link link-type="navigateTo" url="/pages/personal/setcenter/setcenter" >
						<div slot="icon">
							<van-icon class="iconfont my-icon-shezhi"></van-icon>
						</div>
					</van-cell>
				</van-cell-group>
			</view>
		</view>
		<van-popup :show="show" @close="onClose" closeable>
			<view class="gzh">
				<image :src="SERVER + '/static/img/personal/gzh.jpg'"></image>
				<text>扫一扫，关注微信公众号</text>
			</view>
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				tel:'022-23789585',
				SERVER:this.server
			};
		},
		methods:{
			showPopup(){
				this.show = true;
			},
			onClose(){
				this.show = false;
			},
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber:this.tel,
					success:function(){
						console.log("拨打成功")
					},
					fail:function(){
						console.log('拨打失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{background-color: #F6F7F8;}
	.container{
		.user{
			width:100%;
			height:300rpx;
			background:#41A5FD;
			padding-top:140rpx;
			.user-info{
				width:100%;
				height:100rpx;
				position:relative;
				.head-sculpture{width:100rpx;height:100rpx;}
				.sex{color:#fff;padding-bottom:15px;display:inline-block;margin-left:15px;}
				.jf{width:180rpx;height:50rpx;position:absolute;right:0;bottom:0;background:rgba(255,255,255,.6);line-height:50rpx;padding-left:15rpx;border-radius:8rpx 0 0 8rpx;}
				.editor{width:32rpx;height:32rpx;position:absolute;top:-20px;right:20px;}
			}
		}
		.cell{
			.cell-group{
				margin-top:20rpx;
				.iconfont{font-size:20px;}
				.my-icon-dingdan{color:#fd9801;}
				.my-icon-yaoqinghaoyou{color:#35bc6b;}
				.my-icon-tongzhixiaoxi{color:#41a5fd;}
				.my-icon-tiwen{color:#ff6600;}
				.my-icon-zixun{color:#41a5fd;}
				.my-icon-weixin{color:#07C160;}
				.my-icon-dianhualianxi{color:#ff6600;}
				.my-icon-xiazai{color: #35bc6b;}
				.my-icon-shezhi{color:#41a5fd;}
				.van-cell__title{margin-left:10px;}
			}
		}
		.van-popup{
			width:200px;
			padding:20px 10px;
			.gzh{
				font-size:12px;
				width:150px;
				margin:0 auto;
				text-align:center;
				image{width:150px;height:150px;}
			}
		}
	}
	
</style>
