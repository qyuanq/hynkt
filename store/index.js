import Vue from 'vue';
import Vuex from 'vuex';
import Anquestion from './modules/anQuestion.js'
import myCource from './modules/myCource.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{},
	mutations:{},
	actions:{},
	modules:{
		Anquestion,
		myCource
	}
})
export default store;