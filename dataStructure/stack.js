/**
 * 栈：先进后出
 */
class Stack {
    constructor() {
        this.arr = [];
    }
    // 入栈
    push(element) {
        return this.arr.push(element);
    }
    // 出栈
    pop() {
        return this.arr.pop();
    }
    // 栈顶元素
    top() {
        return this.arr[this.size() - 1];
    }
    // 总数
    size() {
        return this.arr.length;
    }
    // 清空栈
    clear() {
        this.arr = [];
        return true;
    }
    toString() {
        return this.arr.toString();
    }
}

// 测试
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);