<template>
	<view class="container">
		<view class="tea-info">
			<view class="bg">
				<image class="tea-bg" :src="development + '/public/static/img/teacher/teachersbgc.png '" />
				<view class="head-icon">
					<image :src="development + teacherInfo.headIcon" class="image" />
				</view>
				<view class="tea-name">{{teacherInfo.name}}</view>
				<view class="tea-desc">{{descption}}<text class="showbtn" v-if="teacherInfo.desc.length > 100" @tap="showFoc(ident)">{{btnname}}</text></view>
			</view>
			
		</view>
		<view class="tea-cource">
			<view class="title">主要课程</view>
			<view class="cource-info" v-for="item in teacherInfo.class_single_models" :key="item.id">
				<view class="cource-pic">
					<image :src="development + item.head_picture" class="picture">
				</view>
				<view class="cource-text">
					<view class="cource-title">{{item.name}}</view>
					<view class="cource-code">课程代码:{{item.classCode}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				development:this.development,
				teacherInfo:null,
				// 教师简介
				descption:'',
				// 收起的内容
				descNone:'',
				btnname:'展开全部',
				// 标识
				ident:false
			};
		},
		methods:{
			showFoc(ident){
				console.log(ident);
				// 如果标识为真，说明展示全部内容
				if(ident){
					this.btnname = '全部展开';
					this.descption = this.descNone;
				}else{
					this.btnname = '收起';
					this.descption = this.teacherInfo.desc;
				}
				this.ident = !this.ident;
			}
		},
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			//console.log('teaidttt:',option.teacherPid); //打印出上个页面传递的参数。
			await this.request({
				url:this.development + `/teacher/${option.teacherPid}`,
				method:'get',
				success:(res) => {
					this.teacherInfo = res.data.data;
					// 教师简介字数限制
					if(this.teacherInfo.desc.length > 100){
						this.descNone = this.teacherInfo.desc.slice(0,100)+'...';
						this.descption = this.descNone;
					}else{
						this.descption = this.teacherInfo.desc;
					}
				}
			})
		}
	}
</script>

<style lang="scss">
page{background:#F6F7F8;}
.container{
	.tea-info{
		.bg{
			width:100%;
			text-align: center;
			position:relative;
			.tea-bg{
				width:100%;
				height:274rpx;
			}
			.head-icon{
				width:180rpx;
				height:180rpx;
				position: absolute;
				left:50%;
				top:150rpx;
				transform: translateX(-50%);
				.image{
					max-width:100%;
					max-height:100%;
					border-radius:50%;
				}
			}
			.tea-name{
				margin-top:60rpx;
			}
			.tea-desc{
				text-align: left;
				font-size:28rpx;
				color:rgb(120,120,120);
				text-indent: 2em;
				margin-top:20rpx;
				padding:0 20rpx 0 20rpx;
				box-sizing:border-box;
				.showbtn{
					color:blue;
					white-space: normal;
				}
			}
		}
		
	}
	.tea-cource{
		.title{padding:20rpx;}
		margin-top:20rpx;
		.cource-info{
			width:100%;
			height:180rpx;
			padding:30rpx 20rpx;
			box-sizing:border-box;
			display:flex;
			justify-content: flex-start;
			.cource-pic{
				width:200rpx;
				height:120rpx;
				border-radius: 20rpx;
				.picture{
					max-width:100%;
					max-height:100%;
				}
			}
			.cource-text{
				margin-left:25rpx;
				.cource-code{
					margin-top:30rpx;
					color:#888;
				}
			}
		}
	}
	
}
</style>
