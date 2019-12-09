interface Message {
  [key: string]: string;
}

interface MessageMap {
  [key: string]: Message;
}

interface RuleMap {
  [key: string]: string;
}

interface DataMap {
  [key: string]: string | number | File;
}

interface ErrorMap {
  [key: string]: Array<string>;
}

interface Validators {
  [key: string]: any,
}

interface ParsedRule {
  [key: string]: {
    validator: any;
    args: Array<string>;
    message?: string,
  },
}

interface ParsedRules {
  [key: string]: ParsedRule;
}
