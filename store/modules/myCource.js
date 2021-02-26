export default{
	namespaced:true,
	state:{
		courceId:0
	},
	mutations:{
		changeId(state,id){
			state.courceId = id;
		}
	},
	getters:{
		
	},
	actions:{
		changeId({commit},id){
			commit("changeId",id);
		}
	}
}