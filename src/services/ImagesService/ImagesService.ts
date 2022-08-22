import { httpsCallable } from 'firebase/functions'
import { CloudFunctions } from '../cloudFunctions'
import Image from '../../model/image'
import { functionsInstance } from '../firebaseService'
import { SkipImageRequest, SkipImageResponse } from './api/SkipImageApi'
import { MarkImageInvalidRequest, MarkImageInvalidResponse } from './api/MarkImageInvalidApi'

export async function fetchImageToLabel(): Promise<Image | null> {
  const fetchImageToLabelFunction = httpsCallable<unknown, Image>(
    functionsInstance,
    CloudFunctions.FETCH_IMAGE_TO_LABEL,
  )
  const response = await fetchImageToLabelFunction()

  return response.data as Image
}

export async function saveValidImage(imageId: string): Promise<SkipImageResponse> {
  const skipImageFunction = httpsCallable<SkipImageRequest, SkipImageResponse>(
    functionsInstance,
    CloudFunctions.SAVE_VALID_IMAGE,
  )

  const requestData = { imageId }
  const response = await skipImageFunction(requestData)

  return response.data as SkipImageResponse
}

export async function skipImage(imageId: string): Promise<SkipImageResponse> {
  const skipImageFunction = httpsCallable<SkipImageRequest, SkipImageResponse>(
    functionsInstance,
    CloudFunctions.SKIP_IMAGE,
  )

  const requestData = { imageId }
  const response = await skipImageFunction(requestData)

  return response.data as SkipImageResponse
}

export async function markImageInvalid(imageId: string): Promise<MarkImageInvalidResponse> {
  const markImageInvalidFunction = httpsCallable<MarkImageInvalidRequest, MarkImageInvalidResponse>(
    functionsInstance,
    CloudFunctions.MARK_IMAGE_INVALID,
  )

  const requestData = { imageId }
  const response = await markImageInvalidFunction(requestData)

  return response.data as SkipImageResponse
}
