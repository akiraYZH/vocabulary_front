//去掉一个数组中含有另外一个数组中含有的值
const arrSubstract = (arr1, arr2) => {
  let arr = [];

  arr1.forEach((item1) => {
    let matched = false;
    arr2.forEach((item2) => {
      item1 === item2 && (matched = true);
    });
    !matched && arr.push(item1);
  });
  return arr;
};

export default arrSubstract;
