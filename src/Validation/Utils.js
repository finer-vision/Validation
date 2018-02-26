export default class {
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
}
