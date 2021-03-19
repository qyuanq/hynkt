<template>
	<view>
		<van-nav-bar
			:title="sectionName"
			 @click-left="onClickLeft"
		>
			<van-icon name="arrow-left" slot="left" />
		</van-nav-bar>
		<topic 
			:data="topics" 
			isType="test" 
			:idx="qid" 
			ref="topic"
			@changeQid="changeQid"
			@changeTopics="changeTopics"
		/>
	</view>
</template>
<script>
	import topic from '../../components/test-topic/topic.vue';
	import {renderTime} from '@/static/js/common.js';
	export default{
		components:{topic},
		data(){
			return{
				SERVER:this.development,
				sectionId:null,	//当前章节id
				sectionName: '',//当前章节名字
				topics:null,	//题
				qid:0			//题号
			}
		},
		computed:{
			// 当前用户信息
			users(){
				return uni.getStorageSync('user');
			}	
		},
		methods:{
			//监听子组件习题号发生变化
			changeQid(qid){
				this.qid = qid;
			},
			onClickLeft(){
				uni.showModal({
					content:'本次练习没有完成,是否保存本次练习',
					cancelText:'不保存',
					confirmText:'保存',
					success:async(res) => {
						if(res.confirm){
							const date = new Date();
							const currentTime = renderTime(date);
							// 获取完成个数
							let haveCount = 0;
							let rightCount = 0;
							let record = [];
							this.$refs['topic'].topics.forEach(item => {
								if(item.myAnswer){
									record.push({id:item.id,myAnswer:item.myAnswer})
									haveCount += 1;
									rightCount += item.myAnswer === item.answer ? 1 : 0;
								}
							})
							// 获取正确个数
							let data = {
								userId:this.users.id,
								classId:this.$store.state.myCource.courceId,
								sectionId:this.sectionId,
								testId:this.qid + 1,
								date:currentTime,
								haveCount:haveCount,
								rightCount:rightCount,
								record:JSON.stringify(record)
							}
							console.log('json',JSON.stringify(record))
							const [errTest,resTest] = await this.request({
								url:`${this.SERVER}/api/myTest/`,
								method:'post',
								data:data
							});
							if(resTest.data.code === 0){
								uni.showToast({
									title:'保存成功，返回上一页',
									icon:'none',
									duration: 2000,
									success:() => {
										this.changeParentData();
										setTimeout(function() {
											uni.navigateBack({
												delta:1
											})
										}, 2000);
									}
								})
							}else{
								uni.showToast({
									title:'保存失败，返回上一页',
									duration: 2000,
									icon:'none',
									success:() => {
										setTimeout(function() {
											uni.navigateBack({
												delta:1
											})
										}, 2000);
									}
								})
							}
						}else if(res.cancel){
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
			},
			// 刷新上一页数据
			changeParentData(){
				let pages = getCurrentPages();
				let beforePage =  pages[pages.length - 2];
				beforePage.$vm.changeData();
			}
		},
		onLoad: async function(option){
			this.sectionId = this.$store.state.myCource.sectionId;
			this.sectionName = this.$store.state.myCource.sectionName;
			// 获取章节下所有习题
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/topics/${this.sectionId}`,
				method:'get'
			})
			if(res.data.code === 0){
				this.topics = res.data.data.map(item => {
					item.myAnswer = '';
					return item;
				});
				//进度处理记录 
				let record = this.$store.state.myCource.sectionRecord;
				if(record){
					for(let j=0; j<record.length; j++){
						for(let i=0; i<this.topics.length; i++){
							if(record[j].id === this.topics[i].id){
								this.topics[i].myAnswer = record[j].myAnswer;
								break;
							}
						}
					}
				}
			}
			// 防止报错，先传topics后传qid
			this.qid = option.qid - 1 || 0;
			// 判断第一题是否收藏
			const [errColl,resColl] = await this.request({
				url:`${this.SERVER}/api/isCollection?userId=${this.users.id}&testId=${this.topics[this.qid].id}`,
				method:'get'
			})
			if(resColl.data.code === 0){
				//第一个题已收藏
				if(resColl.data.data){
					//设置子组件收藏标识
					this.$set(this.topics[0],'collection',1);
					//设置子组件收藏图标为选中
					this.$set(this.$children[0].tabs[1],'icon','my-icon-shoucangActive');
				}
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
</style>
