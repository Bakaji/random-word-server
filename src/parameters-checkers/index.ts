import { QueryError } from "../request_data";
import { Params } from "../params";
import { checkLength } from "./checkLength";
import { checkMatch } from "./checkRegex";
import { checkWordCount } from "./checkWordCount";

const checkers: ((output: Params, errors: QueryError[]) => void)[] = [
  checkLength,
  checkMatch,
  checkWordCount,
];

function performChecks(output: Params, errors: QueryError[]) {
  checkers.forEach((c) => c(output, errors));
}

export { performChecks };
