import { orderBy, QueryConstraint, QuerySnapshot, where } from "firebase/firestore"
import { BloodSampleContainer } from "react-canvas-draw"
import { CREATED_ON, IS_SAMPLE_COMPLETED } from "../../assets/services/queryConstants"
import { getDocuments } from "../DatabaseService"

export async function getBloodSampleContainers(): Promise<BloodSampleContainer[]> {
    const bloodSampleImages: BloodSampleContainer[] = []
    const queryConstraints: QueryConstraint[] = [where(IS_SAMPLE_COMPLETED, "==", false), orderBy(CREATED_ON)] 
    const imagesSnapshot = await getDocuments('samples', queryConstraints) as QuerySnapshot<BloodSampleContainer>

    imagesSnapshot?.forEach((doc) => {
      bloodSampleImages.push(<BloodSampleContainer>doc.data())
        console.log(doc.data())
      })

  return bloodSampleImages
}