let util = {
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
	}
};
