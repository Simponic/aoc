import * as input from "fs";

type NestedNumbers = Array<NestedNumbers | number>;

const compare = (
  a: NestedNumbers | number,
  b: NestedNumbers | number
): boolean => {
  if (typeof a === typeof b && typeof b === "number") return a < b;
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (i >= b.length) return false;
      if (compare(a[i], b[i])) return true;
      if (compare(b[i], a[i])) return false;
    }
    return compare(a.length, b.length);
  }
  return compare(Array.isArray(b) ? [a] : a, Array.isArray(a) ? [b] : b);
};

const main = (): void => {
  const lines: NestedNumbers[] = input
    .readFileSync("input", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => JSON.parse(x));

  const pairs: [NestedNumbers, NestedNumbers][] = [];
  for (let i = 0; i < lines.length; i += 2) {
    const pair: [NestedNumbers, NestedNumbers] = [lines[i], lines[i + 1]];
    pairs.push(pair);
  }

  console.log(
    pairs.reduce((acc, [a, b], i) => acc + (compare(a, b) ? i + 1 : 0), 0)
  );

  lines.push([[2]]);
  lines.push([[6]]);

  const sorted = lines.sort((a, b) => {
    if (compare(a, b)) return -1;
    if (compare(b, a)) return 1;
    return 0;
  });

  const isPacket = (num: number) => (x: NestedNumbers) =>
    Array.isArray(x) &&
    x.length === 1 &&
    Array.isArray(x[0]) &&
    x[0].length === 1 &&
    x[0][0] === num;

  console.log(
    (sorted.findIndex(isPacket(6)) + 1) * (sorted.findIndex(isPacket(2)) + 1)
  );
};

main();
