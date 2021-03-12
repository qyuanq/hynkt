export default{
	namespaced:true,
	state:{
		courceId:0,
		sectionId:0,
		sectionName:'',
		sectionScore:0
	},
	mutations:{
		changeId(state,id){
			state.courceId = id;
		},
		changeSectionScore(state,score){
			state.sectionScore = score;
		},
		changeSectinInfo(state,info){
			state.sectionId = info.id;
			state.sectionName = info.name;
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
		},
		changeSectinInfo({commit},info){
			commit('changeSectinInfo',info);
		}
	}
}