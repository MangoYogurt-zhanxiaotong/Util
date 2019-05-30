/**
 * 工厂模式：将实际创建工作推迟到子类，当添加一类产品只需要添加一个工厂
 * 如 new，其本身只是对象的复制和改写过程，具体会生成什么是由传进去的参数决定的
 */
class Apple {
    info() {
        console.log('烟台红富士：风味香甜、酥脆多汁，售价：10元／斤');
    }
}
class Watermelon {
    info() {
        console.log('南汇西瓜：皮薄肉多、爽口甘甜，售价：2元／斤');
    }
}
class Mangosteen {
    info() {
        console.log('泰国山竹：果肉雪白嫩软，味清甜甘香，售价：20元／斤');
    }
}
class FruitStore {
    getFruit() {
        console.log('这里是水果工厂');
    }
}
class AppleFactory extends FruitStore {
    getFruit() {
        console.log('这里是烟台红富士工厂');
        return new Apple();
    }
}
class WatermelonFactory extends FruitStore {
    getFruit() {
        console.log('这里是南汇西瓜工厂');
        return new Watermelon();
    }
}
class MangosteenFactory extends FruitStore {
    getFruit() {
        console.log('这里是泰国山竹工厂');
        return new Mangosteen();
    }
}
//测试代码
let apple = new AppleFactory();
let watermelon = new WatermelonFactory();
let mangosteenapple = new MangosteenFactory();
apple.getFruit().info();
watermelon.getFruit().info();
mangosteenapple.getFruit().info();
// 这里是烟台红富士工厂
// 烟台红富士：风味香甜、酥脆多汁，售价：10元／斤
// 这里是南汇西瓜工厂
// 南汇西瓜：皮薄肉多、爽口甘甜，售价：2元／斤
// 这里是泰国山竹工厂
// 泰国山竹：果肉雪白嫩软，味清甜甘香，售价：20元／斤