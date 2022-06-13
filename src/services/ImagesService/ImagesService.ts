import { orderBy, QueryConstraint, QuerySnapshot, where } from "firebase/firestore"
import { ImageCollection } from "react-canvas-draw"
import { CREATED_ON, IS_COMPLETED } from "../../assets/services/queryConstants"
import { getDocuments } from "../DatabaseService"

export async function fetchImages(userUid: string): Promise<ImageCollection[]> {
  const images: ImageCollection[] = []
  const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, "==", false), orderBy(CREATED_ON)]
  const imagesSnapshot = await getDocuments('images', queryConstraints) as QuerySnapshot<ImageCollection>

  imagesSnapshot?.forEach((doc) => {
    const image = <ImageCollection>doc.data()
    if (!image.labellers.includes(userUid)) images.push(<ImageCollection>doc.data())
  })

  return images
}