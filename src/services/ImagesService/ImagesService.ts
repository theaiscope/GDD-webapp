import { httpsCallable } from 'firebase/functions'
import { CloudFunctions } from '../cloudFunctions'
import Image from '../../model/image'
import { functionsInstance } from '../firebaseService'
import { SkipImageRequest, SkipImageResponse } from './api/SkipImageApi'
import { SaveValidImageRequest, SaveValidImageResponse } from './api/SaveValidImageApi'
import { MarkImageInvalidRequest, MarkImageInvalidResponse } from './api/MarkImageInvalidApi'
import { uploadImage } from '../ImageRepositoryService'

export async function fetchImageToLabel(): Promise<Image | null> {
  const fetchImageToLabelFunction = httpsCallable<unknown, Image>(
    functionsInstance,
    CloudFunctions.FETCH_IMAGE_TO_LABEL,
  )
  const response = await fetchImageToLabelFunction()

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

export async function markImageInvalid(imageId: string): Promise<MarkImageInvalidResponse> {
  const markImageInvalidFunction = httpsCallable<MarkImageInvalidRequest, MarkImageInvalidResponse>(
    functionsInstance,
    CloudFunctions.MARK_IMAGE_INVALID,
  )

  const requestData = { imageId }
  const response = await markImageInvalidFunction(requestData)

  return response.data as SkipImageResponse
}

export async function saveValidImage(image: Image, maskDataUri: string): Promise<SaveValidImageResponse> {
  const saveValidImageFunction = httpsCallable<SaveValidImageRequest, SaveValidImageResponse>(
    functionsInstance,
    CloudFunctions.SAVE_VALID_IMAGE,
  )

  const uploadedMaskName = await uploadImageMask(image, maskDataUri)

  const requestData: SaveValidImageRequest = {
    imageId: image.id,
    maskName: uploadedMaskName,
  }
  const response = await saveValidImageFunction(requestData)

  return response.data as SaveValidImageResponse
}

async function uploadImageMask(image: Image, maskDataUri: string): Promise<string> {
  if (!image.sampleLocation) {
    throw new Error('Invalid sample location')
  }

  const { id: imageId, sampleLocation } = image
  const maskIndex = image.masks?.length ?? 0

  const fileName = `mask_${imageId}_${maskIndex}.png`

  const uploadResult = await uploadImage(maskDataUri, sampleLocation, fileName)
  return uploadResult.ref.name
}
