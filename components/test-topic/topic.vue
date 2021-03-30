<template>
	<view class="container">
		<swiper class="swiper" :style="{height:swiperHeight + 'px'}" @change="changeQid" :current="current">
			<swiper-item v-for="(topic,qid) in topics" :key="topic.title">
				<view class="serial">
					<view class="headlines">
						第{{qid + 1}}题
						<text v-if="topic.type === 1">(单选)</text>
						<text v-else-if="topic.type === 2">(多选)</text>
						<text v-else-if="topic.type === 3">(判断)</text>
						<text v-else-if="topic.type === 4">(填空)</text>
						<text v-else-if="topic.type === 5">(问答)</text>
					</view>
					<view class="score" v-if="isType==='simulation'">({{topic.score}}分)</view>
					<view class="count">({{(qid + 1) + '/' + topics.length}})</view>
				</view>
				<view class="title">{{topic.title}}</view>
				<!-- 单选 -->
				<vanRadioGroup @change.native="onChoose" class="options" v-if="topic.type === 1">
					<view class="cell" v-for="item in options" :key="item.id">
						<vanRadio use-icon-slot :name="item.name" class="clearfix">
							<icon :class="['iconfont',(topic['myAnswer'] === item.name) ? item.actIcon : item.icon]"></icon>
							<view :class="['text',topic['myAnswer'] === item.name ? 'textActive' : ' ']">{{topic[item.value]}}</view>
						</vanRadio>
					</view>
				</vanRadioGroup>
				<!-- 多选 -->
				<vanCheckboxGroup class="options" :value="topic['myAnswer']" @change.native="onSelect" v-else-if="topic.type === 2">
					<view class="cell" v-for="item in options" :key="item.id">
						<van-checkbox use-icon-slot :name="item.name" class="clearfix">
							<icon :class="['iconfont',(topic['myAnswer'].indexOf(item.name) > -1) ? item.actIcon : item.icon]"></icon>
							<view :class="['text',(topic['myAnswer'].indexOf(item.name) > -1) ? 'textActive' : ' ']">{{topic[item.value]}}</view>
						</van-checkbox>
					</view>
				</vanCheckboxGroup>
				<!-- 判断 -->
				<vanRadioGroup @change.native="onChoose" class="options" v-else-if="topic.type === 3">
					<view class="cell">
						<vanRadio use-icon-slot name="A" class="clearfix">
							<icon :class="['iconfont',(topic['myAnswer'] === 'A') ? 'my-icon-activeA' : 'my-icon-A']"></icon>
							<view :class="['text',topic['myAnswer'] === 'A' ? 'textActive' : ' ']">{{topic['optionA']}}</view>
						</vanRadio>
					</view>
					<view class="cell">
						<vanRadio use-icon-slot name="B" class="clearfix">
							<icon :class="['iconfont',(topics[qid]['myAnswer'] === 'B') ? 'my-icon-activeB' : 'my-icon-B']"></icon>
							<view :class="['text',topics[qid]['myAnswer'] === 'B' ? 'textActive' : ' ']">{{topics[qid]['optionB']}}</view>
						</vanRadio>
					</view>
				</vanRadioGroup>
				<!-- 填空 -->
				<vanField
					v-else-if="topic.type === 4"
					:value="topic['myAnswer']"
					label="回答"
					placeholder="请输入答案"
					@change.native="inBlank"
				 />
				<!-- 问答 -->
				<vanField
					v-else-if="topic.type === 5"
					:value="topic['myAnswer']"
					label="回答"
					type="textarea"
					placeholder="请输入答案1000字以内"
					autosize
					@change.native="inBlank"
				 />
				<!-- 查看答案 -->
				<view class="look-answer" v-show="topic.isAnswer">
					<view class="top">
						正确答案是<text class="correct-answer">{{topic.answer}}</text>
						<text>{{topic.myAnswer ? '(您的选择 ' : '(您未作答)'}}</text>
						<text v-show="topic.myAnswer" :class="topic.myAnswer === topic.answer ? 'correct-answer':'.error-answer'">{{topic.myAnswer}} {{topic.myAnswer === topic.answer ? '回答正确' : '回答错误'}}</text>
						<text v-show="topic.myAnswer">)</text>
					</view>
					<view class="parsing">
						<view class="title">解析</view>
						<view class="content">{{topic.parse}}</view>
					</view>
					<view class="correct">平均正确率<text class="rate">100</text>%</view>
				</view>
				
			</swiper-item>
		</swiper>
		<!-- 答题卡 -->
		<view class="sheet">
			<van-action-sheet :show="sheetShow" title="答题卡"  @close="closeSheet">
			  <view class="content">
				  <view class="dtk-title">单选题</view>
				  <view class="options clearfix">
					  <view :class="['option','fl',topics[index].myAnswer ? 'do-mark' : ' ']" v-for="(item,index) in topics" :key="item.optionA" @tap="onOption(index)">{{index + 1}}</view>
				  </view>
			  </view>
			  <view class="btn" @tap="onPapers">交卷</view>
			</van-action-sheet>
		</view>
		<!-- 底部导航-->
		<slot name="tabbar">
			<view class="tabbar">
				<view class="tabbar-item" v-for="(item,index) in tabs" :key="item.id" @tap="tapTab(index)">
					<icon :class="['iconfont',item.icon]"/>
					<view :class="['tabbar-name',isAnswer && index === 0 ? 'active' : ' ']">{{item.name}}</view>
				</view>
			</view>
		</slot>
		<!-- 悬浮按钮 -->
		<view class="suspend-button" @tap="nextTest"><text :class="['text',current === topics.length - 1 ? 'complete' : ' ']">{{current === topics.length - 1 ? '完成' : '下一题'}}</text><text class="jt">></text></view>
	</view>
