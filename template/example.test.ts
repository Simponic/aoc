import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

// const example = ``;
const example = `1 2 3 4 5`.split(" ");

test("part1", async () => {
  const answer = 5;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 5 + 5;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
