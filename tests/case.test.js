import test from "node:test";
import assert from "node:assert/strict";
import { chapters, isCorrect, initialGame, readSave } from "../src/case.js";
test("all deductions accept only the solution supported by the story", () => {
  const solutions = [2, 2, "19982", 1, 0];
  chapters.forEach((c, i) => {
    assert.equal(isCorrect(i, solutions[i]), true);
    assert.equal(
      isCorrect(i, c.input ? "19984" : (solutions[i] + 1) % 3),
      false,
    );
    assert.equal(c.clues.length, 2);
    assert.ok(c.clues.every((side) => side.length === 2));
  });
});
test("saved progress survives reload and invalid storage recovers safely", () => {
  const progress = {
    ...initialGame,
    screen: "game",
    chapter: 3,
    solved: [0, 1, 2],
    notes: "frequência 63",
  };
  assert.deepEqual(
    readSave({ getItem: () => JSON.stringify(progress) }),
    progress,
  );
  for (const value of [
    "{",
    "null",
    JSON.stringify({ ...progress, chapter: 99 }),
    JSON.stringify({ ...progress, names: null }),
    JSON.stringify({ ...progress, read: "yes" }),
  ])
    assert.deepEqual(readSave({ getItem: () => value }), initialGame);
  assert.deepEqual(
    readSave({
      getItem() {
        throw Error("blocked");
      },
    }),
    initialGame,
  );
});
