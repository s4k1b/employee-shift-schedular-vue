export interface FetchingStatus {
  phase: 'stale' | 'success' | 'pending' | 'error'
  msg?: string
}

export type StoreFetchingProp<T> = {
  status: FetchingStatus
  result: T
}

export function initStoreFetchingProp<T>(value: T): StoreFetchingProp<T> {
  return {
    status: {phase: 'stale'},
    result: value
  }
}

export function updateFetchingPropStatus<T>(prop: StoreFetchingProp<T>, phase: FetchingStatus['phase'], msg?: FetchingStatus['msg']): void {
  prop.status.phase = phase;
  if(msg) {
    prop.status.msg = msg
  }
}

export function updateFetchingPropValue<T>(prop: StoreFetchingProp<T>, value: T): void {
  prop.result = value
}
