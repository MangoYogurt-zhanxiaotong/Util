/**
 * 策略模式
 * 
 * 定义：定义一系列算法，把他们一个一个封装起来，根据不同的参数选择不同的策略
 * 
 * 优点：
 *      避免多重条件判断
 *      可扩展性强，复用性强
 * 
 * 缺点：
 *      可能会增加多种策略
 *      须了解所有的策略后，才能选择一个合适的策略
 * 
 * 使用场景：
 *      需要动态地根据行为改变运行方法
 *      通过抽离出策略类代码，提高了可读性
 */
const add = function(a, b){return a + b;}
const subtract = function(a, b){return a - b;}
const multi = function(a, b){return a * b;}

function strategy(func, ...args) {
    return func.apply(null, args);
}

// test
console.log(strategy(add,1,2));
console.log(strategy(subtract,1,2));
console.log(strategy(multi,1,2));