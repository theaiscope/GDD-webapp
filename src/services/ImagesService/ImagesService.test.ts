/** @jest-environment node */
jest.mock('../DatabaseService');
import { orderBy, QueryConstraint, where } from "firebase/firestore";
import { CREATED_ON, IS_COMPLETED } from "../../assets/services/queryConstants";
import { getDocuments } from "../DatabaseService";
import { fetchImages } from "./ImagesService"

describe('Images service', () => {

    it('should query from images collection and filter by isCompleted false and order by createdOn', async () => {
        const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, "==", false), orderBy(CREATED_ON)]
        await fetchImages()
        expect(getDocuments).toHaveBeenCalledWith('images', queryConstraints)
    })
})