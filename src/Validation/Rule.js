import Validators from "./Validators";
import Utils from "./Utils";

export default class Rule {
    /**
     * Parse the rule string (e.g. required,email,max:255)
     * and return the rules.
     *
     * @param {String} rulesString
     * @param {String} name
     * @returns {Object}
     */
    static parse(rulesString, name) {
        const rules = {};

        // Construct all rules, with their args.
        rulesString.split(',').map(ruleString => {
            const args = ruleString.split(':').map(arg => {
                const array = arg.split('|');

                if (array.length === 1) {
                    return arg;
                }

                return array;
            });

            // Add rule, with args, to rules object.
            rules[args[0]] = args.length > 1 ? args.slice(1, args.length) : [];
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
            throw new Error(`Rule ${rule} does not exist.`);
        }

        // Add input to beginning of args array.
        args.unshift(Utils.clean(input));

        // Add message to end of array.
        args.push(message);

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
