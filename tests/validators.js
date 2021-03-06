import {equal} from "assert";
import {describe, it} from "mocha";
import Validation from "../src/index";

const validation = new Validation;

// Fake file instance.
const fileSmall = {
    size: 1000000 // 1MB in bytes
};

const fileLarge = {
    size: 20000000 // 20MB in bytes
};

describe('Validators', () => {
    describe('Required', () => {
        const rule = 'required';

        it('passes validation if the field has a value', () => {
            const validator = validation.validate({field: 'value'}, {field: 'required'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field has no value', () => {
            const validator = validation.validate({field: ''}, {field: 'required'});
            equal(validator.verdict.field[rule].passed, false);
        });

        it('fails validation if the field is not in the given inputs', () => {
            const validator = validation.validate({}, {field: 'required'});
            equal(validator.verdict.field[rule].passed, false);
        });

        it('passed validation if the field has a value and is a file', () => {
            const validator = validation.validate({file: fileSmall}, {file: 'required'});
            equal(validator.verdict.file[rule].passed, true);
        });
    });

    describe('Min', () => {
        const rule = 'min';

        it('passes validation if the field has a value greater or equal to 5', () => {
            const validator = validation.validate({field: 'value'}, {field: 'min:5'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field has a value less than 5', () => {
            const validator = validation.validate({field: ''}, {field: 'min:5'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Max', () => {
        const rule = 'max';

        it('passes validation if the field has a value less or equal to 5', () => {
            const validator = validation.validate({field: 'value'}, {field: 'max:5'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field has a value greater than 5', () => {
            const validator = validation.validate({field: 'long value'}, {field: 'max:5'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Email', () => {
        const rule = 'email';

        it('passes validation if the field has a valid email', () => {
            const validator = validation.validate({field: 'name@domain.tld'}, {field: 'email'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field has an invalid email', () => {
            const validator = validation.validate({field: 'name@domain'}, {field: 'email'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Pattern', () => {
        const rule = 'pattern';

        it('passes validation if the field matches the pattern', () => {
            const validator = validation.validate({field: '1234'}, {field: 'pattern:^\\d{4}$'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('passes validation if complex regex is set', () => {
            const validator = validation.validate({field: 'A'}, {field: 'pattern:^[a-z|A-Z]$'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field does not match the pattern', () => {
            const validator = validation.validate({field: 'four'}, {field: 'pattern:^\\d{4}$'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('In', () => {
        const rule = 'in';

        it('passes validation if the field value in in the list', () => {
            const validator = validation.validate({field: '1'}, {field: 'in:1,2,3'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field value in not in the list', () => {
            const validator = validation.validate({field: '4'}, {field: 'in:1,2,3'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('URL', () => {
        const rule = 'url';

        it('passes validation if the field is a valid URL', () => {
            const validator = validation.validate({field: 'http://example.com'}, {field: 'url'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not a valid URL', () => {
            const validator = validation.validate({field: 'http://example'}, {field: 'url'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('UK Mobile', () => {
        const rule = 'uk_mobile';

        it('passes validation if the field is a valid UK mobile number', () => {
            const validator = validation.validate({field: '07596731069'}, {field: 'uk_mobile'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not a valid UK mobile number', () => {
            const validator = validation.validate({field: '007596731069'}, {field: 'uk_mobile'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('US Mobile', () => {
        const rule = 'us_mobile';

        it('passes validation if the field is a valid US mobile number', () => {
            const validator = validation.validate({field: '(541) 754-3010'}, {field: 'us_mobile'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not a valid US mobile number', () => {
            const validator = validation.validate({field: '(5413) 754-3010'}, {field: 'us_mobile'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('UK Postcode', () => {
        const rule = 'uk_postcode';

        it('passes validation if the field is a valid UK postcode', () => {
            const validator = validation.validate({field: 'SE1 0HG'}, {field: 'uk_postcode'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not a valid UK postcode', () => {
            const validator = validation.validate({field: 'SE12Z 0HG'}, {field: 'uk_postcode'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('US Postcode', () => {
        const rule = 'us_postcode';

        it('passes validation if the field is a valid US postcode', () => {
            const validator = validation.validate({field: '10023'}, {field: 'us_postcode'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not a valid US postcode', () => {
            const validator = validation.validate({field: '100239'}, {field: 'us_postcode'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Checked', () => {
        const rule = 'checked';

        it('passes validation if the field is checked', () => {
            const validator = validation.validate({field: true}, {field: 'checked'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not checked', () => {
            const validator = validation.validate({field: false}, {field: 'checked'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Words Min', () => {
        const rule = 'words_min';

        it('passes validation if the field has 3 or more words', () => {
            const validator = validation.validate({field: 'one two three'}, {field: 'words_min:3'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field has less than 3 words', () => {
            const validator = validation.validate({field: 'one two'}, {field: 'words_min:3'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Words Max', () => {
        const rule = 'words_max';

        it('passes validation if the field has 3 or less words', () => {
            const validator = validation.validate({field: 'one two three'}, {field: 'words_max:3'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field has more than 3 words', () => {
            const validator = validation.validate({field: 'one two three four'}, {field: 'words_max:3'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('File Max', () => {
        const rule = 'file_max';

        it('passes validation if the file size is less than or equal to 5MB', () => {
            const validator = validation.validate({file: fileSmall}, {file: 'file_max:5'});
            equal(validator.verdict.file[rule].passed, true);
        });

        it('fails validation if the file size is more than 5MB', () => {
            const validator = validation.validate({file: fileLarge}, {file: 'file_max:5'});
            equal(validator.verdict.file[rule].passed, false);
        });
    });

    describe('File Min', () => {
        const rule = 'file_min';

        it('passes validation if the file size is more than or equal to 5MB', () => {
            const validator = validation.validate({file: fileLarge}, {file: 'file_min:5'});
            equal(validator.verdict.file[rule].passed, true);
        });

        it('fails validation if the file size is less than 5MB', () => {
            const validator = validation.validate({file: fileSmall}, {file: 'file_min:5'});
            equal(validator.verdict.file[rule].passed, false);
        });
    });

    describe('Error messages have nicely formatted names', () => {
        const rule = 'required';

        it('field names are formatted nicely', () => {
            const validator = validation.validate({unfriendly_field_name: ''}, {unfriendly_field_name: 'required'});
            equal(
                validator.verdict.unfriendly_field_name[rule].error,
                'The unfriendly field name field is required'
            );
        });
    });

    describe('Number', () => {
        const rule = 'number';

        it('passes validation if the field is a number', () => {
            const validator = validation.validate({field: '20'}, {field: 'number'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('passes validation if the field is a number that is zero', () => {
            const validator = validation.validate({field: '0'}, {field: 'number'});
            equal(validator.verdict.field[rule].passed, true);
        });

        it('fails validation if the field is not a number', () => {
            const validator = validation.validate({field: 'twenty'}, {field: 'number'});
            equal(validator.verdict.field[rule].passed, false);
        });

        it('fails validation if the field starts with a number but contains non-numbers', () => {
            const validator = validation.validate({field: '2two'}, {field: 'number'});
            equal(validator.verdict.field[rule].passed, false);
        });
    });

    describe('Matches', () => {
        const rule = 'matches';

        it('passes validation if the field matches another field', () => {
            const validator = validation.validate({fieldA: '20', fieldB: '20'}, {fieldA: 'matches:fieldB'});
            equal(validator.verdict.fieldA[rule].passed, true);
        });

        it("fails validation if the field doesn't match the another field", () => {
            const validator = validation.validate({fieldA: '20', fieldB: '21'}, {fieldA: 'matches:fieldB'});
            equal(validator.verdict.fieldA[rule].passed, false);
        });
    });

    describe('Complex', () => {
        it('passes validation for multiple complex rules', () => {
            const validator = validation.validate({fieldA: '20', fieldB: '20'}, {
                fieldA: 'required|min:2|matches:fieldB',
            });
            equal(validator.verdict.fieldA['required'].passed, true);
            equal(validator.verdict.fieldA['min'].passed, true);
            equal(validator.verdict.fieldA['matches'].passed, true);
        });
    });
});
