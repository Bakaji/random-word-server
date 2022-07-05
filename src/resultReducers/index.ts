import { ErrorTypes, QueryError, RequestData } from "../request_data";
import { lengthReducer } from "./lengthHandler";
import { regexReducer } from "./regexReducer";
import { wordNumberReducer } from "./wordNumberReducer";

const reducers: ((rd: RequestData) => RequestData)[] = [
  lengthReducer,
  regexReducer,
  wordNumberReducer,
];

const reduce = (rd: RequestData) => {
  let lastReducerResultCount = -1;
  for (let i = 0; i < reducers.length; i++) {
    rd = reducers[i](rd);
    const currentCount = rd.results.length;
    if (currentCount === 0) {
      rd.errors.push(new QueryError(ErrorTypes.NO_RESULTS, "no results"));
      if (lastReducerResultCount != -1) {
        rd.errors.push(
          new QueryError(
            ErrorTypes.OVERLOAD_ARGS,
            "too much args,reduce number of args"
          )
        );
      }
      break;
    }
  }
  return rd;
};

export { reduce };
