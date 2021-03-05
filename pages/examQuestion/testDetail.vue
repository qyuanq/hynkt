<template>
	<view class="container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view class="serial">
			<view class="headlines">第{{qid + 1}}题（单选）</view>
			<view class="count">({{(qid + 1) + '/' + topics.length}})</view>
		</view>
		<view class="title">{{topics[qid].title}}</view>
		<van-radio-group @change="onChoose" class="options">
			<view class="cell" v-for="item in options" :key="item.id">
				<van-radio use-icon-slot :name="item.name">
					<icon :class="['iconfont',(topics[qid].myAnswer === item.name) ? item.actIcon : item.icon]"></icon>
					<text :class="[topics[qid].myAnswer === item.name ? 'textActive' : ' ']">{{topics[qid][item.value]}}</text>
				</van-radio>
			</view>
		</van-radio-group>
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
				  <view class="title">单选题</view>
				  <view class="options">
					  <view :class="['option',topics[index].myAnswer ? 'do-mark' : ' ']" v-for="(item,index) in topics" @tap="onOption(index)">1</view>
				  </view>
			  </view>
			  <view class="btn" @tap="onPapers">交卷</view>
			</van-action-sheet>
		</view>
		<!-- 底部选项 -->
		<van-tabbar>
		  <van-tabbar-item v-for="(item,index) in tabs" :key="item.id" @tap="tapTab(index)"> 
			<icon slot="icon" :class="['iconfont',item.icon]"/>
			<icon slot="icon-active" :class="['iconfont',item.iconActive]"/>
		    {{item.name}}
		  </van-tabbar-item>
		</van-tabbar>
		<!-- 悬浮按钮 -->
		<view class="suspend-button" @tap="nextTest"><text :class="['text',qid === topics.length - 1 ? 'complete' : ' ']">{{qid === topics.length - 1 ? '完成' : '下一题'}}</text><text class="jt">></text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sectionId:null,	//当前章节id
				active: 0,
				icon: {
				  normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
				  active: 'https://img.yzcdn.cn/vant/user-active.png',
				},
				SERVER:this.development,
				topics:null,	//题
				qid:0,			//题号
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
				myAnswer:null,		//我的答案
				sheetShow:false,	//是否显示答题卡
				//监听左右滑动
				startX: '', // 横向移动开始的位置
				endX: '', // 横向移动结束的位置
				moveFlag: true // 判断是否在滑动
			};
		},
		methods:{
			tapTab(index){
				if(index === 0){
					this.isAnswer = !this.isAnswer; 
				}else if(index === 1){
					console.log('点击了收藏');
				}else if(index === 2){
					this.sheetShow = true;
				}
			},
			  onChoose(event){
				  console.log('单选',event.detail)
				  // 我的答案
				  this.$set(this.topics[this.qid],'myAnswer',event.detail);
			  },
			  // 关闭答题卡
			  closeSheet(){
				  this.sheetShow = false;
			  },
			  // 答题卡上跳题
			  onOption(index){
				  this.qid = index;
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
							uni.navigateTo({
								url:'./answerResult'
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
		onLoad: async function(option){
			this.sectionId = option.sectionId;
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/topics/${this.sectionId}`,
				method:'get'
			})
			if(res.data.code === 0){
				this.topics = res.data.data;
				console.log('res',res.data.data);
			}
		},
		onShow:async function(){
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/topics/${this.sectionId}`,
				method:'get'
			})
			if(res.data.code === 0){
				this.topics = res.data.data;
				console.log('res',res.data.data);
			}
		}
	}
</script>

<style lang="scss">
.container{
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
			width:100%;
			padding:20rpx 30rpx;
			border-bottom:1px solid #ebedf0;
			.iconfont{font-size:48rpx !important;margin-right:30rpx;vertical-align:-3px;}
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
		padding:0 50rpx;
		.options{
			// display:flex;
			// justify-content: space-between;
			.option{
				display: inline-block;
				width:80rpx;
				height:80rpx;
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
		.btn{
			@include widthCenter(200rpx,20rpx);
			height:60rpx;
			@include boxCenter(60rpx);
			@include font(14px,#fff)
			background:$color-primary;
			border-radius:40rpx;
		}
	}
	.suspend-button{
		position: fixed;
		top:50%;
		right:0;
		width:80rpx;
		height:160rpx;
		background:$color-primary;
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
