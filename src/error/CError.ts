class CError extends Error {
  constructor(readonly message: string, public readonly status: number, public readonly name: string = "CError") {
    super(message);
    this.status = status;
    super.name = "CError";
  }
}

export default CError;
