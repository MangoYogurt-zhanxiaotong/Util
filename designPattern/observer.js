/**
 * 观察者模式
 * 
 * 定义：一个对象维持一系列依赖于它的观察者，将状态的任何变更自动通知给他们
 * 
 * 优点：观察者和目标之间松散耦合
 * 
 * 缺点：通知所有的观察者需要时间，可能有循环引用，观察者不知道目标是如何改变的
 * 
 * 使用场景：当一个对象的改变需要同时改变其他对象，但他不知道有哪些对象需要改变时
 * 
 */
// 目标，维护一系列观察者，可添加、删除观察者，也可发布通知
class Subject {
	constructor() {
		this.observerList = [];
	}
	// 添加
	addObserver(observer) {
		this.observerList.push(observer);
	}
	// 删除
	removerObserver(observer) {
		this.observerList.forEach((item, index) => {
			if(item === observer){
				this.observerList.splice(index,1);
			}
		});
	}
	// 通知
	notify(data) {
		this.observerList.forEach(item => {
			item.update(data);
		});
	}
}

// 观察者，提供一个接口用于目标状态发生改变时获得通知
class Observer {
	constructor(){

	}
	update(data) {
		console.log(`update: ${data}`);
	}
}
// 测试代码
let ob1 = new Observer();
let ob2 = new Observer();
let sub = new Subject();
// 重写update方法
ob1.update = function(data){
	console.log(`ob1 update: ${data}`);
}
ob2.update = function(data){
	console.log(`ob2 update: ${data}`);
}
// 将观察者添加进目标队列中
sub.addObserver(ob1);
sub.addObserver(ob2);
// 第一次发布通知
sub.notify("changed"); 
// 删除观察者2
sub.removerObserver(ob2);
//第二次发布通知
sub.notify("second changed"); 
// ob1 update: changed
// ob2 update: changed
// ob1 update: second changed