/** @jest-environment node */
import { getDocuments } from './DatabaseService';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseService } from '../firebaseService';

describe('Database Service', () => {
    describe('getDocuments', () => {
        it.skip('should retrieve all documents of specified collection name without query string', async () => {
            const aux = await createUserWithEmailAndPassword(firebaseService, 'some@email.com', 'somepassword');
            const aux1 = await signInWithEmailAndPassword(firebaseService, 'some@email.com', 'somepassword');

            const expectedDocuments = { enabled: false };

            const actualDocuments = await getDocuments('microscopists');

            expect(actualDocuments).toBe(expectedDocuments);
        })
    })
})




