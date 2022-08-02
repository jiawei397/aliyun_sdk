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
