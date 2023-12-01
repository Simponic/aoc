import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

const example = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split("\n");

test("part1", async () => {
  const answer = 150;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 900;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
