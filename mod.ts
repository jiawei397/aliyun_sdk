/**
 * # 阿里云内容审核sdk
 *
 * 修改自阿里云的green-nodejs-sdk。
 *
 * ## 文本同步检测
 *
 * 官方文档地址为：https://help.aliyun.com/document_detail/70439.html。
 *
 * 代码如下：
 *
 * ```typescript
 * import { green, uuid } from "https://deno.land/x/aliyun_sdk/mod.ts";
 *
 * const accessKeyId = "xx";
 * const accessKeySecret = "xx";
 * const greenVersion = "2018-05-09";
 * const url = "https://green.cn-shanghai.aliyuncs.com/green/text/scan";
 *
 * const clientInfo = {
 *   "ip": "127.0.0.1",
 * };
 *
 * const data = {
 *   "scenes": [
 *     "antispam",
 *   ],
 *   "tasks": [
 *     {
 *       "dataId": uuid(),
 *       "content": "本校小额贷款，安全、快捷、方便、无抵押，随机随贷，当天放款，上门服务。",
 *     },
 *   ],
 * };
 *
 * // 请求体,根据需要调用相应的算法
 * const requestBody = JSON.stringify(data);
 *
 * const result = await green({
 *   accessKeyId,
 *   accessKeySecret,
 *   url,
 *   clientInfo,
 *   requestBody,
 *   greenVersion,
 * });
 *
 * console.log(JSON.stringify(result, null, 2));
 * ```
 *
 * 将`accessKeyId`、`accessKeySecret`替换为自己阿里云账户AK，`url`也可以对应调整为具体功能的路径或区域。
 *
 * 本例测试结果为：
 *
 * ```json
 * {
 *   "code": 200,
 *   "data": [
 *     {
 *       "code": 200,
 *       "content": "本校小额贷款，安全、快捷、方便、无抵押，随机随贷，当天放款，上门服务。",
 *       "dataId": "36454037-8c40-4753-8087-3cd814cd3d42",
 *       "filteredContent": "本校****，安全、快捷、方便、无抵押，****，当天放款，****。",
 *       "msg": "OK",
 *       "results": [
 *         {
 *           "details": [
 *             {
 *               "label": "contraband"
 *             },
 *             {
 *               "label": "politics"
 *             }
 *           ],
 *           "label": "contraband",
 *           "rate": 100,
 *           "scene": "antispam",
 *           "suggestion": "block"
 *         }
 *       ],
 *       "taskId": "txt6TAHlyCHQ3x4$xyV3iJqYk-1wBQEN"
 *     }
 *   ],
 *   "msg": "OK",
 *   "requestId": "ED2F1154-AFF9-55E1-A78D-B3D1E5BFB4F6"
 * }
 * ```
 */
export * from "./src/green_deno_invoker.ts";

export type { BizCfg, ClientInfo, RequestHeaders } from "./src/types.ts";

export * from "./src/utils.ts";

export * from "./deps.ts";
