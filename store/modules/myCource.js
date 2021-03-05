export default{
	namespaced:true,
	state:{
		courceId:0,
		sectionScore:0
	},
	mutations:{
		changeId(state,id){
			state.courceId = id;
		},
		changeSectionScore(state,score){
			state.sectionScore = score;
		}
	},
	getters:{
		
	},
	actions:{
		changeId({commit},id){
			commit("changeId",id);
		},
		changeSectionScore({commit},score){
			commit("changeSectionScore",score);
		}
	}
}