import { Request } from "express";
import { toNatural } from "./helpers/convertToNumber";
import { filterNullValues } from "./helpers/filterNullValues";
import { performChecks } from "./parameters-checkers";
import { ErrorTypes, QueryError } from "./request_data";

export type ParamsType = {
  word_count?: number | null;
  lang?: string | null;
  length?: number | null;
  min_length?: number | null;
  max_length?: number | null;
  match?: string | null;
};

export class Params implements ParamsType {
  word_count?: number | null;
  lang?: string | null;
  length?: number | null;
  min_length?: number | null;
  max_length?: number | null;
  match?: string;

  public static fromRequest(req: Request): {
    params: Params;
    errors: QueryError[];
  } {
    const { query, body }: { query: any; body: any } = req;
    const errors: QueryError[] = [];
    let output: Params = {};
    if (
      Object.keys(req.body).length != 0 &&
      Object.keys(req.query).length != 0
    ) {
      errors.push({
        message:
          "Params exists in both query and body, prioritising body over query parameters",
        code: ErrorTypes.CODE_BOTH_PARAMS_USED,
      });
    }
    output.lang = body.lang ?? query.lang ?? null;
    output.match = body.match ?? query.match ?? null;
    output.word_count = toNatural(
      body.word_count ?? query.word_count,
      "word_count",
      errors
    );
    output.length = toNatural(body.length ?? query.length, "length", errors);
    output.min_length = toNatural(
      body.min_length ?? query.min_length,
      "min_length",
      errors
    );
    output.max_length = toNatural(
      body.max_length ?? query.max_length,
      "max_length",
      errors
    );

    //check for input errors
    performChecks(output, errors);

    return {
      params: filterNullValues(output),
      errors,
    };
  }
}

//#region Helper functions

//#endregion
