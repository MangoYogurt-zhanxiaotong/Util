/**
 * 链表：每个元素由一个值和指向下一个元素的引用组成
 */
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    // 添加（追加）
    append(element) {
        let node = new Node(element);
        let current;
        if (this.head == null) {
            // 列表中第一个节点
            this.head = node;
        } else {
            current = this.head;
            // 循环直至最后一项
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        // 更新长度
        this.length++;
    }
    // 在特定位置插入元素
    insert(position, element) {
        if (position > -1 && position < this.length) {
            let node = new Node(element);
            let current = this.head, previous = current, index = 0;
            if (position == 0) {
                node.next = current;
                this.head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            // 更新长度
            this.length++;
            return true;
        } else {
            return false;
        }
    }
    // 移除
    remove(element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }
    // 从任意位置移除元素
    removeAt(position) {
        // 检查是否越界
        if (position > -1 && position < this.length) {
            let current = this.head, previous = current, index = 0;
            if (position == 0) {
                // 移除第一项
                this.head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            // 更新长度
            this.length--;
            // 返回被移除元素值
            return current.element;
        } else {
            return null;
        }
    }
    // 查找元素的位置
    indexOf(element) {
        let current = this.head, index = 0;
        while(current) {
            if (current.element == element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    isEmpty() {
        return this.length == 0;
    }
    size() {
        return this.length;
    }
    getHead() {
        return this.head;
    }
    // 转换成字符串
    toString() {
        let current = this.head, string = '';
        while(current) {
            string += ',' + current.element;
            current = current.next;
        }
        return string.slice(1);
    }
}
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// test
let list = new LinkedList();
list.append(15);
list.append(25);
list.append(35);
list.append(45);
list.append(55);
list.append(65);