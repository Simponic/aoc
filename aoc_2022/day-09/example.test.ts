import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split("\n");
const example2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split("\n");
//const example = `1 2 3 4 5`.split(" ");

test("part1", async () => {
  const answer = 13;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 36;
  const res = await part2(example2);
  expect(res).toEqual(answer);
});
