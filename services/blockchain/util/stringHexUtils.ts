export const hexEncode = (strVal: string): string => {
  return Buffer.from(strVal).toString('hex');
}

export const hexDecode = (encodedStrVal: string): string => {
  return Buffer.from(encodedStrVal, 'hex').toString();
}
