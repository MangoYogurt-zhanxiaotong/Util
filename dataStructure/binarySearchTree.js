/**
 * 二叉搜索树：树的节点最多只能有两个，一个是左节点，一个是右节点，左节点 < 父节点 <= 右节点
 */
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // 插入
    insert(key) {
        let node = new Node(key);
        if(this.root == null) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }
    insertNode(root, node) {
        if(node.key >= root.key){
            if(root.right == null){
                root.right = node;
            } else {
                this.insertNode(root.right, node);
            }
        } else {
            if(root.left == null){
                root.left = node;
            } else {
                this.insertNode(root.left, node);
            }
        }
    }
    // 查找是否存在
    search(key) {
        return this.searchKey(this.root, key);
    }
    searchKey(node, key) {
        if(node == null) {
            return false;
        } else if (key < node.key) {
            return this.searchKey(node.left, key);
        } else if (key > node.key) {
            return this.searchKey(node.right, key);
        } else {
            return true;
        }
    }
    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        if(node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if(node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    // 后序
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if(node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    // 最小
    min() {
        return this.minNode(this.root);
    }  
    minNode(node){
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node.key;
        }
        return null;
    } 
    // 最大
    max() {
        let node = this.root;
        if(node) {
            while(node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }
    // 移除
    remove(key) {
        return this.removeNode(this.root, key);
    }
    removeNode(node, key){
        // let node = node;
        if(node === null) {
            return null;
        } 
        if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else {
            // 叶子节点
            if(node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if(node.left === null){
                // 只有一个节点
                node = node.right;
                return node;
            } else if(node.right === null){
                // 只有一个节点
                node = node.left;
                return node;
            } else {
                // 有两个节点
                // 找出右子树最小的节点
                let min = null;
                let tmp = node.right;
                if(tmp) {
                    while(tmp && tmp.left !== null) {
                        tmp = tmp.left;
                    }
                    min = tmp;
                }
                node.key = min.key;
                node.right = this.removeNode(node.right, min.key);
                return node;
            }
           
        }
    }
    // 翻转
    invert(root) {
        if(root == null) {
            return null;
        }
        this.invert(root.left);
        this.invert(root.right);
    
        var tmp = root.left;
        root.left = root.right;
        root.right = tmp;
    
        return root;
    }
    // 比较是否相同
    isSame(t1, t2){
        if(t1 == null || t2 == null) {
            return t1 === t2;
        }
        if(t1.key === t2.key) {
            return this.isSame(t1.left, t2.left) && this.isSame(t1.right, t2.right);
        }
        return false;
    }
    // 是否对称
    isSymmetric() {
        if(this.root === null) {
            return true;
        }
        return this.symmetric(this.root.left, this.root.right);
    }
    symmetric(t1, t2) {
        if(t1 === null || t2 === null) {
            return t1 === t2;
        }
        return (t1.key === t2.key) && this.symmetric(t1.left, t2.right) && this.symmetric(t1.right, t2.left);
    }
    // 最大深度
    maxDepth(root) {
        if(root === null) {
            return 0;
        }
        return Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) + 1;
    }
    // 最小深度
    minDepth(root) {
        if(root === null) {
            return 0;
        }
        let leftDepth = this.minDepth(root.left);
        let rightDepth = this.minDepth(root.right);
        if(leftDepth === 0 || rightDepth === 0){
            return leftDepth + rightDepth + 1;
        }
        return Math.min(leftDepth, rightDepth) + 1;
    }
    // 是否是平衡二叉树 深度差是否大于1
    isBalance() {
        if(this.root === null) {
            return true;
        }
        let mark = true;
        depth(this.root);
        function depth(root) {
            if(root === null) {
                return 0;
            }
            let leftDepth = depth(root.left);
            let rightDepth = depth(root.right);
            if(leftDepth - rightDepth > 1 || leftDepth - rightDepth < -1){
                mark = false;
            }
            return Math.max(leftDepth, rightDepth) + 1;
        }
        return mark;
    }
    // 是否存在从根到叶子节点的路径和等于目标和
    hasPathSum(root, sum){
        if(root === null) {
            return false;
        }
        if(root.left === null && root.right === null){
            return sum - root.key  === 0;
        }
        return this.hasPathSum(root.left, sum - root.key) || this.hasPathSum(root.right, sum - root.key);
    }
}
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// test tree
// let tree = new BinarySearchTree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// // tree.insert(6);
// // 中序 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
// // tree.inOrderTraverse(function(value){console.log(value)});
// // 前序 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
// // tree.preOrderTraverse(function(value){console.log(value)});
// // 后序 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
// // tree.postOrderTraverse(function(value){console.log(value)});
// // 3
// console.log(tree.min());
// // 25
// console.log(tree.max());
// // false
// console.log(tree.search(99));
// // true
// console.log(tree.search(13));
// console.log(tree.remove(6));


// test invert
// let t = new BinarySearchTree();
// t.insert(4);
// t.insert(2);
// t.insert(7);
// t.insert(1);
// t.insert(3);
// t.insert(6);
// t.insert(9);
// t.invert(t.root);

// test same
// let t1 = new BinarySearchTree();
// t1.insert(1);
// t1.insert(2);
// t1.insert(1);
// let t2 = new BinarySearchTree();
// t2.insert(1);
// t2.insert(1);
// t2.insert(2);
// let t3 = new BinarySearchTree();
// t3.insert(2);
// t3.insert(1);
// let t4 = new BinarySearchTree();
// t4.insert(2);
// t4.insert(1);
// console.log(t1.isSame(t1.root, t2.root)); // false
// console.log(t3.isSame(t3.root, t4.root)); // true

// test symmetric
// let t = new BinarySearchTree();
// t.insert(3);
// t.insert(1);
// t.insert(2);
// t.insert(4);
// t.insert(5);
// t.insert(6);
// console.log(t.isSymmetric()); // false

// // test maxDepth
// console.log(t.maxDepth(t.root)); // 4

// // test minDepth
// console.log(t.minDepth(t.root)); // 3

// test balance
let t = new BinarySearchTree();
t.insert(9);
t.insert(3);
t.insert(20);
t.insert(15);
t.insert(22);
console.log(t.isBalance()); // true

// test haspathsum
console.log(t.hasPathSum(t.root, 12)); // true
console.log(t.hasPathSum(t.root, 53)); // false
