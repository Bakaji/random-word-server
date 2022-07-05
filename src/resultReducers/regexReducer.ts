import { ErrorTypes, QueryError, RequestData } from "../request_data";

export function regexReducer(requestData: RequestData): RequestData {
  const { match } = requestData.params;

  if (match) {
    try {
      const regex = new RegExp(match);
      requestData.results = requestData.results.filter((w) => regex.test(w));
    } catch {
      requestData.errors.push(
        new QueryError(ErrorTypes.INVALID_REGEX, "invalid regex")
      );
    }
  }
  return requestData;
}
