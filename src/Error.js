export default class Error {
  /**
   * Compile an array of errors from the results object.
   *
   * @param {Object} results
   * @returns {Array}
   */
  static getErrors (results) {
    const errors = [];

    for (let result in results) {
      if (!results.hasOwnProperty(result)) {
        continue;
      }

      if (!results[result].passed) {
        errors.push(results[result].error);
      }
    }

    return errors;
  }

  /**
   * Get all errors from the verdict object.
   *
   * @param {Object} verdict
   * @returns {Array}
   */
  static getAllErrors (verdict) {
    let errors = [];

    for (let field in verdict) {
      if (!verdict.hasOwnProperty(field)) {
        continue;
      }

      errors = errors.concat(verdict[field].errors);
    }

    return errors;
  }
}
