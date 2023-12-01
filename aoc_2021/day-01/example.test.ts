import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

const example = `199
200
208
210
200
207
240
269
260
263`.split("\n");

test("part1", async () => {
  const answer = 7;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 5;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
