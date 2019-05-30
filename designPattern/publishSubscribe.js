/**
 * 发布订阅模式：订阅者将自己的事件注册在调度中心，当发布者发布事件时，由调度中心统一处理
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
