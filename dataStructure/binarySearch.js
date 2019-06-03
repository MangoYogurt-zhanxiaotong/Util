/**
 * 二分查找：先将数组排好序，比较给定值和数组中间的值
 * 若等于，返回
 * 若小于，继续在 0-middle 左边数组中寻找
 * 若大于，继续在 middle-末尾 右边数组中寻找
 */
function binarySearch(arr, key){
    // 排序
    let sortedArr = arr.sort((a,b) => {
        return a - b;
    });
    let low = 0, middle, high = sortedArr.length - 1;
    
    while(low <= high) {
        middle = Math.floor((low + high) / 2);
        if(sortedArr[middle] == key) {
            return true;
        } else if (sortedArr[middle] > key) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }
    return false;
}

// test
// false
console.log(binarySearch([8,7,6,5,4,3,2,1], 45));
// true
console.log(binarySearch([8,7,6,5,4,3,2,1], 4));