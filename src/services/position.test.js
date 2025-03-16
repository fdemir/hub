import { PositionService } from "./position";
import { assert } from "@open-wc/testing";

suite("PositionService", () => {
  test("getPositions returns array of positions", async () => {
    const positions = await PositionService.getPositions();

    assert.isArray(positions);
    assert.isNotEmpty(positions);
    assert.lengthOf(positions, 2);

    positions.forEach((position) => {
      assert.hasAllKeys(position, ["value", "label"]);
      assert.isString(position.value);
      assert.isString(position.label);
    });
  });

  test("getPositions returns expected position data", async () => {
    const positions = await PositionService.getPositions();

    assert.deepInclude(positions, { value: "1", label: "Developer" });
    assert.deepInclude(positions, { value: "2", label: "Designer" });
  });
});
