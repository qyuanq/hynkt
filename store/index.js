import Vue from 'vue';
import Vuex from 'vuex';
import Anquestion from './modules/anQuestion.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{},
	mutations:{},
	actions:{},
	modules:{
		Anquestion
	}
})
export default store;