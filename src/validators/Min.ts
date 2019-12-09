import Validator from "./Validator";

export default class Min extends Validator {
  validate(input: string | number, [min]: Array<string>): boolean {
    if (input === '') {
      return true;
    }

    if (typeof input === 'string') {
      input = parseFloat(input);
    }

    return input >= parseFloat(min);
  }

  getMessage(field: string, [min]: Array<string>, messages: MessageMap): string {
    if (messages.hasOwnProperty(field) && messages[field].hasOwnProperty('min')) {
      return messages[field].min.split(':field').join(field).split(':min').join(min);
    }
    return `The ${field} field must be ${min} or more`;
  }
}
