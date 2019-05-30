/**
 * 原型模式
 */
let vehicle = {
    getName: function(){
        console.log(`The name: ${this.name}`);
    }
}
var car = Object.create(vehicle, {
    name: {
        value: 'mini',
        enumerable: true
    }
});
console.log(car.getName());
// The name: mini