/**
 * 装饰者模式：给基础对象添加一些额外的职责
 */
class MacBook {
    constructor() {
        this.cost = function(){
            return 997;
        }
        this.screen = function(){
            return 11.6;
        }
    }
}
function Memory(macbook) {
    let cost = macbook.cost();
    macbook.cost = function(){
        return cost + 75;
    }
}
function Insurance(macbook) {
    let cost = macbook.cost();
    macbook.cost = function(){
        return cost + 200;
    }
}

// test
let mac = new MacBook();
Memory(mac);
Insurance(mac);
// 1272
// 11.6
console.log(mac.cost());
console.log(mac.screen());