import { getDownloadURL, getStorage, ref, StorageReference, uploadString } from 'firebase/storage'
import { ImageDimensions } from 'react-canvas-draw'
import Image from '../../model/image'
import { getImageIndexFromName } from '../../util/image-util'
import { MaskUploadResult } from './api/MaskUploadResult'

export async function getImageUrl(image: Image): Promise<string> {
  const storage = getStorage()
  const reference: StorageReference = ref(storage, image.sampleLocation + '/' + image.name)
  return getDownloadURL(reference)
}

export async function uploadMaskImage(image: Image, maskImageFileContent: string): Promise<MaskUploadResult> {
  const storage = getStorage()

  const imageIndex = getImageIndexFromName(image.name)
  const maskIndex = image.masks?.length ?? 0
  const fileName = `mask_${imageIndex}_${maskIndex}.png`

  const referencePath = `${image.sampleLocation}/${fileName}`
  const reference = ref(storage, referencePath)
  const uploadResult = await uploadString(reference, maskImageFileContent, 'data_url')

  const maskUploadResult: MaskUploadResult = {
    fileName: uploadResult.ref.name,
    fullPath: uploadResult.ref.fullPath,
  }

  return maskUploadResult
}

export async function getImageDimensions(url: string): Promise<ImageDimensions> {
  const metadata = await getMeta(url)

  return {
    width: metadata.width,
    height: metadata.height,
  }
}

function getMeta(url: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}
