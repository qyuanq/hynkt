<template>
	<view class="container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="serial">
			<view class="headlines">第{{qid + 1}}题（单选）</view>
			<view class="count">({{(qid + 1) + '/' + topics.length}})</view>
		</view>
		<view class="title">{{topics[qid].title}}</view>
		<vanRadioGroup @change.native="onChoose" class="options">
			<view class="cell" v-for="item in options" :key="item.id">
				<vanRadio use-icon-slot :name="item.name" class="clearfix">
					<icon :class="['iconfont',(topics[qid]['myAnswer'] === item.name) ? item.actIcon : item.icon]"></icon>
					<view :class="['text',topics[qid]['myAnswer'] === item.name ? 'textActive' : ' ']">{{topics[qid][item.value]}}</view>
				</vanRadio>
			</view>
		</vanRadioGroup>
		<!-- 查看答案 -->
		<view class="look-answer" v-show="isAnswer">
			<view class="top">
				正确答案是<text class="correct-answer">{{topics[qid].answer}}</text>
				<text>{{topics[qid].myAnswer ? '(您的选择 ' : '(您未作答)'}}</text>
				<text v-show="topics[qid].myAnswer" :class="topics[qid].myAnswer === topics[qid].answer ? 'correct-answer':'.error-answer'">{{topics[qid].myAnswer}} {{topics[qid].myAnswer === topics[qid].answer ? '回答正确' : '回答错误'}}</text>
				<text v-show="topics[qid].myAnswer">)</text>
			</view>
			<view class="parsing">
				<view class="title">解析</view>
				<view class="content">{{topics[qid].parse}}</view>
			</view>
			<view class="correct">平均正确率<text class="rate">100</text>%</view>
		</view>
		<!-- 答题卡 -->
		<view class="sheet">
			<van-action-sheet :show="sheetShow" title="答题卡"  @close="closeSheet">
			  <view class="content">
				  <view class="dtk-title">单选题</view>
				  <view class="options clearfix">
					  <view :class="['option','fl',topics[index].myAnswer ? 'do-mark' : ' ']" v-for="(item,index) in topics" :key="item.title" @tap="onOption(index)">{{index + 1}}</view>
				  </view>
			  </view>
			  <view class="btn" @tap="onPapers">交卷</view>
			</van-action-sheet>
		</view>
		<!-- 底部选项 -->
		<view class="tabbar">
			<view class="tabbar-item" v-for="(item,index) in tabs" :key="item.id" @tap="tapTab(index)">
				<icon :class="['iconfont',item.icon]"/>
				<view :class="['tabbar-name',isAnswer && index === 0 ? 'active' : ' ']">{{item.name}}</view>
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view class="suspend-button" @tap="nextTest"><text :class="['text',qid === topics.length - 1 ? 'complete' : ' ']">{{qid === topics.length - 1 ? '完成' : '下一题'}}</text><text class="jt">></text></view>
	</view>
</template>

