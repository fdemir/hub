import { DepartmentService } from "./department";
import { assert } from "@open-wc/testing";

suite("DepartmentService", () => {
  test("getDepartments returns array of departments", async () => {
    const departments = await DepartmentService.getDepartments();

    assert.isArray(departments);
    assert.isNotEmpty(departments);
    assert.lengthOf(departments, 2);

    departments.forEach((department) => {
      assert.hasAllKeys(department, ["value", "label"]);
      assert.isString(department.value);
      assert.isString(department.label);
    });
  });

  test("getDepartments returns expected department data", async () => {
    const departments = await DepartmentService.getDepartments();

    assert.deepInclude(departments, { value: "1", label: "Tech" });
    assert.deepInclude(departments, { value: "2", label: "Analytics" });
  });
});
