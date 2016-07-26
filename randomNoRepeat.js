/**
 * 生成不重复的随机数
 * @param {int} num 生成随机数的范围  0 ~ num
 * 同时生成的第 n * num+1 个随机数的值与第 n * num 个也不重复(n为1 ~ +∞ 的整数)
 */

function randomNoRepeat(num) {
  var preNumList = [];
  var needClear = false;
  return function doRandomNoRepeat (){
    if(!num){
      return;
    }
    var res = Math.floor(num * Math.random());
    if (preNumList.indexOf(res) >= 0) {
      res = doRandomNoRepeat(num);
    } else {
      if(needClear){
        preNumList = [];
        needClear = false;
      }
      preNumList.push(res);
      if (preNumList.length >= num) {
        preNumList = [res];
        needClear = true;
      }
      return res;
    }
    return res;
  }
}
