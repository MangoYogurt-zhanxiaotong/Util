/**
 * 适配器模式
 * 
 * 定义：定义一个方法，将一个接口转换成另一个接口，提高接口兼容性
 * 
 * 优点：无需大幅度修改现有代码结构，可扩展性强
 * 
 * 缺点：增加系统和代码复杂度，不容易看出接口原本的格式
 * 
 * 场景：需要修改一个正在运行的接口且不影响现有功能
 */
function old(){
    return [{
        name: "xiaoming",
        age: 18
    },{
        name: "lily",
        age: 10
    }]
}
function adaptor(old) {
    let result = old();
    let obj = {};
    for(let i of result){
        obj[i.name] = i.age;
    }
    return obj;
}
// test
// 旧接口
// [{
//     name: "xiaoming",
//     age: 18
// },{
//     name: "lily",
//     age: 10
// }]
old();
// 新接口
// {
//     lily: 10,
//     xiaoming: 18
// }
adaptor(old);