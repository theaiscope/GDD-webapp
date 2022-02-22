import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {ImageDimensions} from "react-canvas-draw";

export async function getImage(): Promise<string> {
  const storage = getStorage();
  const url = await getDownloadURL(ref(storage, '00ad4093-111e-4900-9dee-10abcc02abb7/image_0.jpg'));

  return url;
}

export async function getImageDimensions(url: string) : Promise<ImageDimensions> {
  const metadata = await getMeta(url)

  return {
    width: metadata.width,
    height: metadata.height
  }
}

function getMeta(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}




