import React, { Dispatch, SetStateAction } from 'react'
import { createContext, ReactElement, useState } from 'react'
import Image from '../../model/image'

export type ImageLabellingContextValue = {
  image?: Image
  setImage: Dispatch<SetStateAction<Image | undefined>>
}

export const ImageLabellingContext = createContext<ImageLabellingContextValue | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

export const ImageLabellingProvider = ({ children }: Props): ReactElement => {
  const [image, setImage] = useState<Image>()

  const contextValue: ImageLabellingContextValue = {
    image,
    setImage,
  }

  return <ImageLabellingContext.Provider value={contextValue}>{children}</ImageLabellingContext.Provider>
}
