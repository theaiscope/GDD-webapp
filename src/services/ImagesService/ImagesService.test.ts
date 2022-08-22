/** @jest-environment node */
import * as functions from 'firebase/functions'
import Image from '../../model/image'
import { fetchImageToLabel, markImageInvalid, saveValidImage, skipImage } from './ImagesService'
jest.mock('firebase/functions')

describe('ImagesService', () => {
  describe('saveValidImage', () => {
    it('should call the saveValidImage cloud function with the imageId', async () => {
      const imageId = 'image-1'
      const functionResponse = { message: 'Image saved`', imageId, labellerId: 'labeller-1' }

      const functionsSpy = jest.spyOn(functions, 'httpsCallable')
      const saveValidImageFunctionSpy = jest.fn(() => Promise.resolve({ data: functionResponse }))
      functionsSpy.mockReturnValue(saveValidImageFunctionSpy)

      const result = await saveValidImage(imageId)

      expect(result).toEqual(functionResponse)
      expect(functionsSpy).toHaveBeenCalled()
      expect(saveValidImageFunctionSpy).toHaveBeenCalledWith({ imageId })
    })
  })

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

  describe('markImageInvalid', () => {
    it('should call the markImageInvalid cloud function with the imageId', async () => {
      const imageId = 'image-1'
      const functionResponse = { message: 'Image marked as invalid', imageId, labellerId: 'labeller-1' }

      const functionsSpy = jest.spyOn(functions, 'httpsCallable')
      const markImageInvalidFunctionSpy = jest.fn(() => Promise.resolve({ data: functionResponse }))
      functionsSpy.mockReturnValue(markImageInvalidFunctionSpy)

      const result = await markImageInvalid(imageId)

      expect(result).toEqual(functionResponse)
      expect(functionsSpy).toHaveBeenCalled()
      expect(markImageInvalidFunctionSpy).toHaveBeenCalledWith({ imageId })
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

    it('should call the fetchImageToLabel cloud function and return the image ', async () => {
      const functionCallSpy = jest.spyOn(functions, 'httpsCallable')
      functionCallSpy.mockReturnValue(() => Promise.resolve({ data: mockImage }))

      const result = await fetchImageToLabel()

      expect(result).toEqual(mockImage)
      expect(functionCallSpy).toHaveBeenCalled()
    })

    it('should call the fetchImageToLabel cloud function and return when there is no image ', async () => {
      const functionCallSpy = jest.spyOn(functions, 'httpsCallable')
      functionCallSpy.mockReturnValue(() => Promise.resolve({ data: null }))

      const result = await fetchImageToLabel()

      expect(result).toBeDefined()
      expect(result).toBeNull()
      expect(functionCallSpy).toHaveBeenCalled()
    })
  })
})
