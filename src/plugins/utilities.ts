import { isAxiosError } from "axios"

export function extractErrorMessage(e: unknown) {
  if(isAxiosError(e)) {
    return e.response?.data?.msg;
  } else if(e instanceof Error) e.message
  else "Something went wrong"
}
