export const hexEncode = (strVal: string): string => {
  return new Buffer(strVal).toString('hex');
}

export const hexDecode = (encodedStrVal: string): string => {
  return new Buffer(encodedStrVal, 'hex').toString();
}
