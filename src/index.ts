import RuleParser from "./RuleParser";

class Validation {
  private errors: ErrorMap = {};
  private ruleParser = new RuleParser();

  validate(data: DataMap, rules: RuleMap, messages: MessageMap = {}): boolean {
    const parsedRules: ParsedRules = this.ruleParser.parse(rules, messages);

    for (const field in parsedRules) {
      if (!parsedRules.hasOwnProperty(field)) {
        continue;
      }

      if (!this.errors.hasOwnProperty(field)) {
        this.errors[field] = [];
      }

      for (const rule in parsedRules[field]) {
        if (!parsedRules[field].hasOwnProperty(rule)) {
          continue;
        }

        const {validator, args} = parsedRules[field][rule];
        const input = data.hasOwnProperty(field) ? data[field] : '';

        if (validator.validate(input, args)) {
          continue;
        }

        this.errors[field].push(validator.getMessage(field, args, messages));
      }
    }

    return false;
  }

  getErrors(): object {
    return {...this.errors};
  }
}

// @todo remove everything below this line once finished testing

const validation = new Validation();

const data = {
  name: 'James',
  character: 'ceo',
  age: 16,
};

const rules = {
  name: 'required',
  character: 'required|in:ceo,cfo,cto',
  age: 'min:18',
};

const messages = {
  age: {
    min: 'You must be :min or older to register',
  },
};

if (!validation.validate(data, rules, messages)) {
  console.log(validation.getErrors());
} else {
  console.log('Validation passed');
}
