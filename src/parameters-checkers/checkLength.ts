import { ErrorTypes, QueryError } from "../request_data";
import { Params } from "../params";

const checkLength = (output: Params, errors: QueryError[]) => {
  //#region length params check
  if (output.length && (output.max_length || output.min_length)) {
    errors.push({
      code: ErrorTypes.INCONSISTENT_QUERY_PARAMS,
      message: "Length params cannot be used with max_length or min_length",
    });
    delete output.max_length;
    delete output.min_length;
  }
  if (output.max_length < output.min_length) {
    errors.push({
      code: ErrorTypes.INCONSISTENT_QUERY_PARAMS,
      message:
        "max_length cannot be less than min_length, permuting max and min length",
    });
    //permute max_length and min_length
    const temp = output.max_length;
    output.max_length = output.min_length;
    output.min_length = temp;
  }
  //#endregion
};

export { checkLength };
