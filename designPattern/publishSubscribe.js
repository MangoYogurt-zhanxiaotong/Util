/**
 * 发布订阅模式
 * 
 * 定义：订阅者将自己的事件注册在调度中心，当发布者发布事件时，由调度中心统一处理
 * 
 * 优点：对象之间的解耦
 * 
 * 缺点：创建订阅者需要时间，如果最后没有消息发生订阅者也会一直存在于内存中，过度使用将会增加系统复杂度
 * 
 * 使用场景：当一个对象的改变需要同时改变其他对象，但他不知道有哪些对象需要改变时
 */
let topics = {};
let uid = -1;
let pubsub = {
    // 订阅
    subscribe(topic, func) {
        if(!topics[topic]){
            topics[topic] = [];
        }
        topics[topic].push({
            token: ++uid,
            func: func
        });
        return uid;
    },
    // 发布
    publish(topic, data) {
        if(!topics[topic]){
            return false;
        }
        let subArr = topics[topic];
        for(var i = 0; i < subArr.length; i++){
            subArr[i].func(topic, data);
        }
        return true;
    },
    // 取消订阅
    unsubscribe(uid){
        Object.keys(topics).forEach(key => {
            let topic = topics[key];
            if(topic){
                topic.forEach((item, index) => {
                    if(item.token == uid){
                        topic.splice(index, 1);
                        return uid;
                    }
                });
            }
        });
    }
}
// 测试代码
let uid1 = pubsub.subscribe("newMessage",function(topic, data){
    console.log(`订阅者 1 收到信息： ${topic} ${data}`);
});
let uid2 = pubsub.subscribe("newMessage",function(topic, data){
    console.log(`订阅者 2 收到信息： ${topic} ${data}`);
});
pubsub.publish('newMessage', 'I am Groot');
// 取消订阅者 2
pubsub.unsubscribe(uid2);
pubsub.publish('newMessage', 'I am Groot2');
// 订阅者 1 收到信息： newMessage I am Groot
// 订阅者 2 收到信息： newMessage I am Groot
// 订阅者 1 收到信息： newMessage I am Groot2
