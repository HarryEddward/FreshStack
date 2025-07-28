
export interface GlobalJSONResponse {
  v: string;
  method: string;

  meta: {
    [key: string]: unknown;
  };

  data:
    | {
        message: string;
        [key: string]: unknown;
      }
    | {
        [key: string]: unknown;
      };

  error:
    | {
        code: string;
        message: string;
      }
    | {}; // objeto vacío
}
