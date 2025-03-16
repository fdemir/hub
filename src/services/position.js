export class PositionService {
  /**
   * @returns {Array<{value: string, label: string}>}
   */
  static async getPositions() {
    return [
      { value: "1", label: "Developer" },
      { value: "2", label: "Designer" },
    ];
  }
}
