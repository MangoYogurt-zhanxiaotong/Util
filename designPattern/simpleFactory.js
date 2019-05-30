/**
 * 简单工厂模式：根据传进来的参数决定实例化哪一类对象
 * https://segmentfault.com/a/1190000014104914
 * 缺点：当需要添加一类产品时，需要在水果工厂里添加对应的生产逻辑
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
    getFruit(type) {
        switch(type) {
            case '苹果': return new Apple();
            case '西瓜': return new Watermelon();
            case '山竹': return new Mangosteen();
        }
    }
}
//测试代码
let fruit = new FruitStore();
fruit.getFruit('苹果').info();
fruit.getFruit('西瓜').info();
fruit.getFruit('山竹').info();
// 烟台红富士：风味香甜、酥脆多汁，售价：10元／斤
// 南汇西瓜：皮薄肉多、爽口甘甜，售价：2元／斤
// 泰国山竹：果肉雪白嫩软，味清甜甘香，售价：20元／斤