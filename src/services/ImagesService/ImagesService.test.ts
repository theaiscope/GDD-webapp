/** @jest-environment node */
import * as functions from 'firebase/functions'
import Image from '../../model/image'
import { fetchImageToLabel, skipImage } from './ImagesService'
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

  describe('fetchImageToLabel', () => {
    const mockImage: Image = {
      id: '1',
      name: 'image_1.jpg',
      sampleLocation: '1',
      sampleReference: '1',
      masks: [],
      labellers: [],
      markedAsInvalid: 0,
      isCompleted: false,
      createdOn: new Date(),
    }

    it('should call the fetchImageToLabel function and return the image ', async () => {
      const functionCallSpy = jest.spyOn(functions, 'httpsCallable')
      functionCallSpy.mockReturnValue(() => Promise.resolve({ data: mockImage }))

      const result = await fetchImageToLabel()

      expect(result).toEqual(mockImage)
      expect(functionCallSpy).toHaveBeenCalled()
    })
  })
})
