/**
 * 迭代器模式
 * 
 * 定义：提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示
 * 
 * 优点：分离迭代过程，不用关心对象内部构造，便可顺序访问每个元素
 * 
 * 缺点：需要额外增加迭代器方法
 * 
 * 使用场景：在不暴露对象内部构造的时候遍历对象
 */
function Iterator(arr) {
    let index = 0;

    return {
        next() {
            return index += 1;
        },
        value() {
            return arr[index];
        },
        done() {
            return index >= arr.length;
        }
    }
}
let arr = [22,66,88,33];
let ite = Iterator(arr);
// 22 66 88 33
while(!ite.done()){
    console.log(ite.value());
    ite.next();
}