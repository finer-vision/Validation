import Rule from "./Rule";
import Error from "./Error";

module.exports = class Validation {
    constructor() {
        this.errors = [];
        this.fields = [];
        this.verdict = {};
    }

    /**
     * Alias for the add method in the Rule class.
     *
     * @param {String} rule
     * @param {Function} validator
     */
    static addRule(rule, validator) {
        Rule.add(rule, validator);
    }

    /**
     * Get all errors for each field.
     *
     * @returns {Object}
     */
    getNamedErrors() {
        const errors = {};
        for (let field in this.verdict) {
            if (!this.verdict.hasOwnProperty(field)) {
                continue;
            }
            errors[field] = this.verdict[field].errors;
        }
        return errors;
    }

    /**
     * Get all errors for a given field (if specified, else get
     * all errors for all fields).
     *
     * @param {String=} field
     * @returns {Array}
     */
    getErrors(field) {
        if (!field) {
            return this.errors;
        }

        if (this.fields.indexOf(field) === -1) {
            return [];
        }

        return this.verdict[field].errors;
    }

    /**
     * Get the first error of the field, if exists, else return
     * an empty string.
     *
     * @param {String} field
     * @returns {String}
     */
    getError(field) {
        if (this.fields.indexOf(field) === -1 || !this.verdict.hasOwnProperty(field)) {
            return '';
        }
        return this.verdict[field].errors[0] || '';
    }

    /**
     * Test the given input against the given rules.
     *
     * @param {Object} input
     * @param {Object} rules
     * @param {Object=} messages
     * @returns {Validation}
     */
    validate(input, rules, messages) {
        const validation = {};
        this.fields = Object.keys(input);

        for (let rule in rules) {
            if (!rules.hasOwnProperty(rule)) {
                continue;
            }

            // Ensure all fields have at least an empty value
            if (!input.hasOwnProperty(rule)) {
                input[rule] = '';
            }

            // Add parsed rules for input inside validation object.
            validation[rule] = Rule.parse(rules[rule], rule);
        }

        const verdict = {};

        // Run tests for each input field.
        for (let field in validation) {
            if (!validation.hasOwnProperty(field)) {
                continue;
            }

            for (let rule in validation[field]) {
                if (!validation[field].hasOwnProperty(rule)) {
                    continue;
                }

                if (!verdict.hasOwnProperty(field)) {
                    verdict[field] = {};
                }

                let message = null;

                if (messages && messages.hasOwnProperty(field) && messages[field].hasOwnProperty(rule)) {
                    message = messages[field][rule];
                }

                // Add result of test to verdict object.
                verdict[field][rule] = Rule.test(input, rule, validation[field][rule], input[field], message);
            }

            verdict[field].errors = Error.getErrors(verdict[field]);
        }

        this.errors = Error.getAllErrors(verdict);
        this.verdict = verdict;

        return this;
    }
}
