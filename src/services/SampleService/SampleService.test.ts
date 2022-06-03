/** @jest-environment node */
jest.mock('../DatabaseService');
import { QueryConstraint, where } from "firebase/firestore";
import { getDocuments } from "../DatabaseService";
import { getBloodSampleContainers } from "./SampleService"

describe('Sample service', () => {

    it('should query from samples collection and filter by isCompleted false', async () => {
        const queryConstraints: QueryConstraint[] = [where("isCompleted", "==", false)]
        await getBloodSampleContainers()
        expect(getDocuments).toHaveBeenCalledWith('samples', queryConstraints)
    })
})