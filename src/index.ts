import express from "express";
import { loadWords } from "./loader";
import { Params } from "./params";
import { RequestData } from "./request_data";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { reduce } from "./resultReducers";
import { swaggerOptions } from "./docs";
import cors from "cors";
require("dotenv").config();

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === "development";

const app = express();
app.use(express.json());
app.use(cors());
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

loadWords();

app.post("/random-word", (req: express.Request, res: express.Response) => {
  //initialize operation parameters and arrays
  const { params, errors }: any = Params.fromRequest(req);
  const requestData: RequestData = new RequestData(params, errors);

  /*  
      execute reducer (reducer takes the whole words table then reduce and
      filter it using passed criteria from parsed body) to get results 
  */
  const result: RequestData = reduce(requestData);

  const reponseBody: any = {
    params: result.params,
    errors: result.errors,
    results: result.results,
  };
  if (isDev) {
    reponseBody.devNote = `check swagger documenttation 
      for more info at /api-docs`;
  }
  if (result.results.length > 0) {
    res.status(200).json(reponseBody);
  } else {
    res.status(404).json(reponseBody);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
