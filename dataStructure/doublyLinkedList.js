/**
 * 双向链表：一个链指向下一个元素，另一个链指向前一个元素
 */
class DoublyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
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
            node.prev = current;
        }
        // 更新长度
        this.length++;
        this.tail = node;
    }
    // 在特定位置插入元素
    insert(position, element) {
        if(position > -1 && position <= this.length) {
            let node  = new Node(element);
            let current = this.head, previous = current, index = 0;
            if (position == 0) {
                // 在第一个位置添加
                if(!this.head) {
                    // 新增的
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                }
            } else if (position == this.length) {
                // 最后一项
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                current.prev = node;

                node.prev = previous;
                previous.next = node;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    }
    // 从任意位置移除元素
    removeAt(position) {
        if(position > -1 && position < this.length) {
            let current = this.head, previous = current, index = 0;
            if(position == 0) {
                // 移除第一项
                this.head = current.next;
                if(this.length == 1) {
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if (position == this.length-1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;

                current.next = null;
                current.prev = null;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    }
    size() {
        return this.length;
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
class Node{
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

// test
let list = new DoublyLinkedList();
list.append(15);
list.append(25);
list.append(35);
list.append(45);
list.append(55);
list.append(65);