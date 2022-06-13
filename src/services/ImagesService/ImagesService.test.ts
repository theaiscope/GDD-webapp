/** @jest-environment node */
import { orderBy, QueryConstraint, where } from "firebase/firestore";
import { CREATED_ON, IS_COMPLETED } from "../../assets/services/queryConstants";
import * as DatabaseService from "../DatabaseService";
import { fetchImages } from "./ImagesService"

const mockImages = [
    {
        markedAsInvalid: 0,
        masks: [],
        name: 'image_0.jpg',
        skipped: 0,
        labellers: ['1'],
        createdOn: new Date('June 13, 2022, 12:00:00'),
        isCompleted: false,
        sampleLocation: '1',
        sampleReference: '1'
    },
    {
        markedAsInvalid: 0,
        masks: [],
        name: 'image_0.jpg',
        skipped: 0,
        labellers: ['1', '2'],
        createdOn: new Date('June 01, 2022, 12:00:00'),
        isCompleted: false,
        sampleLocation: '1',
        sampleReference: '1'
    },
]

const spy = jest.spyOn(DatabaseService, 'getDocuments');

describe('Images service', () => {

    beforeEach(() => {
        spy.mockReturnValue(Promise.resolve(mockImages));
    });

    it('should query from images collection and filter by isCompleted false and order by createdOn', async () => {
        const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, "==", false), orderBy(CREATED_ON)]
        await fetchImages('1111')
        expect(DatabaseService.getDocuments).toHaveBeenCalledWith('images', queryConstraints)
    })

    it('should filter images by user id 2', async () => {
        const result = await fetchImages('2')
        const filteredImages = [
            {
                markedAsInvalid: 0,
                masks: [],
                name: 'image_0.jpg',
                skipped: 0,
                labellers: ['1'],
                createdOn: new Date('June 13, 2022, 12:00:00'),
                isCompleted: false,
                sampleLocation: '1',
                sampleReference: '1'
            }
        ]
        expect(result).toEqual(filteredImages)
    })

    it('should filter images by user id 1', async () => {
        const result = await fetchImages('1')
        expect(result).toEqual([])
    })
})