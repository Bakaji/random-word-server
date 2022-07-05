import { Params, ParamsType } from "./params";
import { words } from "./loader";
enum ErrorTypes {
  INCONSISTENT_QUERY_PARAMS = "INCONSISTENT_QUERY_PARAMS",
  INVALID_REGEX = "INVALID_REGEX",
  NO_RESULTS = "NO_RESULTS",
  OVERLOAD_ARGS = "OVERLOAD_ARGS",
  CODE_BOTH_PARAMS_USED = "CODE_BOTH_PARAMS_USED",
  MAX_WORD_COUNT = "MAX_WORD_COUNT",
  PARSING_ERROR = "PARSING_ERROR",
}
class QueryError {
  code: ErrorTypes;
  message: string;

  constructor(code: ErrorTypes, message: string) {
    this.code = code;
    this.message = message;
  }
  public toString(): string {
    return `${this.code}: ${this.message}`;
  }
}

interface RequestDataBase {
  params: ParamsType;
  errors: QueryError[];
  results: string[];
}

class RequestData implements RequestDataBase {
  params: ParamsType = {
    lang: null,
    max_length: null,
    length: null,
    min_length: null,
    word_count: null,
    match: null,
  };

  errors: QueryError[];
  results: string[];

  constructor(params: Params, errors: QueryError[]) {
    this.results = [];
    words.forEach((w) => this.results.push(w));
    this.params = params;
    this.errors = errors ?? [];
  }
}

export { RequestData, QueryError, ErrorTypes };
