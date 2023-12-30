import type { StoreFetchingProp } from "@/plugins/store-utilities"

export interface User {
  name: string
  email: string
  phone: number
}

export type StoreUser = StoreFetchingProp<User>
