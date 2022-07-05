import { ErrorTypes } from "../request_data";
import { QueryError } from "../request_data";

type ConverstionArgs = {
  name: string;
  input: any;
  errors: QueryError[];
};
const toInt = (
  input: any,
  name: string,
  errors: QueryError[]
): number | null => {
  try {
    const val = parseInt(input);
    if (Number.isNaN(val)) throw new Error("not a number");
    return val;
  } catch {
    errors.push({
      code: ErrorTypes.PARSING_ERROR,
      message: `${name} is not a valid integer`,
    });
    return null;
  }
};

const toNatural = (
  input: any,
  name: string,
  errors: QueryError[]
): number | null => {
  if (!input) return null;
  input = toInt(input, name, errors);
  return input >= 0 ? input : null;
};

export { toNatural };
