import { JSONHashMap } from "@/utils";

export type Pair = [number, number];

const getIntervals = (lines: string[]) => {
  const maps: number[][][] = [];

  for (const line of lines.slice(1, lines.length)) {
    if (!line) continue;

    if (line.includes("to")) {
      maps.push([]);
      continue;
    }

    const currMap = maps.at(-1);
    const [dest, source, range] = line.split(" ").map((x) => parseInt(x));
    if (currMap) {
      currMap.push([dest, source, range]);
    }
  }

  return maps;
};

const constructPiecewiseFn = (intervals: number[][]) => {
  const fn: JSONHashMap<Pair, Pair> = new JSONHashMap();

  let fromIntervals: Pair[] = [];

  for (const [dest, source, range] of intervals) {
    const fromI = [source, source + range - 1];
    fromIntervals.push([source, source + range - 1]);
    fn.set(fromI as Pair, [dest, dest + range - 1]);
  }

  fromIntervals = fromIntervals.sort(
    ([source_a], [source_b]) => source_a - source_b
  );

  for (let i = 0; i < fromIntervals.length - 1; i++) {
    const [_start, end] = fromIntervals[i];
    const [nextStart, _nextEnd] = fromIntervals[i + 1];

    if (end !== nextStart - 1) {
      fn.set([end + 1, nextStart - 1], [end + 1, nextStart - 1]);
    }
  }

  if (fromIntervals[0][0] !== 0) {
    const [start, _end] = fromIntervals[0];
    fn.set([0, start - 1], [0, start - 1]);
  }
  const final: Pair = [fromIntervals.at(-1)![1] + 1, Infinity];
  fn.set(final, final);

  return fn
    .keys()
    .map((range) => [range, fn.get(range)!] as [Pair, Pair])
    .sort(([[source_a]], [[source_b]]) => source_a - source_b);
};

export const compose = (f: [Pair, Pair][], g: [Pair, Pair][]) => {
  const composed: [Pair, Pair][] = [];

  for (const [fDomain, fRange] of f) {
    const fOffset = fRange[0] - fDomain[0];

    for (const [gDomain, gRange] of g) {
      const gOffset = gRange[0] - gDomain[0];

      const start = Math.max(fDomain[0], gDomain[0] - fOffset);
      const end = Math.min(fDomain[1], gDomain[1] - fOffset);

      if (start > end) continue;

      composed.push([
        [start, end],
        [start + fOffset + gOffset, end + fOffset + gOffset],
      ]);
    }
  }

  return composed;
};

export const main = async (lines: string[]): Promise<number | string> => {
  const seeds = lines[0]
    .split(":")
    .at(1)!
    .split(" ")
    .filter((x) => x)
    .map((x) => parseInt(x));

  const intervals = getIntervals(lines);
  intervals.forEach((interval, i) => {
    console.log(" ==== ");
    //    console.log(interval);
    console.log(constructPiecewiseFn(interval));
    const [a, b] = [
      constructPiecewiseFn(interval),
      constructPiecewiseFn(intervals[i + 1]),
    ];
    if (i === intervals.length - 1) return;
    console.log(compose(a, b));
  });

  return 0;
};

//

const isrun = process.argv.length > 1 && process.argv[1] === import.meta.path;
if (isrun) {
  const file = Bun.file("./problem.txt");
  const text = await file.text();
  const lines = text.split("\n").filter((x) => x && x.length);

  console.log("=== COMPUTATION ===\n");

  const answer = await main(lines);

  console.log("\n=== /COMPUTATION ===\n");

  console.log("=== ANSWER TO P2 ===");
  console.log(answer);
}
