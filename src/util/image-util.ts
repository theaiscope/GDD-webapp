/**
 * Extract the image index from an image name.
 * Returns the `index: number` if found or `null` if not found
 * @param imageName The image name in the format: 'image_{index}.{extension}', ex: 'image_99.jpg'
 */
export function getImageIndexFromName(imageName: string): number | null {
  const regex = /_(.*?)\./

  const result = regex.exec(imageName)

  if (result?.length) {
    const lastItem = Number(result[result.length - 1])

    if (!isNaN(lastItem)) {
      return lastItem
    }
  }

  return null
}
