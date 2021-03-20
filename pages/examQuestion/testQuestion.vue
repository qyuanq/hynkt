<template>
	<view>
		<!-- 头部导航 -->
		<van-nav-bar
			:title="testName"
			 @click-left="onClickLeft"
		>
			<van-icon name="arrow-left" slot="left" />
		</van-nav-bar>
		
		<newTopic 
			isType="simulation" 
			:data="topics" 
			ref="topic"
		>
			<!-- 底部选项 模拟考试 -->
			<template #tabbar>
				<view class="tabbar" >
					<van-count-down 
						use-slot
						:time="time"
						@change="changeTime"
					    @finish="finished"
					>
						<text>{{ timeData.hours }}:</text>
						<text>{{ timeData.minutes }}:</text>
						<text>{{ timeData.seconds }}</text>
					</van-count-down>
					<view class="tab-right">
						<view class="tabbar-item" @tap="onSheet">
							<icon class="iconfont my-icon-dtk" />
							<view class="tabbar-name">答题卡</view>
						</view>
						<view class="tabbar-item">
							<icon class="iconfont my-icon-xsdy" />
							<view class="tabbar-name">学生答疑</view>
						</view>
					</view>
				</view>
			</template>
		</newTopic>		
	</view>
</template>

<script>
	import newTopic from '../../components/test-topic/topic.vue';
	export default {
		components:{
			newTopic
		},
		data() {
			return {
				SERVER:this.development,
				time:120 * 60 * 1000,	//倒计时
				topics:[],	//试题
				testId:null,	//模拟考试id
				testName:'',	//模拟考试题目
				timeData: {},
				remainTime:7200000	//还剩余时间
			};
		},
		methods:{
			// 导航返回操作
			onClickLeft(){
				uni.showModal({
					content:'本次模考没有完成，是否保存本次模考',
					confirmText:'保存',
					cancelText:'不保存',
					success:async (res) => {
						if(res.confirm){
							let record = [];
							this.$refs['topic'].topics.forEach(item => {
								if(item.myAnswer !==''){
									record.push({id:item.id,myAnswer:item.myAnswer})
								}
							})
							console.log('考试记录',record)
							let data = {
								simulationTestModelId:this.$store.state.myCource.simulationTest.id,
								record:JSON.stringify(record),
								time:this.remainTime
							}
							const [err,res] = await this.request({
								url:`${this.SERVER}/api/testRecord`,
								method:'post',
								data:data
							})
							let toastTitle;
							if(res.data.code === 0){
								toastTitle = '保存成功';
							}else{
								toastTitle = '保存失败';
							}
							uni.showToast({
								title:toastTitle,
								icon:'none',
								success:(res) => {
									// 刷新上一页数据
									this.changePrePage();
									setTimeout(function(){
										uni.navigateBack({
											delta:1
										})
									},1500)
								}
							})
						}else if(res.cancel){
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
			},
			// 答题卡按钮
			onSheet(){
				this.$children[0].tapTab(2);
			},
			//剩余倒计时时间
			changeTime(e){
				this.timeData = e.detail;
				this.remainTime = (this.timeData.hours * 3600 + this.timeData.minutes * 60 + this.timeData.seconds) * 1000 + this.timeData.milliseconds;
			},
			//倒计时结束
			finished(){
				uni.showToast({
					title:'时间结束，自动交卷',
					success:res =>{
						setTimeout(
							uni.navigateTo({
								url:''
							})
						,2000)
					}
				})
			},
			// 刷新上一页数据
			changePrePage(){
				//获取当前页面栈
				let pages = getCurrentPages();
				//获取上一页
				let beforePage = pages[pages.length - 2];
				beforePage.$vm.initData();
			}
		},
		onLoad:async function(option){
			this.testId = option.testId;
			let record = [];
			if(this.$store.state.myCource.simulationTest){
				let simTest = this.$store.state.myCource.simulationTest;
				this.testName = simTest.title;
				this.time = simTest['mysimulation_models.time'] || 7200000;
				record = JSON.parse(simTest['mysimulation_models.record']);
				console.log('record',record)
			}
			
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/testQuestions/${this.testId}`,
				method:'get'
			});
			if(res.data.code === 0){
				this.topics = res.data.data;
				// 是否有保存的历史进度记录
				if(record.length > 0){
					for(let i=0; i<this.topics.length; i++){
						for(let j=0; j<record.length; j++){
							if(record[j].id === this.topics[i].id){
								this.topics[i].myAnswer = record[j].myAnswer;
								break;
							}else{
								this.topics[i].myAnswer = '';
							}
						}
					}
				}else{
					this.topics = this.topics.map(item => {
						item.myAnswer = '';
						return item;
					});
				}
				console.log('topics',this.topics);
			}
		}
	}
</script>

<style lang="scss">
.van-nav-bar{
	background-color:#2890ff !important;
}
.van-nav-bar__title{
	color:#fff !important;
}
.van-icon-arrow-left:before{
	color:#fff;
	font-size:20px;
}
.tabbar{
	width: 100%;
	height: 100rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	text-align: center;
	border-top:1px solid #ccc;
	z-index:1;
	.van-count-down{
		font-size:40rpx;
		line-height:100rpx;
	}
	.tab-right{
		width:50%;
		display: flex;
		justify-content: space-around;
		.tabbar-item{
			width:80rpx;
		}
	}
}
</style>
