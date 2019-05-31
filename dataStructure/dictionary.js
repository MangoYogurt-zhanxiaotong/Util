/**
 * 字典：存储 [键，值] 对
 */
class Dictionary {
    constructor() {
        this.items = {}
    }
    // 添加
    set(key, value) {
        // 后者覆盖前者
        this.items[key] = value;
    }
    // 移除
    remove(key) {   
        if(this.has(key)){
            delete this.items[key];
            return true;
        }
        return false;
    }
    // 是否存在
    has(key) {
        return key in this.items;
    }
    // 通过键查找相应的值
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }
    // 清空
    clear() {
        this.items = [];
    }
    // 数量
    size() {
        let count = 0, key; 
        for(key in this.items){
            if(this.items.hasOwnProperty(key)){
                count++;
            }
        }
        return count;
    }
    // 键名组成的数组
    keys() {
        return Object.keys(this.items);
    }
    // 值组成的数组
    values() {
        return Object.values(this.items);
    }
}
// test
let dictionary = new Dictionary();
dictionary.set('name', 'lily');
dictionary.set('sex', '1');
dictionary.set('age', '18');

// 使用 es6 Map
let map = new Map();
map.set('name','peter');
map.set('sex','1');
map.set('age','18');
console.log(map.has('age'));
console.log(map.get('sex'));
console.log(map.size);
map.delete('sex');
console.log(map.has('sex'));
for(let [key, value] of map.entries()){
    console.log([key, value]);
}