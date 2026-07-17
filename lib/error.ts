export const getHttpErrorMessage = <
  T extends { status?: number; message?: string } & (
    | { value?: { error?: { message?: string } } }
    | { value?: { message?: string; summary?: string } }
    | { value?: unknown }
  ),
>(
  error: T | null | undefined
) => {
  if (!error) return "Error"

  const message =
    typeof error.value === "object" && error.value !== null
      ? ((
          error.value as {
            error?: { message?: string }
            message?: string
            summary?: string
          }
        ).error?.message ??
        (error.value as { message?: string }).message ??
        (error.value as { summary?: string }).summary)
      : undefined

  switch (error.status) {
    case 401:
      return message ?? "Unauthorized"
    case 403:
      return message ?? "Forbidden"
    case 404:
      return message ?? "Not found"
    default:
      return message ?? error.message ?? "Error"
  }
}
