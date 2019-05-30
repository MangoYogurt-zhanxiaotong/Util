/**
 * 单例模式：多次调用构造函数，返回同一个实例
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