export default {
    required(input, name, message) {
        return {
            passed: typeof input === 'object' ? (input && input.size > 0) : input.length > 0,
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
            passed: input.length === 0 || /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input),
            error: message || `The ${name} field is not a valid email`
        };
    },
    pattern(input, name, regex, message) {
        return {
            passed: input.length === 0 || new RegExp(regex).test(input),
            error: message || `The ${name} field does not match the pattern ${regex}`
        };
    },
    in(input, name, values, message) {
        return {
            passed: input.length === 0 || values.indexOf(input) > -1,
            error: message || `The ${name} field must contain one of these values ${values.join(',')}`
        };
    },
    url(input, name, message) {
        return {
            passed: input.length === 0 || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(input),
            error: message || `The ${name} field must be a valid URL`
        };
    },
    uk_mobile(input, name, message) {
        return {
            passed: input.length === 0 || /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/.test(input),
            error: message || `The ${name} field must be a valid UK mobile number`
        };
    },
    us_mobile(input, name, message) {
        return {
            passed: input.length === 0 || /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(input),
            error: message || `The ${name} field must be a valid US mobile number`
        };
    },
    uk_postcode(input, name, message) {
        return {
            passed: input.length === 0 || /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/.test(input),
            error: message || `The ${name} field must be a valid UK postcode`
        };
    },
    us_postcode(input, name, message) {
        return {
            passed: input.length === 0 || /^\d{5}(?:[-\s]\d{4})?$/.test(input),
            error: message || `The ${name} field must be a valid US postcode`
        };
    },
    checked(input, name, message) {
        return {
            passed: input.length === 0 || (typeof input === 'string' ? input === 'true' : Boolean(input)),
            error: message || `The ${name} field must be checked`
        };
    },
    words_min(input, name, value, message) {
        return {
            passed: input.split(/\s+/).length >= value,
            error: message || `The ${name} field must be ${value} or more words`
        };
    },
    words_max(input, name, value, message) {
        return {
            passed: input.split(/\s+/).length <= value,
            error: message || `The ${name} field must be ${value} or less words`
        };
    },
    file_max(file, name, value, message) {
        let size = file.size === 0 ? 0.01 : file.size;
        size = parseFloat(((size / 1024) / 1024).toFixed(4));
        return {
            passed: size <= parseFloat(value),
            error: message || `The ${name} field must be ${value}MB or less in size`
        };
    },
    file_min(file, name, value, message) {
        let size = file.size === 0 ? 0.01 : file.size;
        size = parseFloat(((size / 1024) / 1024).toFixed(4));
        return {
            passed: size >= parseFloat(value),
            error: message || `The ${name} field must be ${value}MB or less in size`
        };
    }
}
