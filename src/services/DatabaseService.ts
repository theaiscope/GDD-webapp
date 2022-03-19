import { databaseClient } from './firebaseService'
import { collection, query, getDocs } from 'firebase/firestore'
import { ImageContainer } from 'react-canvas-draw'

export async function GetDataAsObject(container: string): Promise<ImageContainer[]> {
  const array: ImageContainer[] = []

  const samples = collection(databaseClient, container)
  const q = query(samples)
  const snapshot = await getDocs(q)

  snapshot.forEach((doc) => {
    array.push(<ImageContainer>doc.data())
    console.log(doc.data())
  })

  return array
}
