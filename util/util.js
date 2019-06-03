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
	},
	/**
	 * 
	 * @param {Array} array 
	 * 对排序好的数组进行去重
	 */
	sortedUniq: function(array){
		return Array.from(new Set(array.sort((a,b) => {return a - b;})));
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Function} fn 
	 * array 的每一项经过迭代函数迭代后去重
	 */
	sortedUniqBy: function(array,fn){
		var res = [];
		var tmpArr = [];
		var computed;
		for(var i = 0; i < array.length; i++){
			computed = fn(array[i]);
			if(!tmpArr.includes(computed)){
				res.push(array[i]);
				tmpArr.push(computed);
			}
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array 
	 * 移除数组第一项
	 */
	tail: function(array){
		return array.slice(1);
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Number} n
	 * 选取数组前n项 
	 */
	take: function(array, n = 1){
		return array.slice(0,n);
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Number} n 
	 * 选取数组后n项
	 */
	takeRight: function(array, n = 1){
		var start = array.length - n < 0 ? 0 : array.length - n;
		return array.slice(start);
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {*} predicate 
	 * 从头开始选取元素，直到迭代函数判断为假
	 */
	takeWhile: function(array, predicate){
		var fn;
		if(typeof predicate == 'function'){
			fn = predicate;
		} else if (Array.isArray(predicate)){
			fn = function(obj){
				return obj[predicate[0]] == predicate[1];
			}
		} else if (typeof predicate == 'string'){
			fn = function(obj){
				return obj[predicate];
			}
		} else {
			fn = function(obj){
				for(var key in predicate){
					if(predicate[key] !== obj[key]){
						return false;
					}
				}
				return true;
			}
		}
		var i = 0;
		while (i < array.length){
			if(!fn(array[i])){
				return array.slice(0,i);
			}
			i++;
		}
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {*} predicate 
	 * 从尾开始选取元素，直到迭代函数判断为假
	 */
	takeRightWhile: function(array, predicate){
		var fn;
		if(typeof predicate == 'function'){
			fn = predicate;
		} else if (Array.isArray(predicate)){
			fn = function(obj){
				return obj[predicate[0]] == predicate[1];
			}
		} else if (typeof predicate == 'string'){
			fn = function(obj){
				return obj[predicate];
			}
		} else {
			fn = function(obj){
				for(var key in predicate){
					if(predicate[key] !== obj[key]){
						return false;
					}
				}
				return true;
			}
		}
		var i = array.length-1;
		while (i > -1){
			if(!fn(array[i])){
				return array.slice(i + 1);
			}
			i--;
		}
	},
	/**
	 * 
	 * @param  {...any} arg 
	 * 若干数组中的交集
	 */
	union: function(...arg){
		return Array.from(new Set([].concat(this.flatten(arg))));
	},
	/**
	 * 
	 * @param  {...any} arg 
	 * 若干数组中的元素经过迭代后取交集
	 */
	unionBy: function(...arg){
		var fn, f= arg.pop();
		if(typeof f == 'string'){
			fn = function(obj){
				return obj[f];
			}
		} else {
			fn = f;
		}
		var concatArr = [].concat(this.flatten(arg));
		var tmpArr = [], res = [];
		concatArr.forEach(item => {
			var computed = fn(item);
			if(!tmpArr.includes(computed)){
				tmpArr.push(computed);
				res.push(item);
			}
		});
		return res;
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param  {...any} values 
	 * 去除array中与values相等的元素
	 */
	without: function(array,...values){
		return array.filter(item => {
			return values.indexOf(item) < 0;
		});
	},
	/**
	 * 
	 * @param  {...any} arrays 
	 * 并集 - 交集
	 */
	xor: function(...arrays){
		return this.without([].concat(this.flatten(arrays)), ...this.intersection(...arrays));
	},
	/**
	 * 
	 * @param  {...any} arrays 
	 * @returns {Array} res
	 * 新数组的第一项由所有给定数组的第一项组成，以此类推
	 */
	zip: function(...arrays){
		var start = arrays.shift();
		var res = [];
		for(var i = 0; i < start.length; i++){
			var tmp = [];
			tmp.push(start[i]);
			for(var j = 0; j < arrays.length; j++){
				tmp.push(arrays[j][i]);
			}
			res.push(tmp);
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} props 
	 * @param {Array} values 
	 * @returns {Object}
	 * 将两个数组的值分别生成对象的 key 和 value
	 */
	zipObject: function(props,values){
		var object = {};
		for(var i = 0; i < props.length; i++){
			object[props[i]] = values[i];
		}
		return object;
	},
	/**
	 * 
	 * @param  {...any} args 
	 * @returns {Array}
	 * 同 zip，返回对新数组的每一项调用迭代函数后的结果
	 */
	zipWith: function(...args){
		var fn = args.pop();
		var start = args.shift();
		var res = [];
		for(var i = 0; i < start.length; i++){
			var tmp = [];
			tmp.push(start[i]);
			for(var j = 0; j < args.length; j++){
				tmp.push(args[j][i]);
			}
			res.push(fn(...tmp));
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array
	 * 将数组分解 
	 */
	unzip: function(array){
		var res = [], tmp = [];
		for(var j = 0; j < array[0].length; j++){
			tmp = [];
			tmp.push(array[0][j]);
			for(var i = 1; i < array.length; i++){
				tmp.push(array[i][j]);
			}
			res.push(tmp);
		}
		return res;
	},
	/**
	 * 
	 * @param {Array} array 
	 * @param {Function} fn
	 * 先将数组分解，再将分解后的数组每一项调用迭代函数 
	 */
	unzipWith: function(array, fn){
		var ret = this.unzip(array);
		return ret.map(item => {
			return fn(...item);
		});
	},
	/**
	 * 
	 * @param {Array|Object} collection 
	 * @param {String|Object} iteratee
	 * @returns {Object}
	 *  返回一个对象，key为迭代器迭代后的值，value为匹配的数量
	 */
	countBy: function(collection, iteratee){
		var obj = {}, fn;
		if(typeof iteratee == 'string'){
			fn = function(o){
				return o[iteratee];
			}
		}else if (typeof iteratee == 'function'){
			fn = iteratee;
		}
		if(Array.isArray(collection)){
			for(var i of collection){
				var value = fn(i);
				if(obj[value]){
					obj[value] = obj[value] + 1;
				}else{
					obj[value] = 1;
				}
			}
		}else if (typeof collection == 'object'){
			for(var i in collection){
				var value = collection.hasOwnProperty(i) && fn(i);
				if(obj[value]){
					obj[value] = obj[value] + 1;
				}else{
					obj[value] = 1;
				}
			}
		}
		return obj;
	},
	/**
	 * 
	 * @param {Array|Object} collection 
	 * @param {*} predicate
	 * @returns {Boolean}
	 * 若colleciton每一项返回true，则返回true，否则返回false 
	 */
	every: function(collection, predicate){
		var fn;
		if(typeof predicate == 'string'){
			fn = function(obj){
				return obj[predicate];
			}
		} else if (Array.isArray(predicate)){
			fn = function(obj){
				return obj[predicate[0]] == predicate[1];
			}
		} else if (typeof predicate == 'object'){
			fn = function(obj){
				for(var i in predicate){
					if(predicate[i] !== obj[i]){
						return false;
					}
				}
				return true;
			}
		} else {
			fn = predicate;
		}
		return collection.every(item => {
			return fn(item);
		});
	},
	filter: function(collection, predicate){
		var fn;
		if(typeof predicate == 'string'){
			fn = function(obj){
				return obj[predicate];
			}
		} else if (Array.isArray(predicate)){
			fn = function(obj){
				return obj[predicate[0]] == predicate[1];
			}
		} else if (typeof predicate == 'object'){
			fn = function(obj){
				for(var i in predicate){
					if(predicate[i] !== obj[i]){
						return false;
					}
				}
				return true;
			}
		} else {
			fn = predicate;
		}
		return collection.filter(item => {
			return fn(item);
		});
	},
	/**
	 * 
	 * @param {Array|Object} collection 
	 * @param {*} iteratee 
	 * @returns {Array}
	 * 对collecitonm每一项调用迭代函数，返回由结果组成的新数组
	 */
	map: function(collection, iteratee){
		var fn;
		if(typeof iteratee == 'string'){
			fn = function(obj){
				return obj[iteratee];
			}
		}else if (typeof iteratee == 'function'){
			fn = iteratee;
		}
		var res = [];
		if(Array.isArray(collection)){
			for(var i of collection){
				res.push(fn(i));
			}
		}else if (typeof collection == 'object'){
			for(var i in collection){
				res.push(fn(collection[i]));
			}
		}
		return res;
	},
	/**
	 * 
	 * @param {Array|Object} collection 
	 * @param {*} predicate
	 * @returns {Array} 
	 * 对colleciton每一项调用迭代函数，若返回结果为true放进res[0]，若返回结果为false放进res[1]
	 */
	partition: function(collection, predicate){
		var fn, res = [[], []];
		if(typeof predicate == 'string'){
			fn = function(obj){
				return obj[predicate];
			}
		} else if (Array.isArray(predicate)){
			fn = function(obj){
				return obj[predicate[0]] == predicate[1];
			}
		} else if (typeof predicate == 'function'){
			fn = predicate;
		} else {
			fn = function(obj){
				for(var i in predicate){
					if(predicate[i] != obj[i]){
						return false;
					}
				}
				return true;
			}
		}
		collection.forEach(item => {
			if(fn(item)){
				res[0].push(item);
			}else{
				res[1].push(item);
			}
		});
		return res;
	},
	/**
	 * 
	 * @param {*} collection 
	 * 随机返回一个元素
	 */
	sample: function(collection, n=1){
		var res = []
		for(var i = 0; i < n; i++){
			res.push(collection[Math.floor(Math.random()*collection.length)]); 
			// lower + Math.floor(Math.random()*(higher-lower+1))
		}
		return res;
	},
	/**
	 * 
	 * @param {*} collection 
	 * 打乱顺序
	 */
	shuffle: function(collection){
		var size = collection.length;
		for(var i = 0; i < size; i++){
			var rand = Math.floor(Math.random()*size);
			var tmp = collection[rand];
			collection[rand] = collection[i];
			collection[i] = tmp;
		}
		return collection;
	},
	/**
	 * 
	 * @param {Number} n 
	 * @param {Function} func 
	 * @returns {Function}
	 * 当返回函数被调用n次之后，func才会被调用
	 */
	after: function(n, func){
		n = parseInt(n);
		return function(){
			if(--n < 1){
				func.apply(this, arguments);
			}
		}
	},
	/**
	 * 
	 * @param {Number} n 
	 * @param {Function} func
	 * @returns {Function} 
	 * 返回函数调用次数<n之前，都会调用func
	 */
	before: function(n, func){
		var result;
		n = parseInt(n);
		return function(){
			if(--n > 0){
				result = func.apply(this, arguments);
			}
			if (n <= 1){
				func = undefined;
			}
			return result;
		}
	},
	/**
	 * @param {Function} fn
	 * @param {*} args
	 * 柯里化：将多参的函数变换成一个接受单一参数（第一个）的函数，并且返回接受余下的参数而且返回结果的新函数
	 * var abc = function(a, b, c) {
	 *    return [a, b, c];
	 * };
	 *	var curried = _.curry(abc);
	 *	curried(1)(2)(3); // => [1, 2, 3]
	 */
	curry: function(fn, args){
		var args = args || [];
		var len = fn.length;
		var _this = this;
		return function(){
			var _arg = Array.from(arguments);
			Array.prototype.push.apply(args, _arg);
			if(args.length < len){
				return _this.curry(fn, args);
			}
			return fn.apply(this, args);
		}
	},
	/**
	 * 
	 * @param {Function} fn 
	 * @param {*} args 
	 * 同 curry，参数倒序输入
	 * curried(1)(2)(3); // => [3, 2, 1]
	 */
	curryRight: function(fn, args){
		var args = args || [];
		var len = fn.length;
		var _this = this;
		return function(){
			var _arg = Array.from(arguments);
			Array.prototype.unshift.apply(args, _arg);
			if(args.length < len){
				return _this.curryRight(fn, args);
			}
			return fn.apply(this, args);
		}
	},
	/**
	 * 
	 * @param {Function} func 
	 * @param  {...any} args 
	 * 偏函数，会先固定几个参数，再一次性接收剩下的参数
	 * 柯里化：根据传入参数不停地返回函数，直到参数个数满足柯里化前函数的参数个数
	 */
	partial: function(func, ...args) {
		let palceholderNum = 0;
		return (...args2) => {
			args2.forEach(arg => {
				let index = args.indexOf("_");
				if(index < 0) return;
				args[index] = arg;
				palceholderNum++;
			});
			if(palceholderNum < args2.length) {
				args2 = args2.slice(palceholderNum, args2.length);
			}
			return func.apply(this, [...args,...args2]);
		}
	},
	/**
	 * 
	 * @param {Function} fn 
	 * @param {Number} wait
	 * 节流，在指定时间内，fn只执行一次，目的是降低函数执行频率
	 * var fn = util.throttle(function(){console.log('scroll')},1000); 
	 * window.onscroll = fn
	 */
	throttle: function(fn, wait){
		var lastTime = 0;
		return function(...arg){
			var currentTime = Date.now();
			if(currentTime - lastTime > wait){
				fn(...arg);
				lastTime = currentTime;
			}
		}
	},
	/**
	 * 
	 * @param {Function} fn 
	 * @param {Number} wait 
	 * 防抖，如果一个函数持续触发，那么在他最后一次调用经过指定时间后执行一次
	 * var fn = util.debounce(function(){console.log('scroll')},1000); 
	 * window.onscroll = fn
	 */
	debounce: function(fn, wait){
		var timer = null;
		return function(){
			if(timer){
				clearTimeout(timer);
			}
			timer = setTimeout(fn, wait);
		}
	},
	/**
	 * 
	 * @param {Function} func 
	 * @param {Array} transforms 
	 * @returns {Function}
	 * 返回一个新函数，对每一个参数按序调用 transforms 进行转换，最后调用func并返回结果
	 */
	overArgs: function(func, transforms){
		if(!Array.isArray(transforms)){
			return false;
		}
		return function(...arg){
			for(var i = 0; i < arg.length; i++){
				arg[i] = transforms[i].call(this, arg[i]);
			}
			return func.apply(this, arg);
		}
	},
	/**
	 * 
	 * @param {Function} func 
	 * @param {Array} indexes 索引
	 * var rearged = _.rearg(function(a, b, c) {
	 *	 return [a, b, c];
	 * }, [2, 0, 1]);
	 *	
	 *	rearged('b', 'c', 'a');
	 * 将参数按照给定的索引顺序排列，最后调用func返回结果
	 */
	rearg: function(func, indexes){
		return function(...arg){
			var argArr = [];
			for(var i = 0; i < indexes.length; i++){
				argArr[i] = arg[indexes[i]];
			}
			return func.apply(this, argArr);
		}
	},
	/**
	 * 如果不是数组，封装成一个数组，如果是，原样返回
	 */
	castArray: function(){
		if(!arguments.length){
			return [];
		}
		var value = arguments[0];
		return Array.isArray(value) ? value : [value];
	},
	/**
	 * 
	 * @param {*} value 
	 * @param {*} other 
	 * 判断是否相等
	 * NaN === NaN false
	 * NaN !== NaN true
	 */
	eq: function(value, other){
		return value === other || (value !== value && other !== other);
	},
	/**
	 * 
	 * @param {*} arg
	 * 判断参数是不是数组 
	 */
	isArray: function(arg){
		if(Array.isArray(arg)){
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 
	 * @param {*} arg
	 * 判断参数是不是布尔类型 
	 */
	isBoolean: function(arg){
		if(typeof arg == 'boolean'){
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 
	 * @param {*} arg
	 * 判断参数是不是日期类型 
	 */
	isDate: function(arg){
		if(arg instanceof Date){
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 
	 * @param {*} arg
	 * 判断参数是不是DOM节点 
	 */
	isElement: function(arg){
		if (arg.nodeType != undefined && arg.nodeType == 1) {
			return true
		} else {
			return false
		}
	},
	/**
	 * 
	 * @param {*} arg
	 * 判断参数是不是数值
	 */
	isNumber: function(arg){
		if(typeof arg == 'number'){
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 
	 * @param {*} value 
	 * 判断参数是不是有限值
	 */
	isFinite: function(value) {
		return typeof value == 'number' && isFinite(value);
	},
	/**
	 * 比较两个对象中的属性值是否相等
	 * @param  {Object}  obj   
	 * @param  {Object}      
	 */
	isMatch: function(obj, source) {
		for (var key in source) {
			if (obj[key] != source[key]) {
				return false
			}
		}
		return true
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Array} paths 
	 * 根据路径找出元素
	 * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
	 *	_.at(object, ['a[0].b.c', 'a[1]']);
	 *	// => [3, 4]
	 */
	at: function(object, paths){
		var res = [];
		for(var i = 0; i < paths.length; i++){
			var path = paths[i].split('');
			var arr = [];
			for(var j = 0; j < path.length; j++){
				if(
					path[j] != '[' && 
					path[j] != ']' &&
					path[j] != '.'
				){
					arr.push(path[j]);
				}
			}
			var target = object;
			for(var k = 0; k < arr.length; k++){
				target = target[arr[k]];
			}
			res.push(target);
		}
		return res;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param  {...any} sources 
	 * 按照从左到右的顺序将source中的属性赋给目标对象，若属性存在则跳过
	 */
	defaults: function(object, ...sources){
		for(var i = 0; i < sources.length; i++){
			for(var key in sources[i]){
				if(!object[key]){
					object[key] = sources[i][key];
				}
			}
		}
		return object;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {*} predicate 
	 * 筛选出符合条件的第一个元素的键
	 */
	findKey: function(object, predicate){
		var keyArr = [], fn;
		if(typeof predicate == 'string'){
			fn = function(obj){
				return obj[predicate];
			}
		} else if (typeof predicate == 'function'){
			fn = predicate;
		} else if (Array.isArray(predicate)){
			fn = function(obj){
				return obj[predicate[0]] == predicate[1];
			}
		} else {
			fn = function(obj){
				for(var key in predicate){
					if(obj[key] !== predicate[key]){
						return false;
					}
				}
				return true;
			}
		}
		for(var key in object){
			if(fn(object[key])){
				keyArr.push(key);
				break;
			}
		}
		return keyArr;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Function} iteratee
	 * 为object的每个属性调用 iteratee，若iteratee调用后返回flase，迭代过程可提前结束
	 */
	forIn: function(object, iteratee){
		for(var key in object){
			// if(object.hasOwnProperty(key))
			if(iteratee(object[key], key, object) === false){
				break;
			}
		}
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Function} iteratee
	 *  遍历 object 自己的属性，并为每一个属性调用迭代函数
	 */
	forOwn: function(object, iteratee){
		for(var key in object){
			if(object.hasOwnProperty(key)){
				iteratee(object[key], key, object);
			}
		}
	},
	/**
	 * 
	 * @param {Object} object
	 * 返回object上的所有非原型里面的属性 
	 */
	functions: function(object){
		var res = [];
		for(var key in object){
			if(object.hasOwnProperty(key)){
				res.push(key);
			}
		}
		return res;
	},
	/**
	 * 
	 * @param {Object} object
	 * 将对象的键和值翻转，若存在则覆盖 
	 */
	invert: function(object){
		var res = {};
		for(var key in object){
			res[object[key]] = key;
		}
		return res;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {String} paths 
	 * @param  {...any} args 
	 * 在给定的对象路径上调用方法
	 */
	invoke: function(object, paths, ...args){
		var func = paths.slice(paths.lastIndexOf('.')+1);
		var path = paths.slice(0, paths.lastIndexOf('.')).split('');
		var arr = [];
		for(var j = 0; j < path.length; j++){
			if(
				path[j] != '[' && 
				path[j] != ']' &&
				path[j] != '.'
			){
				arr.push(path[j]);
			}
		}
		var target = object;
		for(var k = 0; k < arr.length; k++){
			target = target[arr[k]];
		}
		return target[func](...args);

	},
	/**
	 * @param  {Object} obj
	 */
	keys: function(obj) {
		var arr = []
		for (var key in obj) {
			if(obj.hasOwnProperty(key)){
				arr.push(key);
			}
		}
		return arr
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Function} iteratee
	 * 返回一个新对象，其键是调用 iteratee 产生的结果，值是object中的值
	 */
	mapKeys: function(object, iteratee){
		var obj = {};
		for(var key in object){
			obj[iteratee(object[key], key, object)] = object[key];
		}
		return obj;
	},
	/**
	 * @param  {Object} obj
	 */
	values: function(obj){
		var arr = []
		for (var key in obj) {
			if(obj.hasOwnProperty(key)){
				arr.push(obj[key]);
			}
		}
		return arr
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Function} iteratee
	 * 返回一个新对象，值是调用 iteratee 产生的结果，键是object中的键
	 */
	mapValues: function(object, iteratee){
		var obj = {};
		for(var key in object){
			obj[key] = iteratee(object[key], key, object);
		}
		return obj;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Array} paths 要省略的属性
	 * 
	 */
	omit: function(object, paths){
		var obj = {};
		for(var key in object){
			if(paths.indexOf(key) == -1){
				obj[key] = object[key];
			}
		}
		return obj;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Array} paths
	 * omit 的对立面 
	 */
	pick: function(object, paths){
		var obj = {};
		for(var key in object){
			if(paths.indexOf(key) > -1){
				obj[key] = object[key];
			}
		}
		return obj;
	},
	/**
	 * 
	 * @param {Object} object 
	 * 返回对象的键值对
	 */
	toPairs: function(object){
		var res = [];
		for(var key in object){
			if(object.hasOwnProperty(key)){
				var a = [];
				a.push(key, object[key]);
				res.push(a);
			}
		}
		return res;
	},
	parseJson: function(){

	},
	/**
	 * 比较两个对象时否相等
	 * @param {Object} a 
	 * @param {Object} b
	 */
	isEqual: function(a, b) {
		if (typeof a != typeof b) {
			return false
		}
		if (a != a && b != b) {
			return true
		}
		if (a === b) {
			return true
		}
		if (a !== b && typeof a === 'number' && typeof b === 'number') {
			return false
		}
		var arr = []
		for (var key in a) {
			arr.push(key)
		}
		for (var key in b) {
			if (arr.indexOf(key) < 0) {
				arr.push(key)
			}
		}
		for (key of arr) {
			if (!WuFang.isEqual(a[key], b[key])) {
				return false
			}
		}
		return true
	},
	/**
	 * 
	 * @param {*} char 
	 * 检验一个字符是不是字母
	 * 
	 */
	letter: function(char) {
		if(char === undefined){
			return false;
		}
		if((char.charCodeAt(0) >= 65 && char.charCodeAt(0)<= 90) || (char.charCodeAt(0) >= 97 && char.charCodeAt(0)<= 122)){
			return true;
		}
		return false;
	},
	/**
	 * 
	 * @param {String} string
	 * 将字符串转换为驼峰式 
	 */
	camelCase: function(string = ''){
		if(string == ''){
			return '';
		}
		var str  = '';
		for(var i = 0; i < string.length; i++){
			if(this.letter(string[i])){
				if(str.length == 0 || this.letter(string[i-1])){
					str += string[i].toLowerCase();
				} else {
					str += string[i].toUpperCase();
				}
			}
		}
		return str;
	},
	/**
	 * 
	 * @param {String} string
	 * 首字母大写 
	 */
	capitalize: function(string){
		return string.slice(0,1).toUpperCase() + string.slice(1).toLowerCase();
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {String} target 
	 * @param {Number} position 
	 * 检查string是否以指定字符串结尾
	 */
	endsWith: function(string, target, position = string.length){
		var length = string.length;
		return string.slice(position - target.length, position) == target;
	},
	/**
	 * 
	 * @param {String} string
	 * 将 "&", "<", ">", '"', and "'" 转义 
	 */
	escape: function(string){
		var str = '';
		for(var i = 0; i < string.length; i++){
			str += checkCharacter(string[i]);
		}
		function checkCharacter(char){
			switch (char) {
				case "&":
				  return "&amp;"
				case ">":
				  return "&gt;"
				case "<":
				  return "&lt;"
				case "'":
				  return "&apos;"
				case '"':
				  return "&quot;"
			  }
			  return char;
		}
		return str;
	},
	/**
	 * 
	 * @param {String} string
	 * 同 escape，"^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|"  
	 */
	escapeRegExp: function(string){
		var str = '';
		for(var i = 0; i < string.length; i++){
			var res = checkCharacter(string[i]);
			if(res == '\\'){
				str += '\\';
			}
			str += string[i];
		}
		function checkCharacter(char){
			switch(char){
				case "^":
				case "$":
				case "": 
				case ".":
				case "*":
				case "+":
				case "?":
				case "(":
				case ")":
				case "[":
				case "]":
				case "{":
				case "}":
				case "|":
				 return "\\";
			}
			return char;
		}
		return str;
	},
	/**
	 * 
	 * @param {String} char
	 * 检验是不是大写字母 
	 */
	isUpperCase: function(char) {
		if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
			return true
		}
		return false
	},
	/**
	 * 
	 * @param {String} string
	 * 单词间用“-”链接 
	 */
	kebabCase: function(string){
		if(string == ''){
			return '';
		}
		var str  = '';
		for(var i = 0; i < string.length; i++){
			if(this.letter(string[i])){
				if(
					!this.letter(string[i-1]) || 
					this.isUpperCase(string[i]) && !this.isUpperCase(string[i-1]) && !this.isUpperCase(string[i+1])
				){
					str += '-'+string[i].toLowerCase();
				} else {
					str += string[i].toLowerCase();
				}
			}
		}
		return str.slice(1);
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {Number} length 
	 * @param {String} chars 
	 * 填充字符串
	 */
	pad: function(string, length, chars = ' '){
		var str = '';
		if(length == string.length){
			return string;
		}
		var mid = Math.floor((length - string.length) / 2);
		for(var i = 0; i < mid; i++){
			str += chars[i % chars.length];
		} 
		str += string;
		for(var i = 0; i < length - string.length - mid; i++){
			str += chars[i % chars.length];
		} 
		return str;
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {Number} length 
	 * @param {String} chars
	 * 从右侧开始填充 
	 */
	padEnd: function(string, length, chars = ' '){
		var str = '';
		if(length == string.length){
			return string;
		}
		str += string;
		for(var i = 0; i < length - string.length; i++){
			str += chars[i % chars.length];
		} 
		return str;
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {Number} length 
	 * @param {String} chars
	 * 从左侧开始填充 
	 */
	padStart: function(string, length, chars = ' '){
		var str = '';
		if(length == string.length){
			return string;
		}
		for(var i = 0; i < length - string.length; i++){
			str += chars[i % chars.length];
		} 
		str += string;
		return str;
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {Number} n 
	 * 将字符串 string 重复 n 次
	 */
	repeat: function(string, n = 1){
		var str = ""
		for (var i = 0; i < n; i++) {
			str += string
		}
		return str;
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {String} pattern 
	 * @param {String} replacement 
	 * 将原字符串中的 pattern 替换为 replacement
	 */
	replace: function(string, pattern, replacement){
		return string.replace(pattern, replacement);
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {String} separator 
	 * @param {Number} limit 
	 * 以给定字符串分隔 string，并返回给定数量的结果
	 */
	split: function(string, separator, limit){
		return string.split(separator).slice(0, limit);
	},
	/**
	 * 
	 * @param {String} string 
	 * @param {String} target 
	 * @param {Number} position 
	 * 检查string是否以指定字符串开始
	 */
	startsWith: function(string, target, position = 0){
		var length = string.length;
		return string.slice(position, position + target.length) == target;
	},
	/**
	 * 
	 * @param {Object} object 
	 * @param {Array} methodNames
	 * 批量将方法的this绑定到object，覆盖原有的方法
	 */
	bindAll: function(object, methodNames){
		methodNames.forEach(item => {
			console.log(item);
			if(item != '_proto_'){
				var func = object[item].bind(object);
				object[item] = func;
			}
		});
	},
	/**
	 * 
	 * @param {Object} source
	 * 判断 source 中的属性是否和 object 中的属性对应，全部对应返回true，否则返回 false
	 */
	conforms: function(source){
		return function(arg){
			for(var key in source){
				if(!source[key](arg[key])){
					return false;
				}
			}
			return true;
		}
	},
	/**
	 * 
	 * @param {*} value 
	 * 返回 value 的函数
	 */
	constant: function(value) {
		return function() {
		  return value;
		};
	},
	/**
	 * 
	 * @param {*} value 
	 * @param {*} defaultValue 
	 * 当 value 是 `NaN`, `null`,`undefined`的时候返回 defaultValue，否则返回 value
	 * 
	 */
	defaultTo: function(value, defaultValue) {
		return (value == null || value !== value) ? defaultValue : value;
	},
	/**
	 * 
	 * @param {Array} funcs
	 * 返回依次调用给定的函数后的结果
	 */
	flow: function(funcs){
		return function(...args){
			var result = funcs.length ? funcs[0].apply(this, args) : value;
			for(var i = 1; i < funcs.length; i++){
				result = funcs[i].call(this, result);
			}
			return result;
		}
	},
	/**
	 * 
	 * @param {*} value
	 * 返回第一个参数 
	 */
	identity: function(value) {
		return value;
	},
	iteratee: function(func){
		return function(arg){
			var fn;
			if(typeof func == 'string'){
				return arg[func];
			} else if (Array.isArray(func)){
				return arg[func[0]] == func[1];
			} else {
				for(var key in func){
					if(func[key] != arg[key]){
						return false;
					}
				}
				return true;
			}
		}
	},
	/**
	 * 
	 * @param {Object} source
	 * 比较给定对象是否与 source 中的属性相同 
	 */
	matches: function(source){
		var self = this;
		return function(obj){
			for(var key in source){
				if(!self.isEqual(source[key], obj[key])){
					return false;
				}
			}
			return true;
		}
	},
	/**
	 * 
	 * @param {*} path 
	 * @param {*} srcValue 
	 * 比较 obj 中 path 对应的值是否等于 srcValue
	 */
	matchesProperty: function(path, srcValue){
		var self = this;
		return function(obj){
			if(!self.isEqual(obj[path], srcValue)){
				return false;
			}
			return true;
		}
	},
	/**
	 * 
	 * @param {Number} number 
	 * 返回第几个参数
	 */
	nthArg: function(number = 0){
		return function(...arg){
			number += number < 0 ? arg.length : 0;
			return arg[number]; 
		}
	},
	/**
	 * 
	 * @param {Array} iteratees 
	 * 将参数应用于 iteratees 的每一项，返回结果组成的数组
	 */
	over: function(iteratees){
		return function(...arg){
			var res = [];
			iteratees.forEach(item => {
				res.push(item(...arg));
			});
			return res;
		}
	},
	/**
	 * 
	 * @param {Array} iteratees 
	 * 同 over，只有所有的都返回true，才返回 true
	 */
	overEvery: function(iteratees){
		return function(...arg){
			return iteratees.every(item => {
				return item(...arg);
			});
		}
	},
	/**
	 * 
	 * @param {*} iteratees 
	 * 同 over，部分返回 true 即返回 true
	 */
	overSome: function(iteratees){
		return function(...arg){
			return iteratees.some(item => {
				return item(...arg);
			});
		}
	},
	/**
	 * 
	 * @param {Number} start 
	 * @param {Number} end 
	 * @param {Number} step
	 * 创建一个从 start 到 end，跨度为 step 的数字数组 
	 */
	range: function(start, end, step){
		if (end === undefined) {
			end = start;
			start = 0;
		}
		step = step === undefined ? (start < end ? 1 : -1) : step;
		var index = -1,
          length = (end - start) / (step || 1),
          result  = [];

		while (length--) {
			result[++index] = start;
			start += step;
		}
		return result;
	},
	/**
	 * 生成一个唯一ID，若有前缀，ID添加在前缀后面
	 */
	idCounter: 0,
	uniqueId: function(prefix) {
		var id = ++this.idCounter;
		return prefix ? prefix.toString() + id : id;
	}

}