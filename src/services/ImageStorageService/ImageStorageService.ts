import { getDownloadURL, getStorage, ref, StorageReference, uploadString } from 'firebase/storage'
import { ImageDimensions } from 'react-canvas-draw'
import Image from '../../model/image'
import { MaskUploadResult } from './api/MaskUploadResult'

export async function getImageUrl(image: Image): Promise<string> {
  const storage = getStorage()
  const reference: StorageReference = ref(storage, image.sampleLocation + '/' + image.name)
  return getDownloadURL(reference)
}

export async function uploadMaskImage(image: Image, maskImageFileContent: string): Promise<MaskUploadResult> {
  const storage = getStorage()

  const { id: imageId, sampleLocation } = image
  const maskIndex = image.masks?.length ?? 0
  const fileName = `mask_${imageId}_${maskIndex}.png`

  const reference: StorageReference = ref(storage, `${sampleLocation}/${fileName}`)
  const uploadResult = await uploadString(reference, maskImageFileContent, 'data_url')

  const maskUploadResult = {
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
