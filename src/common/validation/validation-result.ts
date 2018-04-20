export class ValidationResult {
  private _error: boolean;
  private _message: string;

  constructor(error: boolean, message: string) {
    this._error = error;
    this._message = message;
  }

  public static error(message: string): ValidationResult {
    return new ValidationResult(true, message);
  }

  public static success() {
    return new ValidationResult(false, null);
  }

  public get error(): boolean {
    return this._error;
  }

  public set error(value: boolean) {
    this._error = value;
  }

  public get message(): string {
    return this._message;
  }

  public set message(value: string) {
    this._message = value;
  }
}
