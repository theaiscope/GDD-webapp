import { QueryConstraint, QuerySnapshot, where } from "firebase/firestore"
import { BloodSampleContainer } from "react-canvas-draw"
import { getDocuments } from "../DatabaseService"

export async function getBloodSampleContainers(): Promise<BloodSampleContainer[]> {
    const bloodSampleImages: BloodSampleContainer[] = []
    const queryConstraints: QueryConstraint[] = [where("isCompleted", "==", false)] 
    const imagesSnapshot = await getDocuments('samples', queryConstraints) as QuerySnapshot<BloodSampleContainer>

    imagesSnapshot?.forEach((doc) => {
      bloodSampleImages.push(<BloodSampleContainer>doc.data())
        console.log(doc.data())
      })

  return bloodSampleImages
}