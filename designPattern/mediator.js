/**
 * 中介者模式：用一个对象来封装一系列对象之间的交互，使得各对象之间不需要显式的引用，只需要和中介交互
 */
let mediator = (function(){
    let topics = {};
    let uid = -1;
    // 订阅
    let subscribe = function(topic, func){
        if(!topics[topic]){
            topics[topic] = [];
        }
        topics[topic].push({
            token: ++uid,
            context: this,
            func: func
        });
        return uid;
    };
    // 发布
    let publish = function(topic, ...arg){
        if(!topics[topic]){
            return false;
        }
        let subscribeList = topics[topic];
        for(let i = 0; i < subscribeList.length; i++){
            subscribeList[i].func.call(subscribeList[i].context, topic, ...arg);
        }
        return true;
    }
    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj){
            obj.publish = publish;
            obj.subscribe = subscribe;
        }
    }
})();
let med1 = {
    name: 'med1'
}, med2 = {
    name: 'med2'
}, med3 = {
    name: 'med3'
};
mediator.installTo(med1);
mediator.installTo(med2);
mediator.installTo(med3);
med1.subscribe("message", function(topic, data){
    console.log(`${this.name} 收到 ${topic} : ${data}`);
});
med2.subscribe("message", function(topic, data){
    console.log(`${this.name} 收到 ${topic} : ${data}`);
});
med3.publish('message', 'ready');
// med1 收到 message : ready
// med2 收到 message : ready
