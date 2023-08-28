export type BaseError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};
