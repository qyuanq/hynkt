export default{
	namespaced:true,
	state:{
		praise:0
	},
	mutations:{
		changePraise(state,count){
			state.praise = count;
		}
	},
	getters:{
		
	},
	actions:{
		changePraise({commit},count){
			commit("changePraise",count);
		}
	}
}