import { extractErrorMessage } from '@/plugins/utilities';
import {$axios} from '../plugins/axios'

export async function signup$api(ctx: Record<string, string>) {
  try {
    const resp = await $axios.post("/auth/register", ctx);
    return [resp.data?.msg]
  } catch(e) {
    return [, extractErrorMessage(e)]
  }
}

export async function signin$api(ctx: Record<string, string>) {
  try {
    const resp = await $axios.post("/auth/login", ctx);
    return [resp.data?.msg]
  } catch(e) {
    return [, extractErrorMessage(e)]
  }
}

export async function signout$api() {
  try {
    const resp = await $axios.post('/auth/logout');
    return [resp.data?.msg]
  } catch(e) {
    return [, extractErrorMessage(e)]
  }
}
