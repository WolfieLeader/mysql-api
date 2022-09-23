class CError extends Error {
  constructor(readonly message: string, readonly status: number = 500, readonly name: string = "CError") {
    super(message);
    this.status = status;
    super.name = "CError";
  }
}

export default CError;
