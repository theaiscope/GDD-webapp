import { getStorage, ref, getDownloadURL, uploadString, StorageReference } from 'firebase/storage'
import { BloodSampleContainer, ImageDimensions, SelectedSample } from 'react-canvas-draw'

export async function getImage(imageArray: BloodSampleContainer[]): Promise<SelectedSample> {
  const storage = getStorage()
  const flattenedArray = [...imageArray]

  const sampleIndex: number = getArrayIndex(flattenedArray.length)
  const imageIndex: number = getArrayIndex(flattenedArray[sampleIndex].images.length)
  const reference: StorageReference = ref(
    storage,
    flattenedArray[sampleIndex].location + '/' + flattenedArray[sampleIndex].images[imageIndex].name,
  )
  return {
    location: flattenedArray[sampleIndex].location,
    imageId: imageIndex,
    maskId: flattenedArray[sampleIndex].images[imageIndex].masks.length,
    url: await getDownloadURL(reference),
  }
}

export async function uploadImage(
  file: string,
  location: string,
  imageIndex: number,
  maskIndex: number,
): Promise<void> {
  console.log(file)
  const storage = getStorage()

  const reference: StorageReference = ref(storage, `${location}/mask_${imageIndex}_${maskIndex}`)
  await uploadString(reference, file, 'data_url')
}

export async function getImageDimensions(url: string): Promise<ImageDimensions> {
  const metadata = await getMeta(url)

  return {
    width: metadata.width,
    height: metadata.height,
  }
}

function getArrayIndex(itemsInArray: number) {
  return Math.floor(Math.random() * itemsInArray)
}

function getMeta(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}
