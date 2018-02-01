export default {
    required(input, name, message) {
        return {
            passed: input.length > 0,
            error: message || `The ${name} field is required`
        };
    },
    min(input, name, value, message) {
        return {
            passed: input.length >= value,
            error: message || `The ${name} field must be ${value} or more characters`
        };
    },
    max(input, name, value, message) {
        return {
            passed: input.length <= value,
            error: message || `The ${name} field must be ${value} or less characters`
        };
    },
    email(input, name, message) {
        return {
            passed: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input),
            error: message || `The ${name} field is not a valid email`
        };
    },
    pattern(input, name, regex, message) {
        return {
            passed: new RegExp(regex).test(input),
            error: message || `The ${name} field does not match the pattern ${regex}`
        };
    },
    in(input, name, values, message) {
        return {
            passed: values.indexOf(input) > -1,
            error: message || `The ${name} field must contain one of these values ${values.join(',')}`
        };
    }
}
