<template>
	<view class="container">
		<van-cell-group>
			<van-cell title="修改密码" is-link link-type="navigateTo" url="/pages/public/changePass" >
				<div slot="icon">
					<van-icon class="iconfont" class-prefix="my-icon" name="dingdan" />
				</div>
			</van-cell>
			<van-cell title="意见反馈" is-link link-type="navigateTo"  @click="ideaShowPopup">
				<div slot="icon">
					<van-icon class="iconfont" class-prefix="my-icon" name="dingdan" />
				</div>
			</van-cell>
			<van-cell title="关于我们" is-link link-type="navigateTo" @click="aboutShowPopup">
				<div slot="icon">
					<van-icon class="iconfont" class-prefix="my-icon" name="dingdan" />
				</div>
			</van-cell>
		</van-cell-group>
		<van-popup :show="ideaShow" @close="onIdeaClose" class="popup-idea">
			<view class="title">意见反馈中心</view>
			<!-- <van-field :value="message" placeholder="请输入留言" autosize :border="false"></van-field> -->
			<textarea class="textarea" placeholder="请输入您的意见,字数在200以内" v-model="contentText" @input="surplusNumber"></textarea>
			<text class="num">剩余{{num}}字数</text>
			<view class="btns">
				<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" size="mini" round>提交</van-button>
				<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" size="mini" round>取消</van-button>
			</view>
		</van-popup>
		<van-popup :show="aboutShow" position="bottom"  custom-style="height: 24%" @close="onAboutClose" class="popup-about">
			<view class="title">关于我们</view>
			<view class="info">
				<view class="detail" v-for="item in info">
					<text>{{item['name']}}</text>
					<text>{{item['value']}}</text>
				</view>
			</view>
		</van-popup>
		<button>退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ideaShow:false,
				aboutShow:false,
				num:200,
				contentText:'',
				info:[{'name':'当前版本:','value':'3.3.7'},{'name':'客服电话:','value':''},{'name':'客服QQ',value:''},{'name':'官方网站:','value':'mkt.hynjt.com'},{'name':'微信公众号','value':'慧永诺集团'}]
			};
		},
		methods:{
			ideaShowPopup(){
				this.ideaShow = true;
			},
			aboutShowPopup(){
				this.aboutShow = true;
			},
			onIdeaClose(){
				this.ideaShow = false;
			},
			onAboutClose(){
				this.aboutShow = false;
			},
			surplusNumber(){
				let txtVal = this.contentText.length;
				this.num = 200 - txtVal;
			}
		}
	}
</script>

<style lang="scss">
.container{
	button{width:100%;color:#ff6600;margin-top:20px;background:#fff;}
	.van-popup{
		padding:10px 5px;
		box-sizing:border-box;
		.title{text-align:center;}
		.textarea{width:100%;background:#CCCCCC;font-size:12px;margin-top:20px;position:relative;}
		.num{position:absolute;right:6px;bottom:43px;font-size:10px;}
		.btns{
			float:right;
			button{width:80px;margin-left:10px;margin-top:10px;}
		}
	}
	.van-popup--center{
		width:90%;
	}
	.title{font-weight:700;}
	.detail{
		margin-top:10px;
		font-size:12px;
		display:flex;
		justify-content: space-between;
	}
}
</style>
