/**
 * @param {二进制文件流} file
 */
function changeFileToBaseURL(file) {
  // 创建读取文件对象
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    //如果file没定义返回null
    if (file == undefined) {
      reject();
    }
    // 读取file文件,得到的结果为base64位
    fileReader.readAsDataURL(file);

    fileReader.onload = function() {
      // 把读取到的base64
      const imgBase64Data = this.result;
      resolve(imgBase64Data);
    };
  });
}

/**
 * 将base64转换为文件
 * @param {baseURL} dataurl
 * @param {文件名称} filename
 * @return {文件二进制流}
 */
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * canvas压缩图片
 * @param {参数obj} param
 * @param {文件二进制流} param.file 必传
 * @param {目标压缩大小} param.targetSize 不传初始赋值-1
 * @param {输出图片宽度} param.width 不传初始赋值-1，等比缩放不用传高度
 * @param {输出图片名称} param.fileName 不传初始赋值image
 * @param {压缩图片程度} param.quality 不传初始赋值0.92。值范围0~1
 */
async function pressImg(param) {
  return new Promise((resolve, reject) => {
    //如果没有回调函数就不执行
    if (param) {
      //如果file没定义就reject
      if (param.file == undefined) {
        reject();
      }
      //给参数附初始值
      param.targetSize = param.hasOwnProperty["targetSize"]
        ? param.targetSize
        : -1;
      param.width = param["width"] ? param.width : -1;
      param.fileName = param["fileName"] ? param.fileName : "image";
      param.quality = param["quality"] ? param.quality : 0.92;
      // 得到文件类型
      const fileType = param.file.type;
      // console.log(fileType) //image/jpeg
      if (fileType.indexOf("image") == -1) {
        console.log("请选择图片文件^_^");
        reject();
      }
      //如果当前size比目标size小，直接输出
      const size = param.file.size;
      if (param.targetSize > size) {
        //   return param.succ(param.file);
        return param.file;
      }
      // 读取file文件,得到的结果为base64位
      changeFileToBaseURL(param.file).then((base64) => {
        if (base64) {
          const image = new Image();
          image.src = base64;
          image.onload = function() {
            // 获得长宽比例
            const scale = this.width / this.height;
            // console.log(scale);
            //创建一个canvas
            const canvas = document.createElement("canvas");
            //获取上下文
            const context = canvas.getContext("2d");
            //获取压缩后的图片宽度,如果width为-1，默认原图宽度
            canvas.width = param.width == -1 ? this.width : param.width;
            //获取压缩后的图片高度,如果width为-1，默认原图高度
            canvas.height =
              param.width == -1 ? this.height : parseInt(param.width / scale);
            //把图片绘制到canvas上面
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            //压缩图片，获取到新的base64Url
            const newImageData = canvas.toDataURL(fileType, param.quality);
            //将base64转化成文件流
            const resultFile = dataURLtoFile(newImageData, param.fileName);
            //判断如果targetSize有限制且压缩后的图片大小比目标大小大，就弹出reject
            if (param.targetSize != -1 && param.targetSize < resultFile.size) {
              console.log("图片上传尺寸太大，请重新上传^_^");
              reject();
            } else {
              //返回文件流
              resolve(resultFile);
            }
          };
        }
      });
    }
  });
}

export default pressImg;