<script>
	import vanRadioGroup from '@/static/vant-weapp/radio-group/index'
	import vanRadio from '@/static/vant-weapp/radio/index'
	export default {
		components:{
			vanRadioGroup,
			vanRadio
		},
		props:{
			data:{
				type:Object,String
			},
			isType:{
				type:String
			},
			idx:{
				type:Number
			}
		},
		data() {
			return {
				topics:null,	//题
				SERVER:this.development,
				qid:this.idx,			//题号
				options:[		//ABCD选项
					{id:'pid1',value:'optionA',name:'A',icon:'my-icon-A',actIcon:'my-icon-activeA'},
					{id:'pid2',value:'optionB',name:'B',icon:'my-icon-B',actIcon:'my-icon-activeB'},
					{id:'pid3',value:'optionC',name:'C',icon:'my-icon-C',actIcon:'my-icon-activeC'},
					{id:'pid4',value:'optionD',name:'D',icon:'my-icon-D',actIcon:'my-icon-activeD'},
				],
				tabs:[			//选项卡图标文字
					{id:'tab1',name:'查看答案',icon:'my-icon-ckda',iconActive:'my-icon-ckdaActive'},
					{id:'tab2',name:'收藏',icon:'my-icon-shoucang',iconActive:'my-icon-shoucangActive'},
					{id:'tab3',name:'答题卡',icon:'my-icon-dtk',iconActive:'my-icon-dtkActive'},
					{id:'tab4',name:'开始学习',icon:'my-icon-ksxx',iconActive:'my-icon-ksxxActive'},
					{id:'tab5',name:'学生答疑',icon:'my-icon-xsdy',iconActive:'my-icon-xsdyActive'}
				],
				isAnswer:false,	//是否显示查看答案
				sheetShow:false,	//是否显示答题卡
				//监听左右滑动
				startX: '', // 横向移动开始的位置
				endX: '', // 横向移动结束的位置
				moveFlag: true // 判断是否在滑动
			};
		},
		computed:{
			// 当前用户信息
			users(){
				return uni.getStorageSync('user');
			},	
		},
		methods:{
			// 点击底部导航
			async tapTab(index){
				if(index === 0){	//查看答案
					this.isAnswer = !this.isAnswer; 
					if(this.isAnswer){
						this.$set(this.tabs[index],'icon','my-icon-ckdaActive');
					}else{
						this.$set(this.tabs[index],'icon','my-icon-ckda');
					}
				}else if(index === 1){	//收藏
					if(this.isType === 'test'){
						const [err,res] = await this.request({
							url:`${this.SERVER}/api/collection?userId=${this.users.id}&testId=${this.topics[this.qid].id}`,
							method:'get'
						});
						if(res.data.code === 0){
							// 说明已收藏
							if(this.topics[this.qid].collection){
								this.$set(this.tabs[index],'icon','my-icon-shoucang');
								uni.showToast({
									title:'取消收藏成功',
									icon:'none'
								})
							}else{
								this.$set(this.tabs[index],'icon','my-icon-shoucangActive');
								uni.showToast({
									title:'收藏成功',
									icon:'none'
								})
							}
							// this.$set(this.topics[this.qid],'collection',0);
							this.topics[this.qid].collection = !this.topics[this.qid].collection;
						}else{
							uni.showToast({
								title:'收藏失败',
								icon:'none'
							})
						}
					}else if(this.isType === 'collection'){
						const [err,res] = await this.request({
							url:`${this.SERVER}/api/collection?userId=${this.users.id}&testId=${this.topics[this.qid].id}`,
							method:'get'
						});
						if(res.data.code === 0){
							// 移除收藏成功
							const index = this.topics.forEach((item,index) => {
								item.id === this.topics[this.qid].id
								return index;
							})
							console.log('index',index);
							this.topics.slice(index,1);
						}else{
							
						}
					}else if(this.isType === 'wrong'){
						
					}
				}else if(index === 2){	//答题卡
					this.sheetShow = true;
				}
			},
			  onChoose(event){
				  console.log('单选',event.detail)
				  this.radio = event.detail;
				  // 我的答案
				  this.$set(this.topics[this.qid],'myAnswer',event.detail);
				  console.log(this.topics[this.qid]);
			  },
			  // 关闭答题卡
			  closeSheet(){
				  this.sheetShow = false;
			  },
			  // 答题卡上跳题
			  onOption(index){
				  this.qid = index;
				  // 关闭弹出层
				  this.sheetShow = false;
			  },
			// 交卷
			onPapers(){
				uni.showModal({
					content:'确认交卷?',
					success:(res) => {
						if (res.confirm) {
							console.log('所有答案',this.topics);
							let score = this.topics.map(item => {
								if(item.myAnswer){
									if(item.answer === item.myAnswer){
										item.icon = true;
									}else{
										item.icon = false
									}
								}else{
									item.icon = false
								}
								return {title:item.title,icon:item.icon}
							});
							console.log('分数',score);
							this.$store.dispatch('myCource/changeSectionScore',score);
							console.log('vuex分数',this.$store.state.myCource.sectionScore);
							uni.redirectTo({
								url:`./answerResult?sectionId=${this.sectionId}`
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			 // 手指触摸动作开始
			  touchStart (e) {
				this.startX = e.touches[0].pageX // 开始触摸时的原点
				this.moveFlag = true
			  },
			  // 手指触摸后移动 50 为设定的移动距离
			  touchMove (e) {
				this.endX = e.touches[0].pageX // 结束触摸时的原点
				if (this.moveFlag) {
				  if (this.endX - this.startX > 50) {
					console.log('上一题')
					if(this.qid > 0){
						this.qid -= 1;
					}
					this.moveFlag = false
				  }
				  if (this.startX - this.endX > 50) {
					console.log('下一题')
					if(this.qid < this.topics.length - 1){
						this.qid += 1;
					}
					this.moveFlag = false
				  }
				}
			  },
			  // 手指触摸动作结束
			  touchEnd () {
				this.moveFlag = true
			  },
			  // 悬浮按钮点击事件
			  nextTest(){
				  if(this.qid < this.topics.length - 1){
					  // 下一题
				  	this.qid += 1;
				  }else{
					  //完成交卷
					  this.onPapers();
				  }
			  }
		},
		watch:{
			data:{
				handler(n,o){
					this.topics = n;
				},
				immediate:true
			},
			idx:{
				handler(n,o){
					this.qid = n;
				},
				immediate:true
			},
			// 监听题号变化，动态获取题目收藏状态
			async qid(val){
				this.$emit('changeQid',val);
				// 收藏图标默认灰色
				this.$set(this.tabs[1],'icon','my-icon-shoucang');
				//是否收藏
				const [errColl,resColl] = await this.request({
					url:`${this.SERVER}/api/isCollection?userId=${this.users.id}&testId=${this.topics[val].id}`,
					method:'get'
				})
				if(resColl.data.code === 0){
					//第一个题已收藏
					if(resColl.data.data){
						//设置收藏标识
						this.$set(this.topics[val],'collection',1);
						//设置收藏图标为选中
						this.$set(this.tabs[1],'icon','my-icon-shoucangActive');
					}
				}
			}
		},
		created(){
			console.log('子组件',this.qid);
			if(this.isType === 'test'){
				this.tabs[1].name = '收藏';
				this.tabs[1].icon = 'my-icon-shoucang';
			}else if(this.isType === 'collection'){
				this.tabs[1].name = '取消收藏';
				this.tabs[1].icon = 'my-icon-shoucangActive';
			}else if(this.isType === 'wrong'){
				this.tabs[1].name = '错题本';
			}
		}
	}
</script>
<style lang="scss">
.container{
	width:100%;
	box-sizing: border-box;
	.serial{
		display:flex;
		justify-content: space-between;
		margin-top:30rpx;
		padding:0 30rpx;
		.headlines{
			width:353rpx;
			height:36rpx;
			@include paneactive('../../static/img/answer_shape.png',top,center);
			line-height:36rpx;
			text-indent: 20rpx;
			color:$color-white;
		}
		.count{
			color:$color-primary;
		}
	}
	.title{
		padding:0 30rpx;
		margin:$margin-top40 0;
	}
	.options{
		margin-top:$margin-top40;
		.cell{
			&:first-child{
				border-top:1px solid #ebedf0;
			}
			display:flex;
			justify-content: space-between;
			width:100%;
			padding:20rpx 30rpx;
			border-bottom:1px solid #ebedf0;
			box-sizing: border-box;
			.iconfont{font-size:48rpx !important;float:left;}
			.text{width:570rpx;margin-left:20rpx;margin-top:6rpx;float:left;}
			.textActive{
				color:$color-primary;
			}
		}
	}
	.look-answer{
		padding:0 20rpx;
		font-size:14px;
		.top{
			height:80rpx;
			line-height:80rpx;
			border-bottom:1px solid #ccc;
			.correct-answer{
				color:$color-primary;
			}
			.error-answer{
				color:#DC5044;
			}
		}
		.parsing{
			.title{
				@include font(14px,#333333);
				cont-weight:700;
			}
			.content{
				padding:20rpx 10rpx;
				@include widthCenter(710rpx,20rpx);
				border:1px dashed #c6c6c6;
				background:#F6F7F8;
				box-sizing:border-box;
			}
		}
	}
	.sheet{
		.van-popup{
			padding-bottom: 30rpx;
			max-height:300px !important;
		}
		.content{
			.dtk-title{
				margin:0 35rpx;
			}
			.options{
				.option{
					width:80rpx;
					height:80rpx;
					margin:17.5rpx 35rpx;
					border-radius: 50%;
					@include boxCenter(80rpx);
					@include font(14px,#fff);
					background:#E2E2E2;
				}
				.do-mark{
					background:#3fbf72;
				}
				.not-rate{
					background:#ff5500;
				}
			}
		}
		.btn{
			width:200rpx;
			margin:20rpx auto;
			height:60rpx;
			@include boxCenter(60rpx);
			@include font(14px,#fff)
			background:$color-primary;
			border-radius:40rpx;
		}
	}
	.tabbar{
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		text-align: center;
		border-top:1px solid #ccc;
		z-index:1;
		.active{
			color:$color-primary !important;
		}
		.iconfont{
			font-size:18px;
		}
		.tabbar-name{
			@include font(12px,#646566);
		}
	}
	.suspend-button{
		position: fixed;
		top:50%;
		right:0;
		width:80rpx;
		height:160rpx;
		background:$color-primary;
		opacity: .4;
		border-radius: 80rpx 0 0 80rpx;
		transform:translateY(-50%);
		// @include boxCenter(160rpx);
		@include font(14px,#fff);
		.text{
			position: absolute;
			top:35rpx;
			left:20rpx;
			writing-mode: tb-rl;
		}
		.complete{
			top:50rpx !important;
		}
		.jt{
			position: absolute;
			top:50%;
			transform:translateY(-50%);
			right:0;
		}
	}
}
</style>
