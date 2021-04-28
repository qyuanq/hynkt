<template>
	<view class="container">
		<van-sticky>
			<view class="custom" :style="{height:statusBarHeight + navHeight + 'px',paddingTop:statusBarHeight+'px'}">
				<van-search
					@change="searchChange"
					@search="onSearch"
					@cancel="cancelSearch"
					:show-action="true"
					:value="keyword"
					placeholder="请输入搜索关键词" 
				/>
			</view>
		</van-sticky>
		<view class="product" v-if="products.length">
			<van-sticky :offset-top="statusBarHeight + navHeight">
				<van-dropdown-menu>
				  <van-dropdown-item 
					:title="groupName" 
					id="itemOne"
					:style="{display: categoryShow1 ? 'block' : 'none'}" 
					@close="categoryShow1=false" 
					@open="categoryShow1=true"
				  >
					<van-tree-select
					  :items="items"
					  :main-active-index="mainActiveIndex"
					  @click-nav="onClickNav"
					  @click-item="onClickItem"
					>
						<view class="navContent" slot="content">
							<scroll-view  :scroll-y="true" style="width:100px;height:100%">
							<view v-for="(nav,index) in items[mainActiveIndex].children" 
								:key="nav.id"
								:class="['childNav',childIndex === index ? 'childActive' :'' ]" 
								@tap="onChildNav(index)">
								{{nav.name}}
							</view>
							</scroll-view>
							<scroll-view v-if="childIndex !== -1" class="checkbox" :scroll-y="true">
								<view v-for="item in items[mainActiveIndex]['children'][childIndex]['children']" 
									:key="item.id" class="checkText" 
									@tap="changeCource(item.text,item.id)">
									{{item.text}}
								</view>
							</scroll-view>
						</view>
					</van-tree-select>
				  </van-dropdown-item>
				  <van-dropdown-item  
					:value="typeValue" 
					:options="classType" 
					@change="changeType"
					:style="{display: categoryShow2 ? 'block' : 'none'}"
					@close="categoryShow2=false" 
					@open="categoryShow2=true"/>
				  <!-- <van-dropdown-item 
				  :title="cityName" 
				  id="itemTwo"
				  :style="{display: categoryShow3 ? 'block' : 'none'}"
				  @close="categoryShow3=false,isIndexBar=false" 
				  @open="categoryShow3=true,isIndexBar=true"
				  >
				  </van-dropdown-item> -->
				</van-dropdown-menu>
			</van-sticky>
			<!-- 懒加载 + 分页 + 防抖 -->
			<!-- <VirtualList
				style="height: 360px; overflow-y: auto;"
				:data-key="'name'"
				:data-sources="showProduct"
				:data-component="shopPane"
				:estimate-size="50"
			/> -->
				<shopPane v-for="(item,index) in showProduct" :key="item.name"  :hotCource="item" @tap="onDetail(item.id,item.label)"/>
				<view v-show="load">
					<van-loading size="24px">加载中...</van-loading>
				</view>
				<view v-show="noData">没有数据了</view>
		</view>
		<view class="noRecord" v-else>
			没有记录
		</view>
		<!-- <view class="indexBar">
			<view>
				热门城市
				<view>天津 北京</view>
			</view>
			<van-index-bar :index-list="indexList" :sticky-offset-top="statusBarHeight + navHeight + 50" >
			  <view v-for="item in region" :key="item.idx">
				<van-index-anchor :index="item.idx">{{item.idx}}</van-index-anchor>
				<van-cell :title="city" v-for="city in item.data" :key="city" @tap="changeCity(city)" ></van-cell>
			  </view>
			</van-index-bar>
		</view> -->
	</view>
</template>

