import Required from "./validators/Required";
import In from "./validators/In";
import Min from "./validators/Min";

export default class RuleParser {
  private validators: Validators = {
    required: new Required(),
    in: new In(),
    min: new Min(),
  };

  parse(rules: DataMap, messages: MessageMap): ParsedRules {
    const parsedRules: ParsedRules = {};

    for (const field in rules) {
      if (!rules.hasOwnProperty(field)) {
        continue;
      }

      const fieldRules = String(rules[field]).split('|');

      parsedRules[field] = {};

      for (let i = 0, length = fieldRules.length; i < length; i++) {
        const [rule, args] = fieldRules[i].split(':');

        if (!this.validators.hasOwnProperty(rule)) {
          throw new Error(`Rule "${rule}" is not defined`);
        }

        parsedRules[field][rule] = {
          validator: this.validators[rule],
          args: [],
        };

        if (args !== undefined) {
          parsedRules[field][rule].args = args.split(',');
        }

        if (messages.hasOwnProperty(field)) {
          parsedRules[field][rule].message = messages[field];
        }
      }
    }

    return parsedRules;
  }
}
