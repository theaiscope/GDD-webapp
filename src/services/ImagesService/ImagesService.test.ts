/** @jest-environment node */
import { orderBy, QueryConstraint, where } from 'firebase/firestore'
import * as functions from 'firebase/functions'
import { CREATED_ON, IS_COMPLETED } from '../../assets/services/queryConstants'
import * as DatabaseService from '../DatabaseService/DatabaseService'
import { fetchImages, skipImage } from './ImagesService'
jest.mock('firebase/functions')

describe('ImagesService', () => {
  describe('skipImage', () => {
    it('should call the skipImage cloud function with the imageId', async () => {
      const imageId = 'image-1'
      const functionResponse = { message: 'Image skipped', imageId, labellerId: 'labeller-1' }

      const functionsSpy = jest.spyOn(functions, 'httpsCallable')
      const skipImageFunctionSpy = jest.fn(() => Promise.resolve({ data: functionResponse }))
      functionsSpy.mockReturnValue(skipImageFunctionSpy)

      const result = await skipImage(imageId)

      expect(result).toEqual(functionResponse)
      expect(functionsSpy).toHaveBeenCalled()
      expect(skipImageFunctionSpy).toHaveBeenCalledWith({ imageId })
    })
  })

  describe('fetchImages', () => {
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
        sampleReference: '1',
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
        sampleReference: '1',
      },
    ]

    const databaseSpy = jest.spyOn(DatabaseService, 'getDocuments')

    beforeEach(() => {
      databaseSpy.mockReturnValue(Promise.resolve(mockImages))
    })

    it('should query from images collection and filter by isCompleted false and order by createdOn', async () => {
      const queryConstraints: QueryConstraint[] = [where(IS_COMPLETED, '==', false), orderBy(CREATED_ON)]
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
          sampleReference: '1',
        },
      ]
      expect(result).toEqual(filteredImages)
    })

    it('should filter images by user id 1', async () => {
      const result = await fetchImages('1')
      expect(result).toEqual([])
    })
  })
})
