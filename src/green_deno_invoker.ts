import { base64, hmac, uuid } from "../deps.ts";
import { BizCfg, GreenResult, RequestHeaders } from "./types.ts";
import { md5 } from "./utils.ts";

/**调用阿里云的API进行校验 */
export async function green<T = GreenResult>(bizCfg: BizCfg): Promise<T> {
  const { clientInfo, greenVersion, requestBody } = bizCfg;
  const gmtCreate = new Date().toUTCString();
  const md5Str = base64.fromUint8Array(md5(requestBody));
  // 请求头
  const requestHeaders: RequestHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Content-MD5": md5Str,
    "Date": gmtCreate,
    "x-acs-version": greenVersion,
    "x-acs-signature-nonce": uuid(),
    "x-acs-signature-version": "1.0",
    "x-acs-signature-method": "HMAC-SHA1",
  };

  // 对请求的签名
  signature(requestHeaders, bizCfg);

  const url = bizCfg.url + encodeURI(
    "?clientInfo=" +
      JSON.stringify(clientInfo),
  );
  const headers = new Headers();
  Object.keys(requestHeaders).forEach((key) => {
    const k = key as keyof RequestHeaders;
    headers.set(key, requestHeaders[k]!);
  });
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: requestBody,
  });
  return res.json();
}

function signature(requestHeaders: RequestHeaders, bizCfg: BizCfg) {
  const { clientInfo, url, accessKeyId, accessKeySecret } = bizCfg;
  const path = new URL(url).pathname;

  const signature = [];
  signature.push("POST");
  const keys1: (keyof RequestHeaders)[] = [
    "Accept",
    "Content-MD5",
    "Content-Type",
    "Date",
  ];
  const keys2: (keyof RequestHeaders)[] = [
    "x-acs-signature-method",
    "x-acs-signature-nonce",
    "x-acs-signature-version",
    "x-acs-version",
  ];
  keys1.forEach((key) => signature.push(requestHeaders[key]));
  keys2.forEach((key) => signature.push(key + ":" + requestHeaders[key]));
  signature.push(path + "?clientInfo=" + JSON.stringify(clientInfo));

  const encoder = new TextEncoder();
  const u8 = hmac(
    "sha1",
    encoder.encode(accessKeySecret),
    encoder.encode(signature.join("\n")),
  );
  const authorization = base64.fromUint8Array(u8);
  requestHeaders.Authorization = "acs " + accessKeyId + ":" + authorization;
}
