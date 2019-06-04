/**
 * 命令模式
 * 
 * 定义：命令对象分离接收者和发起者之间的耦合，发起者只需向命令对象发送指令，由命令对象调用接收者
 * 
 * 优点：降低耦合度，快速添加新功能，上层全部调用一个方法就可以实现不同的功能
 * 
 * 缺点：每调用一次接收者就要调用一次命令对象，增加代码复杂度
 * 
 * 场景：有时候需要发起一些请求，但是不知道接收者是谁，也不知道具体操作是什么
 */
let CarManager = {
    rent: function(car){
        console.log(`${car} car rental succeeded`);
    },
    giveBack: function(car){
        console.log(`Return ${car} was successful`);
    },
    clean: function(car){
        console.log(`${car} cleaning was successful`);
    },
    run(func,...args){
        if(this[func]){
            this[func].apply(this, args);
        }
        return false;
    }
}

CarManager.run('rent', 'ford');
CarManager.run('clean', 'ford');
CarManager.run('giveBack', 'ford');
// ford car rental succeeded
// ford cleaning was successful
// Return ford was successful
