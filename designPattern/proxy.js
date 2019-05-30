/**
 * 代理模式：为一个对象找一个替代对象，通过替代对象完成对原对象的操作
 * https://www.jianshu.com/p/798152197124
 */

 // 明星与经纪人
class Star {
    constructor(name) {
        this.name = name;
    }
    receiveInvitation(show) {
        console.log(`${this.name} 同意签约 ${show}`);
    }
    rejectInvitation(show) {
        console.log(`${this.name} 不同意签约 ${show}`);
    }
}
class Agent {
    constructor(star) {
        this.star = star;
    }
    receiveInvitation(show) {
        this.star.receiveInvitation(show);
    }
    rejectInvitation(show) {
        this.star.rejectInvitation(show);
    }
}
// test
let star = new Star('Tom');
let agent = new Agent(star);
agent.receiveInvitation('跑男');
agent.rejectInvitation('极挑');