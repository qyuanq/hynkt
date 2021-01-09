//转化时间
export const renderTime = function(date) {
  let dateee = new Date(date).toJSON();
  // 北京处于东八区，所以要加8个小时
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
   // return new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}