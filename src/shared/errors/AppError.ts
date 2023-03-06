export class AppError {
  public readonly RET: string | object;
  public readonly statusCode: number;

  constructor(RET: string | object, statusCode = 400) {
    this.RET = RET;
    this.statusCode = statusCode;
  }
}