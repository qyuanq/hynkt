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

export default request