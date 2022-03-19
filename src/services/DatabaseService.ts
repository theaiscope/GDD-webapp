import { databaseClient } from './firebaseService'
import { collection, query, getDocs } from 'firebase/firestore'
import { BloodSampleContainer } from 'react-canvas-draw'

export async function GetBloodSampleContainers(container: string): Promise<BloodSampleContainer[]> {
  const array: BloodSampleContainer[] = []

  const samples = collection(databaseClient, container)
  const q = query(samples)
  const snapshot = await getDocs(q)

  snapshot.forEach((doc) => {
    array.push(<BloodSampleContainer>doc.data())
    console.log(doc.data())
  })

  return array
}