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
    },
    url(input, name, message) {
        return {
            passed: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(input),
            error: message || `The ${name} field must be a valid URL`
        };
    }
}
