<template>
	<view>
		<input :value="value" @input="onInput" class="input-section" :placeholder="placeholder" @blur="onBlur">
	</view>
</template>

<script>
	export default {
		props:{
			value:{
				type:String,
				default:''
			},
			type:{
				type:String,
				default:'text'
			},
			placeholder:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			onInput(e){
				// 通知父组件数值变化，（父组件的v-model)
				this.$emit("input",e.target.value);
				// 通知formItem做校验
				//this.$parent.$emit("validate");
				// this.dispatch('formItem','validate','value')
			},
			onBlur(){
				this.$parent.$emit("validate");
			},
			dispatch(componentName, eventName, params) {
				var parent = this.$parent || this.$root;
				var name = parent.$options.name;
			 
				while (parent && (!name || name !== componentName)) {
					parent = parent.$parent;
			 
					if (parent) {
						name = parent.$options.name;
					}
			    }
				if (parent) {
					parent.$emit.apply(parent, [eventName].concat(params));
				}
			  
			}
		}
	}
</script>

<style lang="scss">
.input-section{
	height:35px;
	line-height: 35px;
	border:1px solid #ccc;
	padding: 0 15px;
	border-radius:20px;
	margin-bottom: 15px;
}
</style>
