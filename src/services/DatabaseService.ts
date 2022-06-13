import { databaseClient } from './firebaseService'
import { collection, query, getDocs, QueryConstraint, QuerySnapshot } from 'firebase/firestore'

// export async function GetBloodSampleContainers(container: string): Promise<BloodSampleContainer[]> {
//   const array: BloodSampleContainer[] = []

//   const samples = collection(databaseClient, container)
//   const q = query(samples)
//   const snapshot = await getDocs(q)

//   snapshot.forEach((doc) => {
//     array.push(<BloodSampleContainer>doc.data())
//     console.log(doc.data())
//   })

//   return array
// }

export async function getDocuments(collectionName: string, queryConstraints?: QueryConstraint[]): Promise<QuerySnapshot<unknown>> {
  const collectionInstance = collection(databaseClient, collectionName)
  const q = query(collectionInstance, ...queryConstraints || [])
  const snapshot = await getDocs(q)
  return snapshot
}