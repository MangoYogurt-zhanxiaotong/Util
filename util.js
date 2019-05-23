let util = {
	/**
	 * 
	 * @param {Array} array 源数组 
	 * @param {Number} size 拆分后每个数组的长度 
	 * @returns {Array} 返回新数组
	 * 将 array 拆分成长度为 size 的数组，纯函数
	 * 
	 */
	chunk: function(array, size = 1) {
		size = Math.max(size,0);
		let length = array == null ? 0 : array.length;
		if(!length || size < 1){
			return [];
		}
		let result = []; // 存放拆分结果
		let rl = Math.ceil(length / size); // 向上舍入
		for(let i = 0; i < rl; i++){
			result[i] = array.slice(size*i,size*i+size);
		}
		return result;
	},
	/**
	 * 
	 * @param {Array} 
	 * @returns {Array} 
	 * 删除 array 中的false, null, 0, "", undefined, NaN，纯函数
	 * 
	 */
	compact: function(array) {
		if(!Array.isArray(array)){
			return [];
		}
		// 或 filter
		return array.filter(item => {
			return item;
		});
	},
	/**
	 * 
	 * @param  {...any} 传入的参数包括 2,[3],[[4]] 
	 * @returns {Array} 新数组
	 * 
	 */
	concat: function(...arg) {
		return [].concat(...arg);
	}
};
