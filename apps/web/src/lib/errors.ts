export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code = "APP_ERROR"
  ) {
    super(message);
  }
}

export function toErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      body: { error: error.message, code: error.code }
    };
  }

  return {
    status: 500,
    body: { error: "Internal Server Error", code: "UNEXPECTED_ERROR" }
  };
}