</template>

<script>
	import vanRadioGroup from '@/static/vant-weapp/radio-group/index'
	import vanRadio from '@/static/vant-weapp/radio/index'
	import vanCheckbox from '@/static/vant-weapp/checkbox/index'
	import vanCheckboxGroup from '@/static/vant-weapp/checkbox-group/index'
	import vanField from  "@/static/vant-weapp/field/index"
	export default {
		components:{
			vanRadioGroup,
			vanRadio,
			vanCheckbox,
			vanCheckboxGroup,
			vanField
		},
		props:{
			data:{
				type:Array,String
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
				current:this.idx,		//题号
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
				sheetShow:false,	//是否显示答题卡
				swiperHeight:0,		//swiper高度
			};
		},
		computed:{
			// 当前用户信息
			users(){
				return uni.getStorageSync('user');
			}
		},
		methods:{
			//左右滑动题
			changeQid(event){
				this.$set(this.tabs[0],'icon','my-icon-ckda');
				this.current = event.detail.current;
			},
			// 点击底部导航
			async tapTab(index){
				if(index === 0){	//查看答案
					this.topics[this.current].isAnswer = !this.topics[this.current].isAnswer
					if(this.topics[this.current].isAnswer){
						this.$set(this.tabs[index],'icon','my-icon-ckdaActive');
					}else{
						this.$set(this.tabs[index],'icon','my-icon-ckda');
					}
				}else if(index === 1){	//收藏
					if(this.isType === 'test'){
						const [err,res] = await this.request({
							url:`${this.SERVER}/api/collection?userId=${this.users.id}&testId=${this.topics[this.current].id}`,
							method:'get'
						});
						if(res.data.code === 0){
							// 说明已收藏
							if(this.topics[this.current].collection){
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
							this.topics[this.current].collection = !this.topics[this.current].collection;
						}else{
							uni.showToast({
								title:'收藏失败',
								icon:'none'
							})
						}
					}else if(this.isType === 'collection'){
						const [err,res] = await this.request({
							url:`${this.SERVER}/api/collection?userId=${this.users.id}&testId=${this.topics[this.current].id}`,
							method:'get'
						});
						if(res.data.code === 0){
							// 移除收藏成功
							for(let i = 0; i < this.topics.length; i++){
								console.log('循环了',i,this.current)
								if(this.topics[i].id === this.topics[this.current].id){
									// 如果数组仅剩一项数据
									if(this.topics.length === 1){
										// 显示没有练习
										this.topics.splice(i,1);
										this.$emit('notTest',true);
										break;
									}else{
										//如果删除的是数组的末尾一项
										if(i === this.topics.length - 1){
											this.current -= 1; 
										}
										this.topics.splice(i,1);
										uni.showToast({
											title:'移除收藏成功',
											icon:'none'
										})
										break;
									}
								}
							}
						}else{
							uni.showToast({
								title:'移除收藏失败',
								icon:'none'
							})
						}
					}else if(this.isType === 'wrong'){
						
					}
				}else if(index === 2){	//答题卡
					this.sheetShow = true;
				}
			},
			// 关闭答题卡
			closeSheet(){
				this.sheetShow = false;
			},
			// 答题卡上跳题
			onOption(index){
				// 关闭弹出层
				this.sheetShow = false;
				this.$set(this.tabs[0],'icon','my-icon-ckda');
				this.current = index;
			},
			// 悬浮按钮点击事件
			nextTest(){
				if(this.current < this.topics.length - 1){
					this.$set(this.tabs[0],'icon','my-icon-ckda');
					// 下一题
					this.current += 1;
				}else{
					//完成交卷
					this.onPapers();
				}
			},
			// 单选
		    onChoose(event){
			    // 我的答案
			    this.$set(this.topics[this.current],'myAnswer',event.detail);
			    console.log('单选',this.topics,this.current);
		    },
			//多选
			onSelect(event){
			    console.log('多选',event.detail);
			    this.$set(this.topics[this.current],'myAnswer',event.detail);
			    console.log('多选',this.topics,this.current);
			},
			//填空
			inBlank(event){
				 console.log('填空',event.detail);
				this.$set(this.topics[this.current],'myAnswer',event.detail);
			},
			// 交卷
			onPapers(){
				uni.showModal({
					content:'确认交卷?',
					success:async (res) => {
						if (res.confirm) {
							let score;			//正误情况
							let userTime;		//所用考试时间
							let testScorces = 0; //真实考试成绩
							if(this.isType === 'test'){
								let haveCount = 0; //完成个数
								let rightCount = 0;//做对个数
								score = this.topics.map(item => {
									if(item.myAnswer){
										haveCount += 1;
										if(item.answer === item.myAnswer){
											item.icon = true;
											rightCount += 1;
										}else{
											item.icon = false
										}
									}else{
										item.icon = false
									}
									return {title:item.title,icon:item.icon}
								});
								let data = {
									myProgress:{
										classSingleModelId:this.$store.state.myCource.courceId,
										courceSectionModelId:this.$store.state.myCource.sectionId,
										chapterTestModelId:0,//当前界面显示题
										haveCount:haveCount,
										rightCount:rightCount
									},
									record:"[]"
								}
								const [errTest,resTest] = await this.request({
									url:`${this.SERVER}/api/myTest/`,
									method:'post',
									data:data
								});
								if(resTest.data.code === 0){
									console.log('交卷清楚历史进度记录');
								}
							}else if(this.isType === 'simulation'){
								//获取考试所用时长时间
								userTime = 7200000 - this.$parent.remainTime;
								score = this.topics.map(item => {
									if(item.myAnswer){
										if(item.answer === item.myAnswer){
											item.icon = true;
										}else{
											item.icon = false;
											item.score = 0;
										}
									}else{
										item.icon = false;
										item.score = 0;
									}
									testScorces += item.score
									return {title:item.title,icon:item.icon,score:item.score}
								});
								let data = {
									simulationTestModelId:this.$store.state.myCource.simulationTest.id,
									classSingleModelId:this.$store.state.myCource.courceId,
									record:"[]",
									time:7200000,
									score:testScorces
								}
								const [err,res] = await this.request({
									url:`${this.SERVER}/api/testRecord`,
									method:'post',
									data:data
								})
								if(res.data.code === 0){
									console.log('清空记录',res.data.data);
								}
							}else if(this.isType === 'collection'){
								score = this.topics.map(item => {
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
							}
							console.log('分数',score);
							this.$store.dispatch('myCource/changeSectionScore',score);
							let url = this.isType === 'simulation' ? `./answerResult?isType=${this.isType}&userTime=${userTime}&score=${testScorces}` : `./answerResult?isType=${this.isType}`
							uni.redirectTo({
								url:url
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
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
					this.current = n;
				},
				immediate:true
			},
			// 监听题号变化，动态获取题目收藏状态
			async current(val){
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
			uni.getSystemInfo({
				success:res => {
					let navHeight = 0;
					if(this.isType !== 'collection'){
						navHeight = 50
					}
					this.swiperHeight = res.windowHeight - 88 - navHeight;
				}
			})
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
		.score{
			color:#ff6600;
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
		box-sizing: border-box;
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
