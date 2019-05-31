/**
 * 
 */
// 使用对象模拟集合
class Set1 {
    constructor() {
        this.items = {};
    }
    // 添加新的项
    add(value) {
        if(!this.has(value)){
            this.items[value] = value;
            return true;
        }
        return false;
    }
    // 移除
    remove(value) {
        if(this.has(value)){
            delete this.items[value];
            return true;
        }
        return false;
    }
    // 判断是否存在值
    has(value) {
        // return this.items.hasOwnProperty(value);
        return value in this.items;
    }
    // 清空
    clear() {
        this.items = {};
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
    // 返回一个包含所有值的数组
    values() {
        return Object.keys(this.items);
    }
    // 并集
    union(otherSet) {
        let unionSet = new Set1();
        let values = this.values();
        for(let i = 0; i < values.length; i++){
            unionSet.add(values[i]);
        }
        let otherValues = otherSet.values();
        for(let j = 0; j < otherValues.length; j++){
            unionSet.add(otherValues[j]);
        }
        return unionSet.values();
    }
    // 交集
    intersection(otherSet) {
        let intersectionSet = new Set1();
        let values = this.values();
        for(let i = 0; i < values.length; i++){
            if(otherSet.has(values[i])){
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet.values();
    }
    // 差集
    difference(otherSet) {
        let differenceSet = new Set1();
        let values = this.values();
        for(let i = 0; i < values.length; i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }
        return differenceSet.values();
    }
    // 子集
    subSet(otherSet) {
        if(this.size() > otherSet.size()){
            return false;
        } else {
            let values = this.values();
            for(let i = 0; i < values.length; i++){
                if(!otherSet.has(values[i])){
                    return false;
                }
            }
            return true;
        }
    }
}
// test
let set  = new Set1();
set.add(11);
set.add(22);
set.add(33);
set.add(44);
set.add(55);
set.add(66);

let setB = new Set1();
setB.add(55);
setB.add(77);
setB.add(88);
setB.add(99);
// 并集 11,22,33,44,55,66,77,88,99
console.log(`并集 ${set.union(setB)}`);
// 交集 55
console.log(`交集 ${set.intersection(setB)}`);
// 差集 11,22,33,44,66
console.log(`差集 ${set.difference(setB)}`);
// 子集 false
console.log(`子集 ${set.subSet(setB)}`);



// 使用 es6 的 set
class Set2 {
    constructor() {
        this.items = new Set();
    }
    // 添加新的项
    add(value) {
        return this.items.add(value);
    }
    // 移除
    remove(value) {
        return this.items.delete(value);
    }
    // 判断是否存在值
    has(value) {
        return this.items.has(value);
    }
    // 清空
    clear() {
        return this.items.clear();
    }
    // 数量
    size() {
        return this.items.size;
    }
    // 返回一个包含所有值的数组
    values() {
        let arr = [];
        for(let i of this.items.keys()){
            arr.push(i);
        }
        return arr;
    }
    // 并集
    union(otherSet) {
        let unionSet = new Set([...this.items, ...otherSet.items]);
        let arr = [];
        for(let i of unionSet) {
            arr.push(i);
        }
        return arr;
    }
    // 交集
    intersection(otherSet) {
        let intersectionSet = new Set([...this.items].filter(x => otherSet.items.has(x)));
        let arr = [];
        for(let i of intersectionSet) {
            arr.push(i);
        }
        return arr;
    }
    // 差集
    difference(otherSet) {
        let differenceSet = new Set([...this.items].filter(x => !otherSet.items.has(x)));
        let arr = [];
        for(let i of differenceSet) {
            arr.push(i);
        }
        return arr;
    }
    // 子集
    subSet(otherSet) {
        if(this.size() > otherSet.size()){
            return false;
        } else {
            let values = this.values();
            for(let i = 0; i < values.length; i++){
                if(!otherSet.has(values[i])){
                    return false;
                }
            }
            return true;
        }
    }
}

// test
let set2 = new Set2();
set2.add(11);
set2.add(22);
set2.add(33);
set2.add(44);
set2.add(55);

let setC = new Set2();
setC.add(55);
setC.add(66);
setC.add(77);
setC.add(88);
setC.add(99);

// 并集 11,22,33,44,55,66,77,88,99
console.log(`并集 ${set2.union(setC)}`);
// 交集 55
console.log(`交集 ${set2.intersection(setC)}`);
// 差集 11,22,33,44
console.log(`差集 ${set2.difference(setC)}`);
// 子集 false
console.log(`子集 ${set2.subSet(setC)}`);