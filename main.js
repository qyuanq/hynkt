import Vue from 'vue'
import App from './App'
import {request,pageLoad} from './utils/request'
import Notice from 'components/general/notice.vue'
// 导入vuex
import store from './store'

Vue.component('notice',Notice);

Vue.config.productionTip = false
// 家里
// Vue.prototype.server = 'http://192.168.1.5:7001/public'
// 公司
Vue.prototype.server = 'http://192.168.3.160:7001/public'
Vue.prototype.development = 'http://192.168.3.160:7001'
// Vue.prototype.development = 'http://192.168.1.5:7001'
// Vue.prototype.development = 'http://192.168.3.7:7001'
Vue.prototype.request = request
Vue.prototype.pageLoad = pageLoad
// 把vuex定义全局组件
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	...App,
	// 挂载
	store
})
app.$mount()
