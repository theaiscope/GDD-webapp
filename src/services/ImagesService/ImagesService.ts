import { orderBy, QueryConstraint, where } from "firebase/firestore"
import { ImageCollection } from "react-canvas-draw"
import { CREATED_ON, IS_COMPLETED } from "../../assets/services/queryConstants"
import { getDocuments } from "../DatabaseService"

export async function fetchImages(userUid: string): Promise<ImageCollection[]> {
  const imagesResult: ImageCollection[] = []
  const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, "==", false), orderBy(CREATED_ON)]
  const imageData = await getDocuments('images', queryConstraints) as ImageCollection[]

  imageData?.forEach((image) => {
    if (!image.labellers.includes(userUid)) imagesResult.push(image)
  })

  return imagesResult
}