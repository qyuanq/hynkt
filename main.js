import Vue from 'vue'
import App from './App'
import Request from './utils/request'


Vue.config.productionTip = false
Vue.prototype.server = 'http://localhost:7001/public'
Vue.prototype.development = 'http://localhost:7001'
Vue.prototype.request = Request

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
