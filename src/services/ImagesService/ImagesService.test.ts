/** @jest-environment node */
import * as functions from 'firebase/functions'
import Image from '../../model/image'
import { MarkImageInvalidResponse } from './api/MarkImageInvalidApi'
import { SaveValidImageResponse } from './api/SaveValidImageApi'
import { SkipImageResponse } from './api/SkipImageApi'
import { fetchImageToLabel, markImageInvalid, saveValidImage, skipImage } from './ImagesService'
import * as ImageRepositoryService from '../ImagesRepositoryService/ImagesRepositoryService'
import { UploadResult } from 'firebase/storage'
jest.mock('firebase/functions')

describe('ImagesService', () => {
  describe('saveValidImage', () => {
    it('should save a valid image', async () => {
      // Given a successful image upload
      const imageId = 'image-1'
      const maskName = `mask_${imageId}_0.png`
      const imageRepositorySpy = jest
        .spyOn(ImageRepositoryService, 'uploadImage')
        .mockResolvedValue({ ref: { name: maskName } } as UploadResult)

      // And CloudFunction call
      const mockResponse: SaveValidImageResponse = {
        message: 'Image saved`',
        imageId: imageId,
        labellerId: 'labeller-1',
      }
      const saveValidImageFunctionSpy = jest.fn(() => Promise.resolve({ data: mockResponse }))
      jest.spyOn(functions, 'httpsCallable').mockReturnValue(saveValidImageFunctionSpy)

      // When calling saveValidImage
      const image: Image = {
        id: imageId,
        sampleLocation: '095a46-sample-location',
      }
      const canvasMaskDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+...'

      const result = await saveValidImage(image, canvasMaskDataUrl)

      // Then the uploadImage and the CloudFunction should have been called
      expect(result).toEqual(mockResponse)
      expect(imageRepositorySpy).toHaveBeenCalled()
      expect(saveValidImageFunctionSpy).toHaveBeenCalledWith({ imageId, maskName })
    })

    it('should fail and not call the saveValidImage cloud function if the mask upload fails', async () => {
      // Given a failed imageUpload
      const error = new Error('Upload Image error')
      jest.spyOn(ImageRepositoryService, 'uploadImage').mockRejectedValue(error)

      const saveValidImageFunctionSpy = jest.fn()
      jest.spyOn(functions, 'httpsCallable').mockReturnValue(saveValidImageFunctionSpy)

      // When calling saveValidImage
      const image: Image = {
        id: 'image-1',
        sampleLocation: '095a46-sample-location',
      }
      const canvasMaskDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+...'

      // Then an error is returned
      await expect(async () => {
        await saveValidImage(image, canvasMaskDataUrl)
      }).rejects.toMatchObject(error)

      // And the CloudFunction should not have been called
      expect(saveValidImageFunctionSpy).not.toHaveBeenCalled()
    })
  })

  describe('skipImage', () => {
    it('should call the skipImage cloud function with the imageId', async () => {
      const imageId = 'image-1'
      const functionResponse: SkipImageResponse = { message: 'Image skipped', imageId, labellerId: 'labeller-1' }

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
      const functionResponse: MarkImageInvalidResponse = {
        message: 'Image marked as invalid',
        imageId,
        labellerId: 'labeller-1',
      }

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
