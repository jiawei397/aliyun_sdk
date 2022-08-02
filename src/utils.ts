import { encode, Hash } from "../deps.ts";

export function md5(buffer: string): Uint8Array {
  return new Hash("md5").digest(encode(buffer)).data;
}
