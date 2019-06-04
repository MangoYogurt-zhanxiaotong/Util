/**
 * 单例模式
 * 
 * 定义：确保全局只有一个实例
 * 
 * 优点：减少内存开销
 * 
 * 缺点：与单一职责冲突
 * 
 */
let mySingleTon = (function(){
    let instance;
    function Init(){
        this.value = Math.random();
    }
    return {
        getInstance: function(){
            if(!instance){
                instance = new Init();
            }
            return instance;
        }
    }
})();
// es6 class static

let instance1 = mySingleTon.getInstance();
let instance2 = mySingleTon.getInstance();
console.log(instance1 === instance2);
// true
/*
    通用的 singleton 包装器 
    https://www.cnblogs.com/jymz/p/4250508.html
    var singleton = function(fn){
        var result;
        return function(){
            return result || ( result = fn .apply( this, arguments ) ); 
        }
    }
*/