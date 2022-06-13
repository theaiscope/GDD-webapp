import { orderBy, QueryConstraint, QuerySnapshot, where } from "firebase/firestore"
import { ImageCollection } from "react-canvas-draw"
import { CREATED_ON, IS_COMPLETED } from "../../assets/services/queryConstants"
import { getDocuments } from "../DatabaseService"

export async function fetchImages(): Promise<ImageCollection[]> {
  const images: ImageCollection[] = []
  const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, "==", false), orderBy(CREATED_ON)]
  const imagesSnapshot = await getDocuments('images', queryConstraints) as QuerySnapshot<ImageCollection>

  // TODO: add filter by user
  imagesSnapshot?.forEach((doc) => {
    images.push(<ImageCollection>doc.data())
    console.log(doc.data())
  })

  return images
}