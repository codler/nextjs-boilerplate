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

export class InternalServerError extends HttpError {
  constructor(message = "Internal server error") {
    super(message, 500)
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

  if (error instanceof InternalServerError) {
    return status(500, {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      },
    })
  }

  if (error instanceof HttpError) {
    return status(error.status, {
      error: {
        code: "ERROR",
        message: error.message,
      },
    })
  }

  console.error(error)

  return status(500, {
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  })
}
