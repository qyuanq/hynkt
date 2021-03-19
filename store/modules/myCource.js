export default{
	namespaced:true,
	state:{
		courceId:0,
		sectionId:0,	//章节id
		sectionName:'',	//章节名字
		sectionScore:0,	//章节练习 / 模拟考试 分数
		sectionRecord:[] ,//章节练习记录
		simulationTest:{}	//当前模拟考试信息
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
		},
		changeRecord(state,record){
			state.sectionRecord = record;
		},
		changeSimulationTest(state,testInfo){
			state.simulationTest = testInfo;
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
		},
		changeRecord({commit},record){
			commit('changeRecord',record);
		},
		changeSimulationTest({commit},testInfo){
			commit('changeSimulationTest',testInfo);
		}
	}
}