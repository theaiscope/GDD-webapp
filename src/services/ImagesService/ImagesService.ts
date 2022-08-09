import { orderBy, QueryConstraint, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { CREATED_ON, IS_COMPLETED } from '../../assets/services/queryConstants'
import Image from '../../model/image'
import { CloudFunctions } from '../cloudFunctions'
import { getDocuments } from '../DatabaseService/DatabaseService'
import { functionsInstance } from '../firebaseService'
import { SkipImageRequest, SkipImageResponse } from './api/SkipImageApi'

export async function fetchImages(userUid: string): Promise<Image[]> {
  const imagesResult: Image[] = []
  const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, '==', false), orderBy(CREATED_ON)]
  const imageData = (await getDocuments('images', queryConstraints)) as Image[]

  imageData?.forEach((image) => {
    if (!image.labellers?.includes(userUid)) imagesResult.push(image)
  })

  return imagesResult
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
