declare module $Error {
  type ErrorMap = {
    [statusCode: number]: any;
  };

  type CustomHandler = ErrorMap | undefined;
}
