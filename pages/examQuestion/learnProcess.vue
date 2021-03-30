<template>
	<view class="container">
		<view class="h1">视频学习进度</view>
		<view class="video">
			<view class="title">课程精讲班</view>
			<view class="">学习进度： {{progress.watchVideo}}/{{progress.videoCount}}个</view>
			<progress
				:percent="videoProgress" 
				show-info 
				stroke-width="6" 
				activeColor="#fff" 
				backgroundColor="#2C405A"
				border-radius="6"
				font-size="14"
				active
			/>
		</view>
			
		<view class="h1">题库学习进度</view>
		<view class="test">
			<view class="icon-text">
				<icon />
				<view class="text">
					<view class="smi-text">章节练习</view>
					<view class="smi-pro">学习进度： {{progress.haveCount}}/{{progress.sectionTestCount}}个</view>
				</view>
			</view>
			<progress
				:percent="sectionProgress" 
				show-info 
				stroke-width="6" 
				activeColor="#fff" 
				backgroundColor="#2C405A"
				border-radius="6"
				font-size="14"
				active
			/>
		</view>
		<view class="test">
			<view class="icon-text">
				<icon />
				<view class="text">
					<view class="smi-text">模考试题</view>
					<view class="smi-pro">学习进度： {{progress.mySimCount}}/{{progress.simCount}}套</view>
				</view>
			</view>
			<progress
				:percent="simTestProgress" 
				show-info 
				stroke-width="6" 
				activeColor="#fff" 
				backgroundColor="#2C405A"
				border-radius="6"
				font-size="14"
				active
			/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SERVER:this.development,
				progress:null,	//进度数据
				sectionProgress:0,	//章节练习完成进度
				simTestProgress:0,	//模拟考试练习完成进度
				videoProgress:0		//视频完成进度
			};
		},
		onLoad:async function(){
			const [err,res] = await this.request({
				url:`${this.SERVER}/api/myAllTest/?courceId=${this.$store.state.myCource.courceId}`,
				method:'get'
			})
			if(res.data.code === 0){
				this.progress = res.data.data;
				console.log(this.progress.haveCount / this.progress.sectionTestCount)
				this.sectionProgress = Math.floor(this.progress.haveCount / this.progress.sectionTestCount * 100);
				this.simTestProgress = Math.floor(this.progress.simCount / this.progress.mySimCount * 100) ;
				this.videoProgress = Math.floor(this.progress.watchVideo / this.progress.videoCount * 100);
			}
		}
	}
</script>

<style lang="scss">

</style>