<script>
	import shopPane from "@/components/shop-pane/shop-pane.vue"
	import lodash from 'lodash'
	// import VirtualList from 'vue-virtual-scroll-list'
	export default {
		components:{
			shopPane,
			// VirtualList,
		},
		data() {
			return {
				statusBarHeight:0,	//状态栏高度
				navHeight:0,	//导航栏高度
				
				keyword:'',	//输入关键词
				products:[],	//查询商品
				
				categoryShow1:false,	//解决下拉列表 上次下拉无法再次重新选择bug
				categoryShow2:false,
				categoryShow3:false,
				
				groupName:'全部课程',	//第一个查询条件,选中项名字
				items:[],		//专业分类
				mainActiveIndex:0,	//左侧第一列选中项的索引
				childIndex:-1,		//左侧二级选中项
				groupId:-1,	//选中项id
				
				classType:[
					{ text: '全部班型', value: 0 },
					{ text: '单科班', value: 1 },
					{ text: '套餐班', value: 2 },],	//班型选项
				typeValue:0,	//默认班型选项
				
				cityName:'全国地区',		//第三个查询条件
				region:[],		//地区
				isIndexBar:false,	//显示城市索引栏
				indexList:[],	//城市索引列表
				
				scrollTop:0,		//滚动条滚动距离
				curPage:1,			//分页当前页码
				pageSize:20,		//每页显示20个
				showProduct:[],		//展示的商品
				loading:false,			//加载中
				noData:false		//没有数据了
			}
		},
		count:{
			isRecord(){
				return this.products.length
			}
		},
		computed:{
			indexBarClass(){
				return this.isIndexBar ? "display:none" : "display:block"
			}
		},
		methods: {
			//滚动
			// onScroll(event){
			// 	// if(this.scrollTop < event.detail.scrollTop){	//向下滚动
			// 	// 	this.scrollTop = event.detail.scrollTop;
			// 	// 	this.curPage++;
			// 	// 	this.showProduct = this.products.slice(0,this.pageSize * this.curPage);
			// 	// }
				
			// 	console.log(event.detail);
			// },
			// scrolltolower(){
			// 	console.log('到底了加载下一页')
			// 	this.curPage++;
			// 	this.showProduct = this.products.slice(0,this.pageSize * this.curPage);
			// }, 
			// //分页
			
			//向后端拉取数据
			async getData(url){
				let path = url ? url : `${this.development}/api/searchCource?keyword=${this.keyword}`
				const [err,res] = await this.request({
					url:path,
					method:'get'
				})
				if(res.data.code === 0){
					console.log(res.data.data)
					this.products = res.data.data;
					this.showProduct = this.products.slice(0,this.pageSize * this.curPage);
				}
			},
			//搜索内容改变
			async searchChange(e){
				this.keyword = e.detail;
				this.debounceSearch();
			},
			//搜索防抖，停止搜索间隔1s再执行
			debounceSearch:lodash.debounce(async function(){
					if(this.keyword !== ''){
						await this.getData(0);
					}else{
						this.products = [];
					}
			},1000),
			throttleLoad:lodash.throttle(function(){
				if(this.noData) return;	//没有数据直接返回
				console.log('节流上拉加载...');
				this.curPage++;
				let end = Math.min(this.pageSize * this.curPage,this.products.length - 1);
				end === this.products.length - 1 ? this.noData = true : this.noData = false;
				this.showProduct = this.products.slice(0,end);
			},300),
			//点击搜索
			async onSearch(){
				this.debounceSearch();
			},
			// 取消搜索
			cancelSearch(){
				uni.navigateBack({
					delta:1
				})
			},
			
			//跳转商品详情
			onDetail(productId,productType,index){
				//字符串截取
				productType = productType.indexOf('全程') != -1 ? 'meal' : 'single';
				uni.navigateTo({
					url:`./product?id=${productId}&type=${productType}`
				})
			},
			
			//点击左侧一级导航
			onClickNav({ detail = {} }){
				//改变一级选中项索引
				this.mainActiveIndex = detail.index || 0;
				//重置二级选中项索引
				this.childIndex = -1;
			},
			//点击左侧二级导航 
			onChildNav(index){
				//改变二级选中项索引
				this.childIndex = index;
			},
			//选择课程
			changeCource(name,id){
				console.log('选中项id',id);
				//改变第一个查询名字
				this.groupName = name;
				//改变选中项id
				this.groupId = id;
				//关闭菜单
				this.selectComponent('#itemOne').toggle();
				// 查询排序
				const typeName = this.classType[this.typeValue].text; 
				const url = `${this.development}/api/searchCource?keyword=${this.keyword}&classType=${typeName}&classGroup=${this.groupId}`;
				this.getData(url);
			},
			
			//选择类型
			changeType(event){
				this.typeValue = event.detail;
				const typeName = this.classType[this.typeValue].text; 
				const url = `${this.development}/api/searchCource?keyword=${this.keyword}&classType=${typeName}&classGroup=${this.groupId}`
				this.getData(url);
			},
			
			// 选择地区
			// changeCity(city){
			// 	console.log('点击地区了吗',city);
			// 	//改变第三个查询名字
			// 	this.cityName = city;
			// 	//关闭菜单
			// 	this.selectComponent('#itemTwo').toggle();
			// }
		},
		onLoad:async function(){
			const {statusBarHeight} = uni.getSystemInfoSync();
			// 获取状态栏高度
			this.statusBarHeight = statusBarHeight;
			// 获取胶囊按钮信息
			const menuButtonObject  = uni.getMenuButtonBoundingClientRect();
			//导航高度
			this.navHeight = menuButtonObject.height + (menuButtonObject.top - this.statusBarHeight) * 2;
			let citys = ['昆明','鞍山','安阳','北京','赤峰','保定','包头','莆田','承德','宝鸡','澳门','安平','霸州','成都','日照','开封','盘锦','阿克苏','绵阳','河南','牡丹江','重庆','大同','鄂尔多斯','唐山','张家口','汶川','温州','宜宾','济南','邢台','天津','河北','陕西','奉化','蚌埠','满洲里','秦皇岛','山西','长春','内蒙古','辽宁','浙江','安徽','广西','山东','四川','贵州','湖南','宁夏','黑龙江','江苏'];
			let idxs = "*ABCDEFGHJKLMNPQRSTWXYZ".split("");
			let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏妑七呥扨它穵夕丫帀".split("");
			this.indexList = "ABCDEFGHJKLMNPQRSTWXYZ".split("");
			// citys.sort((item1,item2) => {
			// 	return item1.localeCompare(item2,'zh-CN');
			// })
			
			idxs.forEach((item,i) => {
				this.region.push({'idx':item,'data':[]});
				citys.forEach(city => {
					if((!zh[i-1] || zh[i-1].localeCompare(city) <= 0) && city.localeCompare(zh[i]) == -1){
						this.region[i].data.push(city)
					}
				})
				
				if(this.region[i].data.length){
					this.region[i].data.sort((item1,item2) => {
						return item1.localeCompare(item2)
					})
				}
			})
			let regionOne = this.region[0];
			this.region.shift();
			// this.region.push(regionOne);
			console.log(this.region);
			
			const [err,res] = await this.request({
				url:`${this.development}/api/categorys`,
				method:'get'
			})
			if(res.data.code === 0){
				this.items = res.data.data.rows.map(item => {
					let tree = {text:item.name,children:[]};
					if(item.speclallty_models.length){
						item.speclallty_models.forEach((spe,i) => {
							tree.children.push({id:i+1,name:spe.name,children:[]})
							if(spe.classgory_models.length){
								spe.classgory_models.forEach((classgory,j) => {
									tree.children[i].children.push({id:classgory.id,text:classgory.name})
								})
							}
						})
					}
					return tree
				});
			}
			console.log('items',this.items);
		},
		onReachBottom:function(){
			this.loading = true;
			this.throttleLoad();
			this.loading = false;
		}
	}
</script>

<style lang="scss">
// 加载中样式
.van-loading{
	display: flex !important;
	margin: 10px 0;
}
.container{
	.custom{
		z-index:999;
		display:flex;
		width:100%;
		background:#fff;
		box-sizing: border-box;
	}
	.product{
		padding:0 30rpx;
	}
	.van-search{
		width:565rpx;
		padding:4px 12px;
	}
	.van-tree-select__content{
		background-color:#eee !important;
	}
	.navContent{
		height:100%;
		position: relative;
		.childNav{
			padding:12.5px 10px;
		}
		.childActive{
			background:#ddd;
		}
		.checkbox{
			width:300rpx;
			height:100%;
			background:#fff;
			position: absolute;
			right:0;
			top:0;
			.checkText{
				padding:12.5px 10px;
			}
		}
	}
	.indexBar{
		width:100%;
		margin-top:110px;
		background:#fff;
		overflow: hidden;
		position: absolute;
		z-index:1;
		top:0;
		left:0;
	}
	.scroll{
		height:100%;
	}
}
</style>
