// TODO: rename file to clarify the functionallity that contains
import { getStorage, ref, getDownloadURL, uploadString, StorageReference } from 'firebase/storage'
import { ImageDimensions } from 'react-canvas-draw'
import { Image } from '../model/image'

export const getImageUrl = async (image: Image): Promise<string> => {
  const storage = getStorage()
  const reference: StorageReference = ref(storage, image.sampleLocation + '/' + image.name)
  return await getDownloadURL(reference)
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

function getMeta(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}
