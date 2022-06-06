/** @jest-environment node */
jest.mock('../DatabaseService');
import { orderBy, QueryConstraint, where } from "firebase/firestore";
import { CREATED_ON, IS_SAMPLE_COMPLETED } from "../../assets/services/queryConstants";
import { getDocuments } from "../DatabaseService";
import { getBloodSampleContainers } from "./SampleService"

describe('Sample service', () => {

    it('should query from samples collection and filter by isSampleCompleted false and order by createdOn', async () => {
        const queryConstraints: QueryConstraint[] = [where(IS_SAMPLE_COMPLETED, "==", false), orderBy(CREATED_ON)] 
        await getBloodSampleContainers()
        expect(getDocuments).toHaveBeenCalledWith('samples', queryConstraints)
    })
})