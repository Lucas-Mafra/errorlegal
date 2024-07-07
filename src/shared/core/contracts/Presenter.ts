import { statusCode } from "../types/statusCode"

export type PresenterProps<T = unknown> = {
  received?: boolean
  data?: T
  title?: string
  message?: string
  status: statusCode
  errors?: { [x: string]: unknown }
}

export abstract class Presenter<T, K = unknown, J = unknown> {
  abstract present(raw: T): PresenterProps<K>
  abstract presentMany(raws: T[]): PresenterProps<J>
}