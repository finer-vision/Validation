import Validator from "./Validator";

export default class In extends Validator {
  validate(input: string, allowed: Array<string>): boolean {
    return allowed.indexOf(input) > -1;
  }

  getMessage(field: string, [allowed]: Array<[]>, messages: MessageMap): string {
    if (messages.hasOwnProperty(field) && messages[field].hasOwnProperty('in')) {
      return messages[field].in.split(':field').join(field).split(':allowed').join(allowed.join(', '));
    }
    return `The ${field} field must be one of ${allowed.join(', ')}`;
  }
}
