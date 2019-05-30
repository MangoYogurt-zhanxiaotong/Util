/**
 * 抽象工厂模式：给客户端提供一个接口，可以创建多个产品族中的产品对象
 */
/*class Milk {
    drink() {
        console.log('牛奶');
    }
}
class AppleMilk extends Milk{
    drink() {
        console.log('苹果牛奶');
    }
}
class WatermelonMilk extends Milk{
    drink() {
        console.log('西瓜牛奶');
    }
}
class MangosteenMilk extends Milk{
    drink() {
        console.log('山竹牛奶');
    }
}
class Fruit {
    eat() {
        console.log('水果');
    }
}
class AppleFruit extends Fruit{
    eat() {
        console.log('苹果水果');
    }
}
class WatermelonFruit extends Fruit{
    eat() {
        console.log('西瓜水果');
    }
}
class MangosteenFruit extends Fruit{
    eat() {
        console.log('山竹水果');
    }
}
class Store {
    getDrink() {
        console.log('在便利店喝牛奶');
    }
    getEat() {
        console.log('在便利店吃水果');
    }
}
class AppleStore extends Store{
    getDrink() {
        console.log('在便利店喝牛奶');
        return new AppleMilk();
    }
    getEat() {
        console.log('在便利店吃水果');
        return new AppleFruit();
    }
}
class WatermelonStore extends Store{
    getDrink() {
        console.log('在便利店喝牛奶');
        return new WatermelonMilk();
    }
    getEat() {
        console.log('在便利店吃水果');
        return new WatermelonFruit();
    }
}
// 测试代码
let s1 = new AppleStore();
s1.getDrink().drink();
s1.getEat().eat();
let s2 = new WatermelonStore();
s2.getDrink().drink();
s2.getEat().eat();
// 在便利店喝牛奶
// 苹果牛奶
// 在便利店吃水果
// 苹果水果
// 在便利店喝牛奶
// 西瓜牛奶
// 在便利店吃水果
// 西瓜水果
*/

// 示例 2
class Car {
    constructor(options){
        this.name = options.name;
        this.color = options.color;
    }
    getInfo() {
        console.log(`${this.name} ${this.color}`);
    }
}
class Truck {
    constructor(options){
        this.name = options.name;
        this.color = options.color;
    }
    getInfo() {
        console.log(`${this.name} ${this.color}`);
    }
}
let AbstractVehicleFactory = (function(){
    let types = {};
    return {
        getVehicle: function(type, options){
            let Vehicle = types[type];
            return (Vehicle) ? new Vehicle(options) : null;
        },
        registerVehicle: function(type, Vehicle){
           types[type] = Vehicle;
        }
    }
})();
// 测试
AbstractVehicleFactory.registerVehicle('car', Car);
AbstractVehicleFactory.registerVehicle('truck', Truck);
AbstractVehicleFactory.getVehicle('car',{
    name: 'mini',
    color: 'red'
}).getInfo();
AbstractVehicleFactory.getVehicle('truck',{
    name: 'dongfeng',
    color: 'white'
}).getInfo();
// mini red
// dongfeng white