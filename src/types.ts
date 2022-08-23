export interface BizCfg {
  accessKeyId: string;
  accessKeySecret: string;
  url: string;
  clientInfo: ClientInfo;
  requestBody: string;
  greenVersion: string;
}

export type ClientInfo = Record<string, string>;

export interface RequestHeaders {
  "Accept": string;
  "Content-Type": string;
  "Content-MD5": string;
  "Date": string;
  "x-acs-version": string;
  "x-acs-signature-nonce": string;
  "x-acs-signature-version": string;
  "x-acs-signature-method": string;
  Authorization?: string;
}

export interface GreenResult {
  code: number;
  data: Datum[];
  msg: string;
  requestId: string;
}

interface Datum {
  code: number;
  content: string;
  dataId: string;
  filteredContent: string;
  msg: string;
  results: Result[];
  taskId: string;
}

interface Result {
  details: Detail[];
  label: string;
  rate: number;
  scene: string;
  suggestion: string;
}

interface Detail {
  label: string;
}
