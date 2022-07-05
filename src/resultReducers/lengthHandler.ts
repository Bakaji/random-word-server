import { ErrorTypes, QueryError, RequestData } from "../request_data";

function lengthReducer(requestData: RequestData): RequestData {
  const { params } = requestData;
  if (params.length) {
    requestData.results = requestData.results.filter(
      (w) => w.length == params.length
    );
  } else {
    if (params.min_length) {
      requestData.results = requestData.results.filter(
        (w) => w.length >= params.min_length
      );
    }
    if (params.max_length) {
      requestData.results = requestData.results.filter(
        (w) => w.length <= params.max_length
      );
    }
  }
  return requestData;
}
export { lengthReducer };
