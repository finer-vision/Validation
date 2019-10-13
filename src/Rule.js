import Validators from "./Validators";
import Utils from "./Utils";

const RULE_SEPARATOR = '|';
const PARAMETER_SEPARATOR = ':';
const ARGUMENT_SEPARATOR = ',';

export default class Rule {
  /**
   * Parse the rule string (e.g. required|max:255|in:1,2,3)
   * and return the rules.
   *
   * @param {String} rulesString
   * @param {String} name
   * @returns {Object}
   */
  static parse (rulesString, name) {
    const rules = {};
    const rulesRegex = new RegExp(`${'\\' + RULE_SEPARATOR}(?=(${Object.keys(Validators).join('|')}))`);

    // Construct all rules, with their args.
    rulesString.split(rulesRegex).map(ruleString => {
      const args = ruleString.split(PARAMETER_SEPARATOR).map(arg => arg.split(ARGUMENT_SEPARATOR));

      // Add rule, with args, to rules object.
      rules[args[0]] = args.slice(1, args.length);
      rules[args[0]].unshift(name);
    });

    return rules;
  }

  /**
   * Test the given input against the given rule.
   *
   * @param {Object} inputs
   * @param {String} rule
   * @param {Array} args
   * @param {String} input
   * @param {String=} message
   * @returns {Object}
   */
  static test (inputs, rule, args, input, message) {
    if (!Validators.hasOwnProperty(rule)) {
      console.error(`Rule ${rule} does not exist`);

      return {
        passed: false,
        error: 'Failed validation'
      };
    }

    // Don't clean objects.
    input = typeof input === 'object' ? input : Utils.cleanInput(input);
    input = Utils.empty(input);

    // Add input to beginning of args array.
    args.unshift(input);

    // Add message to end of array.
    args.push(message);

    // Format name
    args[1] = Utils.cleanName(args[1]);

    return Validators[rule](inputs, ...args);
  }

  /**
   * Add the given rule to the Validators object, if it
   * doesn't already exist.
   *
   * @param {String} rule
   * @param {Function} validator
   */
  static add (rule, validator) {
    Validators[rule] = validator;
  }
}
