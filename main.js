import Vue from 'vue'
import App from './App'
import Request from './utils/request'
// 导入vuex
import store from './store'


Vue.config.productionTip = false
Vue.prototype.server = 'http://localhost:7001/public'
Vue.prototype.development = 'http://localhost:7001'
Vue.prototype.request = Request
// 把vuex定义全局组件
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	...App,
	// 挂载
	store
})
app.$mount()
