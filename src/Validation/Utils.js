export default class Utils {
    /**
     * Clean the given input.
     *
     * @param {String} input
     * @returns {String}
     */
    static cleanInput(input) {
        return String(input).trim();
    }

    /**
     * Clean the given name.
     *
     * @param {String} name
     * @returns {String}
     */
    static cleanName(name) {
        return String(name).split(/[_|-]+/).join(' ');
    }

    /**
     * Returns an empty string if given input is undefined or null.
     *
     * @param {*} input
     * @return {*}
     */
    static empty(input) {
        if (input === undefined || input === null) {
            return '';
        }
        return input;
    }
}
