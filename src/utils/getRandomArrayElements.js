//随机从数组中去除几个元素
export default function getRandomArrayElements(arr, count) {
  // 复制数组
  let _arr = arr.slice(0);
  let selected_arr = [];

  while (selected_arr.length < count) {
    let index = Math.floor(_arr.length * Math.random());
    // 加到目标数组
    selected_arr.push(_arr.splice(index, 1)[0]);
  }
  return selected_arr;
}
