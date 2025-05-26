class AppError extends Error {
  statusCode: number;
  private _errors: { field?: string; message: string }[];

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: { field?: string; message: string }[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this._errors = errors || [];
    Error.captureStackTrace(this, this.constructor);
  }

  setErrors(errors: { field?: string; message: string }[]) {
    this._errors = errors;
    return this;
  }

  getErrors(): Record<string, string[]> {
    return this._errors.reduce((acc, curr) => {
      const key = curr.field ?? 'general';
      acc[key] = acc[key] || [];
      acc[key].push(curr.message);
      return acc;
    }, {} as Record<string, string[]>);
  }
}

export default AppError;
