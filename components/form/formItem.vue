<template>
	<view class="input-item">
		<label v-if="label">{{label}}</label>
		<slot></slot>
		<!-- <view v-if="errorMessage">{{errorMessage}}</view> -->
	</view>
</template>

<script>
import Schema from 'async-validator'
	export default {
		inject:["form"],
		props:{
			label:{
				type:String,
				default:''
			},
			prop:{
				type:String
			}
		},
		data() {
			return {
				errorMessage:""
			};
		},
		mounted(){
			this.$on('validate',() => {this.validate()})
		},
		methods:{
			// 做校验
			validate(){
				// 获取值
				const value = this.form.model[this.prop];
				// 获取校验规则
				const rules = this.form.rules[this.prop];
				// prop与对应规则对应
				const desc = {[this.prop]:rules};
				
				const schema = new Schema(desc);
				// 返回的是一个promise
				return schema.validate({[this.prop]:value}, errors => {
					if(errors){
						uni.showToast({ title: errors[0].message})
						// this.errorMessage = errors[0].message;
					}else{
						// uni.showToast({ title: '符合'})
						// this.errorMessage = '';
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.input-item{position:relative;}
</style>
