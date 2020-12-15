const qiniuHost = "https://upload.qiniup.com";
const UUID = require("uuid/v4");

function UpQiniu() {
  this.qiniuHost = qiniuHost;

}
/**
 * 
 * @param {formData模式上传七牛云} obj 
 */
const upLoadFile = function (obj) {
  const { file, token = "", dir = "", key = "" } = obj;
  if (!token || dir.indexOf("/") == 0) {
    return;
  }

  const formData = new FormData(), fileName = (key || UUID("")) + getPostfix(file.name);
  formData.append("token", token);
  formData.append("file", file);
  formData.append("key", dir + fileName);

  return fetch(this.qiniuHost, {
    body: formData,
    method: "POST",
    headers: {

    }
  }).then(res => res.json())
}
/**
 * 
 * @param {通过base64上传七牛} obj 
 */
const putb64 = function (obj) {

  const { file, token = "", dir = "", key = "", url = "", baseStr } = obj;
  if (!token || dir.indexOf("/") == 0 || !baseStr) {
    return;
  }

  const fileName = (key || UUID("")) + getPostfix(file.name);
  const link = url || `${this.qiniuHost}/putb64/-1/key/${encode(fileName)}`;

  const postData = baseStr.split("base64,")[1];
  const headers = {
    "Content-Type": "application/octet-stream",
    Authorization: "UpToken " + token,
  };

  return fetch(link, {
    body: postData,
    method: "POST",
    headers
  }).then(res => res.json())
}

function getPostfix(name) {
  const re = /\.[^\.]+$/;
  return name.match(re)[0];
}

UpQiniu.prototype.upLoadFile = upLoadFile;
UpQiniu.prototype.putb64 = putb64;


const upQiniu = new UpQiniu();

export default upQiniu;