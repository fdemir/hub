export class DepartmentService {
  /**
   * @returns {Array<{value: string, label: string}>}
   */
  static async getDepartments() {
    return [
      { value: "1", label: "Tech" },
      { value: "2", label: "Analytics" },
    ];
  }
}
