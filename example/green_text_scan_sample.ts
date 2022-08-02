import { green, uuid } from "../mod.ts";

const accessKeyId = "xx";
const accessKeySecret = "xx";
const greenVersion = "2018-05-09";
const url = "https://green.cn-shanghai.aliyuncs.com/green/text/scan";

const clientInfo = {
  "ip": "127.0.0.1",
};

const data = {
  // scenes: ['porn'],
  "scenes": [
    "antispam",
  ],
  "tasks": [
    {
      "dataId": uuid(),
      "content": "本校小额贷款，安全、快捷、方便、无抵押，随机随贷，当天放款，上门服务。",
    },
  ],
};

// 请求体,根据需要调用相应的算法
const requestBody = JSON.stringify(data);

const result = await green({
  accessKeyId,
  accessKeySecret,
  url,
  clientInfo,
  requestBody,
  greenVersion,
});

console.log(JSON.stringify(result, null, 2));
