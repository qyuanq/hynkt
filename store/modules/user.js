export default{
	namespaced:true,
	state:{
		user:null
	},
	mutations:{
		changeUser(state,user){
			state.user = user;
		}
	},
	getters:{
		
	},
	actions:{
		changeUser({commit},user){
			commit("changeUser",user);
		}
	}
}