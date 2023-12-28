import {$axios} from '../plugins/axios'

export async function signup$api(ctx: Record<string, string>) {
  try {
    const resp = await $axios.post("/auth/register", ctx);
    return [resp.data]
  } catch(e) {
    // eslint-disable-next-line no-sparse-arrays
    return [, e]
  }
}

export async function signin$api(ctx: Record<string, string>) {
  try {
    const resp = await $axios.post("/auth/login", ctx);
    return [resp.data]
  } catch(e) {
    // eslint-disable-next-line no-sparse-arrays
    return [, e]
  }
}
