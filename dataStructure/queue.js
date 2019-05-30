/**
 * 队列：先进先出
 */
class Queue {
    constructor() {
        this.arr = [];
    }
    // 入队
    enqueue(element) {
        return this.arr.push(element);
    }
    // 出队
    dequeue() {
        return this.arr.shift();
    }
    // 队首
    getFront() {
        return this.arr[0];
    }
    // 队尾
    getRear() {
        return this.arr[this.size() - 1];
    }
    // 队长
    size() {
        return this.arr.length;
    }
    isEmpty() {
        return this.arr.length == 0;
    }
    // 清空
    clear() {
        this.arr = [];
    }
    print() {
        return this.arr.toString();
    }
}
// 测试
let queue = new Queue();
queue.enqueue(11);
queue.enqueue(22);
queue.enqueue(33);
queue.enqueue(44);