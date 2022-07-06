import { databaseClient } from '../firebaseService'
import { collection, query, getDocs, QueryConstraint } from 'firebase/firestore'

export async function getDocuments(collectionName: string, queryConstraints?: QueryConstraint[]): Promise<unknown[]> {
  const collectionInstance = collection(databaseClient, collectionName)
  const q = query(collectionInstance, ...queryConstraints || [])
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => doc.data())
}