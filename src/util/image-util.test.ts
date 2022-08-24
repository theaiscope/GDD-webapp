import { getImageIndexFromName } from './image-util'

describe('ImageUtil', () => {
  describe('getImageIndex', () => {
    it('should extract the image index from the name', () => {
      const imageName = 'image_15.jpg'
      const expectedIndex = 15

      const result = getImageIndexFromName(imageName)

      expect(result).toBe(expectedIndex)
    })

    it('should return null if the name does not contains the index', () => {
      const imageName = 'image.jpg'

      const result = getImageIndexFromName(imageName)

      expect(result).toBeNull()
    })
  })
})
