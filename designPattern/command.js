/**
 * 命令模式：命令对象分离接受者和发起者之间的耦合，发起者只需向命令对象发送指令，由命令对象调用接受者
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
