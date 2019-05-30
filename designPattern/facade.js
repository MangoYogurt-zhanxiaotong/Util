/**
 * 外观模式：提供高层次接口给开发者调用，隐藏其底层的真实复杂性
 * 如 jq 中的 css() animate() ready() 等方法
 * 如 取消事件冒泡 和默认事件 
 */
let person = {
    getName: function(){
        console.log('my name is xiaoming');
    },
    getSex: function(){
        console.log('I am a girl');
    },
    getInfo(){
        this.getName();
        this.getSex();
    }
}
console.log(person.getInfo());
// my name is xiaoming
// I am a girl