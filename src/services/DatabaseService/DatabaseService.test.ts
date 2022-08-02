/** @jest-environment node */
import { connectFirestoreEmulator, QueryConstraint, where } from 'firebase/firestore'
import { signInWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth'
import { getDocuments } from './DatabaseService'
import { firebaseAuth, databaseClient } from '../firebaseService'

describe('Database Service', () => {
  beforeAll(() => {
    connectFirestoreEmulator(databaseClient, 'localhost', 8080)
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099')
  })

  beforeEach(async () => {
    await signInWithEmailAndPassword(firebaseAuth, 'some@user.com', 'someuser')
  })

  describe('getDocuments', () => {
    const fakeDocuments = [
      {
        markedAsInvalid: false,
        sampleLocation: '00ad4093-111e-4900-9dee-10abcc02abb7',
        name: 'image_0.jpg',
        masks: [{ name: 'masks_0.png', uploadedBy: 'microscopists/FvEb3AHYnlGubLvKJyWH' }],
        createdOn: { nanoseconds: 851000000, seconds: 1657626586 },
        isCompleted: false,
        labellers: ['FvEb3AHYnlGubLvKJyWH'],
        sampleReference: 'samples/rGjt8jcwSQzGRVcViJbQ',
      },
      {
        markedAsInvalid: false,
        sampleLocation: '00ad4093-111e-4900-9dee-10abcc02abb7',
        name: 'image_1.jpg',
        masks: [],
        createdOn: { nanoseconds: 494000000, seconds: 1657635604 },
        isCompleted: false,
        labellers: ['FvEb3AHYnlGubLvKJyWH'],
        sampleReference: 'samples/rGjt8jcwSQzGRVcViJbQ',
      },
    ]

    it('should retrieve all documents of specified collection name without query string', async () => {
      const actualDocuments = await getDocuments('images')

      expect(actualDocuments).toEqual(fakeDocuments)
    })

    it('should retrieve all documents of specified collection name using query string', async () => {
      const constraints: QueryConstraint[] = [where('name', '==', 'image_1.jpg')]
      const actualDocuments = await getDocuments('images', constraints)

      const expectedDocuments = [fakeDocuments[1]]
      expect(actualDocuments).toEqual(expectedDocuments)
    })
  })
})
