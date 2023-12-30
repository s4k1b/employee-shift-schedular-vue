import { $axios } from "@/plugins/axios"
import { extractErrorMessage } from "@/plugins/utilities";

export async function user$get() {
  try {
    const resp = await $axios.get('/user');
    return [resp.data]
  } catch (e) {
    return [, extractErrorMessage(e)]
  }
}
