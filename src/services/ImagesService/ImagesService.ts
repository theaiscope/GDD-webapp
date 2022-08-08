import { httpsCallable } from 'firebase/functions'
import { CloudFunctions } from '../cloudFunctions'
import Image from '../../model/image'
import { functionsInstance } from '../firebaseService'
import { SkipImageRequest, SkipImageResponse } from './api/SkipImageApi'

export async function fetchImageToLabel(): Promise<Image | undefined> {
  const fetchImageToLabel = httpsCallable<unknown, Image>(functionsInstance, CloudFunctions.FETCH_IMAGE_TO_LABEL)
  const response = await fetchImageToLabel()

  return response.data as Image
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
