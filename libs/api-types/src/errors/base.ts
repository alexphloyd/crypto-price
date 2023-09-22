export type BaseError =
  | {
      data: {
        message: string | undefined;
        statusCode: number;
      };
      status: number;
    }
  | undefined;
