//1.请求地址 2.请求方法 3.post请求数据 4.回调函数
const request = (options) => {
	// 获取token
	const token = uni.getStorageSync('token');
	if(token){
		let header = {
			"Authorization":'Bearer ' + token,
			'Content-Type' : 'application/json'
		}
	}
	
	//判断header是否加token
	if(options.url.indexOf('/api') >= 0){
		if(token){
			options.header = {
				"Authorization":'Bearer ' + token,
				'Content-Type' : 'application/json'
			}
			// options.url = 'http://localhost:7001' + url,
			console.log('url2:',options.url)
			return uni.request(options)
		}else{
			uni.navigateTo({
				url:'/pages/public/login'
			})
		}
	}else{
		return uni.request(options)
	}
}

// 分页请求
import {renderTime} from '../static/js/common.js'
const pageLoad = async(url,pageSize,comments) => {
	const [error, res] = await request({
		url:url,
		method:'get'
	})
	console.log('分页res',res);
	if(res.data.code === 0){
		// 格式化后端返回的数据
		let list = res.data.data.result;
		// 请求初始数据
		if(pageSize === 1){
			comments = list;
			let countPage = res.data.data.countPage;
			return {comments,countPage}
		}else{
			// concat()合并两个数组不会改变原数组，赋值到comments
			comments = comments.concat(list); 
			return comments;
		}
	}
}
export {request,pageLoad}