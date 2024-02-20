export function mergeStrings<T extends Array<unknown>>(arr: T): T {
  const res = [] as unknown as T;
  let strBuff: string[] = [];
  for (const el of arr) {
    if (typeof el === "string") {
      strBuff.push(el);
    } else {
      if (strBuff.length > 0) {
        res.push(strBuff.join(""));
        strBuff = [];
      }
      res.push(el);
    }
  }
  if (strBuff.length > 0) {
    res.push(strBuff.join(""));
  }
  return res;
}
