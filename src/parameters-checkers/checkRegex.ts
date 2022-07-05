import { ErrorTypes, QueryError } from "../request_data";
import { Params } from "../params";

const checkMatch = (output: Params, errors: QueryError[]) => {
  if (output.match) {
    try {
      new RegExp(output.match);
    } catch (e) {
      errors.push({
        code: ErrorTypes.INVALID_REGEX,
        message: e.message,
      });
      delete output.match;
    }
  }
};

export{
    checkMatch
}