import Validator from "./Validator";

export default class Required extends Validator {
  validate(input: string): boolean {
    return input.trim().length > 0;
  }

  getMessage(field: string, args: Array<any>, messages: MessageMap): string {
    if (messages.hasOwnProperty(field) && messages[field].hasOwnProperty('required')) {
      return messages[field].required.split(':field').join(field);
    }
    return `The ${field} field is required`;
  }
}
