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
    static parse(rulesString, name) {
        const rules = {};

        // Construct all rules, with their args.
        rulesString.split(RULE_SEPARATOR).map(ruleString => {
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
     * @param {String} rule
     * @param {Array} args
     * @param {String} input
     * @param {String=} message
     * @returns {Object}
     */
    static test(rule, args, input, message) {
        if (!Validators.hasOwnProperty(rule)) {
            return {
                padded: false,
                error: 'Failed validation'
            };
        }

        // Add input to beginning of args array.
        args.unshift(Utils.cleanInput(input));

        // Add message to end of array.
        args.push(message);

        // Format name
        args[1] = Utils.cleanName(args[1]);

        return Validators[rule](...args);
    }

    /**
     * Add the given rule to the Validators object, if it
     * doesn't already exist.
     *
     * @param {String} rule
     * @param {Function} validator
     */
    static add(rule, validator) {
        if (!Validators.hasOwnProperty(rule)) {
            Validators[rule] = validator;
        }
    }
}
