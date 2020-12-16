# boka-upload-qiniu

## Installing

```
  npm i boka-upload-qiniu
```

## Example

```
  import upQiniu from "boka-upload-qiniu"
```

### code example

```javascript
upQiniu
  .upLoadFile({
    file: "",
    token: "",
    dir: "",
  })
  .then((res) => {})
  .catch((err) => console.error(err));
```


## upLoadFile 参数 Object

|  字段   | 是否必填  | 类型  | 描述  |
|  ----  | ----  | ----  | ----  |
| file  | 是 | blob | 本地获取文件流 |
| token  | 是 | String | 上传七牛token |
| dir  | 否 | String | 上传七牛后文件目录，不填默认根目录 |
| key  | 否 | String | 上传七牛指定文件名称及格式，不填默认uuid加文件后缀 |
