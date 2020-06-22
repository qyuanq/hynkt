<template>
	<view class="form1">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		provide(){
			return {form:this}
			},
		props:{
			model:{
				type:Object,
				required:true
			},
			rules:{
				type:Object,
				required:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 全局校验
			validate(cb){
				const tasks = this.$children.filter(item => item.prop).map(item =>item.validate());
				// 所有任务都通过才算校验成功
				Promise.all(tasks).then(() => cb(true)).catch(() => cb(false));
			}
		}
	}
</script>

<style lang="scss">
.form1{width:100%;}
</style>
