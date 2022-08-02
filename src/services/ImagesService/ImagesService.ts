import { orderBy, QueryConstraint, where } from 'firebase/firestore'
import { CREATED_ON, IS_COMPLETED } from '../../assets/services/queryConstants'
import { Image } from '../../model/image'
import { getDocuments } from '../DatabaseService/DatabaseService'

export async function fetchImages(userUid: string): Promise<Image[]> {
  const imagesResult: Image[] = []
  const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, '==', false), orderBy(CREATED_ON)]
  const imageData = (await getDocuments('images', queryConstraints)) as Image[]

  imageData?.forEach((image) => {
    if (!image.labellers?.includes(userUid)) imagesResult.push(image)
  })

  return imagesResult
}
