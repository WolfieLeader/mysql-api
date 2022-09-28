/**Custom error that lets you decide which kind of status code this error should receive */
class CError extends Error {
  constructor(readonly message: string, readonly status: number = 500, readonly name: string = "CError") {
    super(message);
    this.status = status;
    super.name = "CError";
  }
}

export default CError;
