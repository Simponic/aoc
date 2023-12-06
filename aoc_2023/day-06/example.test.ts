import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

const example = `Time:      7  15   30
Distance:  9  40  200`.split("\n");

test("part1", async () => {
  const answer = 288;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 71503;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
