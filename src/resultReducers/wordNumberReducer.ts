import { RequestData } from "../request_data";

function wordNumberReducer(requestData: RequestData): RequestData {
  const { word_count } = requestData.params;
  if (word_count && requestData.results.length >= word_count) {
    const oldTable: string[] = requestData.results,
      newTable: string[] = [];
    oldTable.concat(requestData.results);
    while (newTable.length < word_count && oldTable.length > 0) {
      const randomIndex = Math.floor(Math.random() * oldTable.length);
      newTable.push(oldTable[randomIndex]);
      oldTable.splice(randomIndex, 1);
    }
    requestData.results = newTable;
  }
  return requestData;
}

export { wordNumberReducer };
