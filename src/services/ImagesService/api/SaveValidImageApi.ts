import { BaseApiRequest, BaseApiResponse } from './ActionsBaseApi'

export type SaveValidImageRequest = BaseApiRequest & {
  maskName: string
}

export type SaveValidImageResponse = BaseApiResponse
