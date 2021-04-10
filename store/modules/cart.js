import {request} from '@/utils/request'
export default{
	namespaced:true,
	state:{
		cart:[],		//购物车信息
	},
	mutations:{
		// 获取购物车商品
		getCart(state,cart){
			state.cart = cart;
		},
		// 修改数量
		changeCount(state,{cartId,count}){
			const cartItem = state.cart.find(cart => {
				return cart.id === cartId
			})
			// 修改数量
			cartItem.count = count;
			// 这里还要修改单个商品总价，只修改数量，价格不能响应更改
			cartItem.simpleTotal = cartItem.price * cartItem.count;
		},
		// 全选
		checkAll(state,isChecked){
			//isChecked===true 全选   isChecked===false 取消全选
			state.cart.forEach(cart => {
				if(!cart.checked === isChecked){	//排除当时选项与参数相同的情况
					cart.checked = isChecked;
				}
			})
		},
		// 选中某一项
		checkCartOne(state,cartId){
			const cartItem = state.cart.find(cart => {
				return cart.id === cartId
			})
			cartItem.checked = !cartItem.checked;
		},
		// 删除某一项
		deleteCart(state,cartId){
			for(let i=0; i<state.cart.length; i++){
				if(state.cart[i].id === cartId){
					state.cart.splice(i,1);
					break;
				}
			}
		},
		// 选中部分 / 全部删除
		deleteAllCart(state){
			for(let i=0; i<state.cart.length; i++){
				if(state.cart[i].checked){
					state.cart.splice(i,1);
					i--;
				}
			}
		}
	},
	getters:{
		// 所有商品数量
		checkCount(state){
			return state.cart.length;
		},
		// 选中商品数量
		totalCount(state){
			return state.cart.reduce((pre,cart) => {
				if(cart.checked){
					return pre + cart.count
				}
				return pre;
			},0);
		},
		// 计算选中商品总价
		totalPrice(state){
			const sum = state.cart.reduce((pre,cart) => {
				if(cart.checked){
					return pre + cart.simpleTotal
				}
				return pre;
			},0)
			return sum * 100;
		},
		// 返回全部商品总价
		allPrice(state){
			return state.cart.reduce((pre,cart) => {
				return pre + cart.simpleTotal
			},0)
		},
		// 返回商品是否全选 是返回true 否则false
		isSelectAll(state){
			if(!state.cart.length) return false;
			return state.cart.every(cart => {
				return cart.checked
			})
		},
		// 返回选中的商品
		checkCart(state){
			return state.cart.filter(cart => {
				return cart.checked === true;
			})
		}
	},
	actions:{
		//获取购物车
		async getCart({commit}){
			const [err,res] = await request({
				url:`http://localhost:7001/api/myCart`,
				method:'get'
			})
			if(res.data.code === 0){
				if(res.data.data.length > 0){
					let head_picture;
					let name;
					let price;
					let productid;
					let productType;
					const cart = res.data.data.map(item => {
						if(item['cartitem_models.classMealModelId']){
							productType = 'meal',
							productid = item['cartitem_models.classMealModelId'],
							head_picture = item['cartitem_models.class_meal_model.head_picture'],
							name = item['cartitem_models.class_meal_model.name'],
							price = item['cartitem_models.class_meal_model.disc_price']
						}else{
							productType = 'single',
							productid = item['cartitem_models.classSingleModelId'],
							head_picture = item['cartitem_models.class_single_model.head_picture'],
							name = item['cartitem_models.class_single_model.name'],
							price = item['cartitem_models.class_single_model.disc_price']
						}
						return {
							id:item['cartitem_models.id'],
							count:item['cartitem_models.count'],
							productType,	//商品类型 单科/套餐
							productid,		//商品id
							head_picture,	//商品展示图
							name,			//商品名字
							price,			//商品单价
							simpleTotal: price * item['cartitem_models.count'],	//商品总价
							checked:false	//是否选中
						}
					})
					commit('getCart',cart);
				}else{
					commit('getCart',[]);
				}
				
				
			}
		},
		//修改数量
		changeCount({commit},{cartId,count}){
			commit('changeCount',{cartId,count});
		},
		// 全选
		checkAll({commit},isChecked){
			commit('checkAll',isChecked)
		},
		// 选中某一项
		checkCartOne({commit},cartId){
			commit('checkCartOne',cartId)
		},
		//删除某一项
		async deleteCart({commit},cartId){
			const [err,res] = await request({
				url:`http://localhost:7001/api/myCart/${cartId}`,
				method:'delete'
			})
			if(res.data.code === 0){
				commit('deleteCart',cartId)
			}
		},
		
		// 删除选中商品或清空购物车
		async deleteAllCart({commit,getters}){
			let URL;
			if(getters.isSelectAll){
				URL = "http://localhost:7001/api/myCartAll?isAll='true'"
			}else{
				let cartIds = [];
				getters.checkCart.forEach(item => {
					cartIds.push(item.id);
				})
				console.log(cartIds)
				URL = `http://localhost:7001/api/myCartAll?cartIds=${JSON.stringify(cartIds)}`
			}
			const [err,res] = await request({
				url:URL,
				method:'delete'
			})
			if(res.data.code === 0){
				commit('deleteAllCart')
				return true;
			}else{
				return false;
			}
		}
	}
}