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
	},
	/**
	 * 
	 * @param {Array} 待检查的数组 
	 * @param  {...any} arg 排除的数组
	 * @returns {Array} 新数组
	 * 检查 array 中的元素，若在其他的数组中不存在即返回
	 * 
	 */
	difference: function(array, ...arg) {
		if(!Array.isArray(array)){
			return [];
		}
		var tmp = [].concat(...arg);
		var ret = [];
		for(var i = 0; i < array.length; i++){
			if(!tmp.includes(array[i])){
				ret.push(array[i]);
			}
		}
		return ret;
	},
	/**
	 * 
	 * @param {Array} array 待检查的数组 
	 * @param {Array} arr 排除的数组 
	 * @param {Function} f 映射函数或对象属性
	 * @returns {Array}
	 * 用法基本等同于 difference，不过需对 array 和 arr 每一项调用函数f
	 * 
	 */
	differenceBy: function(array, arr, f) {
		var fn = f;
		if(typeof f == 'string'){
			fn = function(obj){
				return obj[f];
			}
		}
		return array.filter(item => {
			return arr.map(m => fn(m)).every(a => a != fn(item));
		});
	},
	/**
	 * 
	 * @param {Array} array 待检查的数组
	 * @param {Array} arr 排除的数组
	 * @param {Function} comparator 比较器
	 * @returns {Array}
	 * 用法基本等同于 difference，不过需要使用比较器比较每一项
	 * 
	 */
	differenceWith: function(array, arr, comparator) {
		return array.filter(item => {
			return arr.every(a => !comparator(item,a));
		});
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Number} num 
	 * @returns {Array}
	 * 从array头部移除n个元素
	 */
	drop: function(array, num = 1) {
		return array.slice(num);
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Number} num
	 * @returns {Array}
	 * 从array尾部移除n个元素 
	 */
	dropRight: function(array, num = 1) {
		var end = array.length - num;
		if(end < 0){
			end = 0;
		}
		return array.slice(0,end);
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {*} f 迭代函数
	 * @returns {Array}
	 * 从array头部开始，对每一项调用迭代函数f，若为真则跳过，直到为假返回剩余元素
	 */
	dropWhile: function(array, f) {
		var fn;
		if(typeof f == 'function'){
			fn = f;
		}else if(Array.isArray(f)){
			fn = function(arg) {
				if(arg[f[0]] != f[1]){
					return false;
				}
				return true;
			}
		}else if (typeof f == 'string'){
			fn = function(arg) {
				for(var key in arg){
					if(key == f){
						return false;
					}
				}
				return true;
			}
		}else if(typeof f == 'object'){
			fn = function(arg) {
				for(var key in f){
					if(f[key] != arg[key]){
						return false;
					}
				}
				return true;
			}
		}
		var start = 0;
		for(var i = 0; i < array.length; i++){
			if(fn(array[i])){
				start = i+1;
			}else{
				break;
			}
		}
		return array.slice(start);
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {*} f 
	 * 从array尾部开始，对每一项调用迭代函数f，若为真则跳过，直到为假返回剩余元素
	 */
	dropRightWhile: function(array, f){
		var fn;
		if(typeof f == 'function'){
			fn = f;
		}else if(Array.isArray(f)){
			fn = function(arg) {
				if(arg[f[0]] != f[1]){
					return false;
				}
				return true;
			}
		}else if (typeof f == 'string'){
			fn = function(arg) {
				for(var key in arg){
					if(key == f){
						return false;
					}
				}
				return true;
			}
		}else if(typeof f == 'object'){
			fn = function(arg) {
				for(var key in f){
					if(f[key] != arg[key]){
						return false;
					}
				}
				return true;
			}
		}
		var end = array.length;
		for(var i = array.length-1; i >= 0; i--){
			if(fn(array[i])){
				end = i;
			}else{
				break;
			}
		}
		return array.slice(0, end);
	},
	/**
	 * 
	 * @param {Array} array 待填充的数组
	 * @param {number} value 要填充的数值
	 * @param {number} start 开始位置
	 * @param {number} end 结束位置
	 * 将数组中的某几个元素替换成给定数值
	 */
	fill: function(array, value, start = 0, end = array.length){
		for(var i = start; i < end; i++){
			array[i] = value;
		}
	},
	/**
	 * 
	 * @param {Array} array
	 * @returns {Array} res
	 * 降一维 
	 */
	flatten: function(array){
		var res = [];
		for(var i = 0;i < array.length; i++){
			if(typeof array[i] == 'number'){
				res.push(array[i]);
			}else{
				for(var j = 0; j < array[i].length; j++){
					res.push(array[i][j]);
				}
			}
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array
	 * @returns {Array} 
	 * 将数组降为一维数组 
	 */
	flattenDeep: function(array){
		var res = [];
		for(var i = 0; i < array.length; i++){
			if(!Array.isArray(array[i])){
				res.push(array[i]);
			}else{
				var flatArr = this.flattenDeep(array[i]);
				res.push(...flatArr);
			}
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array  降维数组
	 * @param {Number} depth  降维次数
	 * @returns {Array} 
	 * 将数组降维depth次
	 */
	flattenDepth: function(array, depth = 1){
		var res = array;
		for(var i = 0; i < depth; i++){
			res = this.flatten(res);
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array 
	 * @returns {Object} obj
	 * 将给定数组的每一项的第一个元素作为对象属性，第二个元素作为属性的值
	 */
	fromPairs: function(array){
		var obj = {};
		for(var i = 0; i < array.length; i++){
			obj[array[i][0]] = array[i][1];
		}
		return obj;
	},
	/**
	 * 
	 * @param  {...any} arg 
	 * @returns {Array} res
	 * 数组交集
	 */
	intersection: function(...arg){
		var res = [];
		var flag = 0;
		for(var i = 0; i < arg[0].length; i++){
			flag = 0;
			for(var j = 1; j < arg.length; j++){
				for(var k = 0; k < arg[j].length; k++){
					if(arg[0][i] == arg[j][k]){
						flag++;
						break;
					}
				}
				if(flag == arg.length - 1){
					res.push(arg[0][i]);
				}
			}
		}
		return res;
	},
	/**
	 * 
	 * @param  {...any} arg 
	 * @returns {Array} res
	 * 经过迭代函数计算后的数组交集
	 */
	intersectionBy: function(...arg){
		var fn, res = [], flag = 0;
		var res = [];
		var flag = 0;
		var f = arg.pop();
		if(typeof f == 'string'){
			fn = function(obj){
				return obj[f];
			}
		}else if (typeof f == 'function'){
			fn = f;
		}
		for(var i = 0; i < arg[0].length; i++){
			flag = 0;
			for(var j = 1; j < arg.length; j++){
				for(var k = 0; k < arg[j].length; k++){
					if(fn(arg[0][i]) == fn(arg[j][k])){
						flag++;
						break;
					}
				}
				if(flag == arg.length - 1){
					res.push(arg[0][i]);
				}
			}
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array 待检查的数组
	 * @param  {...any} arg 移除的参数
	 * 从array中移除所有给定数值
	 */
	pull: function(array, ...arg){
		for(var i = 0; i < array.length; i++){
			if(arg.indexOf(array[i]) > -1){
				array.splice(i, 1);
				i--;
			}
		}
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Array} values 
	 * @param {*} f 
	 * 删除数组中的与value值经过迭代后相等的项
	 */
	pullAllBy: function(array, values, f){
		var fn ;
		if(typeof f == 'string'){
			fn = function(obj) {
				return obj[f];
			}
		}
		if(typeof f == 'function'){
			fn = f;
		}
		for(var i = 0; i < array.length; i++){
			for(var j = 0; j < values.length; j++){
				if(fn(values[j]) == fn(array[i])){
					array.splice(i, 1);
					i--;
					break;
				}
			}
		}
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Array} values 
	 * @param {Function} comparator 比较函数
	 */
	pullAllWith: function(array, values, comparator){
		return array.filter(item => {
			for(var i = 0; i < values.length; i++){
				if(comparator(item, values[i])){
					return false;
				}
			}
			return true;
		});
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Array} index 移除的索引数组
	 * @returns {Array} 返回被移除的元素
	 * 从array中移除index数组中所包含的索引对应的元素
	 */
	pullAt: function(array, index){
		var res = [];
		var newArr = [];
		for(var i = 0; i < array.length; i++){
			if(index.indexOf(i) > -1){
				res.push(array[i]);
			} else {
				newArr.push(array[i]);
			}
		}
		array.length = [];
		Array.prototype.push.apply(array, newArr);
		return res;
	},
	/**
	 * 
	 * @param {Array} array 待检索的数组
	 * @param {Number} value 待比较的值
	 * @returns {Number} high 下标
	 * 在 array 中搜索 value 应插入的位置以保证数组的有序
	 */
	sortedIndex: function(array, value){
		var low = 0;
		var high = array.length - 1;
		while(low < high){
			var mid = Math.floor((low + high) / 2);
			var midValue = array[mid];
			if(midValue < value){
				low = mid + 1;
			} else {
				high = mid;
			}
		}
		return high;
	},
	/**
	 * 
	 * @param {Array} array 待检索的数组
	 * @param {Number} value 待比较的值
	 * @param {*} f 迭代函数
	 * @returns {Number} high 下标
	 */
	sortedIndexBy: function(array, value, f){
		var fn, low = 0, high = array.length - 1;
		if(typeof f == 'string'){
			fn = function(obj){
				return obj[f];
			}
		} else if (typeof f == 'function'){
			fn = f;
		}
		while(low < high){
			var mid = Math.floor((low + high) / 2);
			var midValue = array[mid];
			if(fn(midValue) < fn(value)){
				low = mid + 1;
			} else {
				high = mid;
			}
		}
		return high;
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Number} value 
	 * @returns {Number} 下标
	 * 同 sortedIndex ，不过是从高位开始检索
	 */
	sortedLastIndex: function(array, value){
		var low = 0;
		var high = array.length - 1;
		while(low < high){
			var mid = Math.floor((low + high) / 2);
			var midValue = array[mid];
			if(midValue <= value){
				low = mid + 1;
			} else {
				high = mid;
			}
		}
		return high;
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Number} value 
	 * @param {*} f 
	 * @returns {Number} 下标
	 * 同 sortedIndexBy ，不过是从高位检索
	 */
	sortedLastIndexBy: function(array, value, f){
		var fn, low = 0, high = array.length - 1;
		if(typeof f == 'string'){
			fn = function(obj){
				return obj[f];
			}
		} else if (typeof f == 'function'){
			fn = f;
		}
		while(low < high){
			var mid = Math.floor((low + high) / 2);
			var midValue = array[mid];
			if(fn(midValue) <= fn(value)){
				low = mid + 1;
			} else {
				high = mid;
			}
		}
		return high;
	}
};
