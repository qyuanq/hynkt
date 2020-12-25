<template>
	<view>
		<Question :question="question"></Question>
	</view>
</template>

<script>
	import Question from '../../components/questions/question'
	export default {
		component:{
			Question
		},
		data() {
			return {
				question:null
			};
		},
		onLoad:function(options){
			this.question = options.question;
			console.log('提问详情',this.question)
		}
	}
</script>

<style lang="scss">

</style>
