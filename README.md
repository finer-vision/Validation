# FV Validation

Laravel inspired, dependency-free, JavaScript validation library.

## Usage

```js
import Validation from "fv-validation";

// Add a validation rule
Validation.addRule('in', (input, name, values) => {
    return {
        passed: values.indexOf(input) > -1,
        error: `The ${name} field must contain one of these values ${values.join(',')}`
    };
});

const input = {
    name: 'Finer Vision',
    email: 'finer.vision@finervision.com'
};

const rules = {
    name: 'required,max:255,in:1|2|3',
    email: 'required,email,max:255'
};

const validation = new Validation;
validation.validate(input, rules);

// All errors for all fields
console.log(validation.getErrors());

// All errors for single field
console.log(validation.getErrors('email'));
```

## Available Rules

#### Required
Value length must be greater than zero.

Usage: 'required'

#### Min (number)
Value length must be equal to or greater than the given number.

Usage: 'min:5'

#### Max (number)
Value length must be equal to or less than the given number.

Usage: 'max:5'

#### Email
Value must be an email.

Usage: 'email'

#### Pattern (Regex)
Value must match the given regex.

Usage: 'pattern:/d+/'

#### In (Values)
Value must be equal to the given values.

Usage: 'in:1|2|3'

#### URL (Values)
Value must be a valid URL.

Usage: 'url'

#### UK Mobile
Values must me a valid UK mobile number.

Usage: 'uk_mobile'

#### US Mobile
Values must me a valid US mobile number.

Usage: 'us_mobile'

#### UK Postcode
Values must me a valid UK postcode.

Usage: 'uk_postcode'

#### US Postcode
Values must me a valid US postcode.

Usage: 'us_postcode'

