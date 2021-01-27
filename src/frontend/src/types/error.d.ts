export namespace $Error {
  type ErrorMap = {
    [statusCode: number]: any;
  };

  type CustomHandler = ErrorMap | undefined;
}
