export default (url,pageSize,comments) => {
			this.request({
				url:url,
				method:'get',
				success:(res) => {
					// 格式化后端返回的数据
					let list = res.data.data.result.map(item => {
						item.date = renderTime(item.date)
						return item;
					});
					// 请求初始数据
					if(pageSize === 1){
						comments = list;
					}else{
						// concat()合并两个数组不会改变原数组，赋值到comments
						comments = comments.concat(list); 
					}
					return comments;
				}
			})
		}