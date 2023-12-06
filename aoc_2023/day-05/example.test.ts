import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2, compose, type Pair } from "./part_2";

const example = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n");

//test("part1", async () => {
//  const answer = 35;
//  const res = await part1(example);
//  expect(res).toEqual(answer);
//});

//test("part2", async () => {
//  const answer = 46;
//  const res = await part2(example);
//  expect(res).toEqual(answer);
//});

test("compose", () => {
  const f1: [Pair, Pair][] = [
    [
      [0, 32],
      [3, 35],
    ],
    [
      [33, Infinity],
      [33, Infinity],
    ],
  ];
  const f2: [Pair, Pair][] = [
    [
      [0, 17],
      [-2, 15],
    ],
    [
      [18, Infinity],
      [25, Infinity],
    ],
  ];

  const f1f2: [Pair, Pair][] = [
    [
      [0, 14],
      [1, 15],
    ],
    [
      [15, 32],
      [25, 42],
    ],
    [
      [33, Infinity],
      [40, Infinity],
    ],
  ];

  expect(compose(f1, f2)).toEqual(f1f2);
});

test("compose", () => {
  const f1: [Pair, Pair][] = [
    [
      [0, 68],
      [1, 69],
    ],
    [
      [69, 69],
      [0, 0],
    ],
    [
      [70, 4398046511104],
      [70, 4398046511104],
    ],
  ];
  const f2: [Pair, Pair][] = [
    [
      [0, 55],
      [0, 55],
    ],
    [
      [56, 92],
      [60, 96],
    ],
    [
      [93, 96],
      [56, 59],
    ],
    [
      [97, 4398046511104],
      [97, 4398046511104],
    ],
  ];

  const f1f2: [Pair, Pair][] = [
    [
      [0, 54],
      [1, 55],
    ],
    [
      [55, 68],
      [60, 73],
    ],
    [
      [69, 69],
      [0, 0],
    ],
    [
      [70, 92],
      [74, 96],
    ],
    [
      [93, 96],
      [56, 59],
    ],
    [
      [97, 4398046511104],
      [97, 4398046511104],
    ],
  ];

  expect(compose(f1, f2)).toEqual(f1f2);
});
