import Vue from 'vue';
import Vuex from 'vuex';
import Anquestion from './modules/anQuestion.js'
import myCource from './modules/myCource.js'
import User from './modules/user.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{},
	mutations:{},
	actions:{},
	modules:{
		Anquestion,
		myCource,
		User
	}
})
export default store;