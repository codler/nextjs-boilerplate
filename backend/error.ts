import { status } from "elysia"

export class HttpError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not found") {
    super(message, 404)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403)
  }
}

export const handleHttpError = (error: unknown) => {
  if (error instanceof NotFoundError) {
    return status(404, {
      error: {
        code: "NOT_FOUND",
        message: error.message,
      },
    })
  }

  if (error instanceof ForbiddenError) {
    return status(403, {
      error: {
        code: "FORBIDDEN",
        message: error.message,
      },
    })
  }

  throw error
}
