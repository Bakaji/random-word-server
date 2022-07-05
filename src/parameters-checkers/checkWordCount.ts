import { ErrorTypes, QueryError } from "../request_data";
import { Params } from "../params";

const checkWordCount = (output: Params, errors: QueryError[]) => {
  if (!output.word_count) output.word_count = 100;
  if (output.word_count > 100) {
    errors.push({
      code: ErrorTypes.MAX_WORD_COUNT,
      message: `you requested ${output.word_count} word. however, maximum possible word count is 100`,
    });
    output.word_count = 100;
  }
};

/** @internal */
export { checkWordCount };
