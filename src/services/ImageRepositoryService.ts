import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {ImageContainer, ImageDimensions} from "react-canvas-draw";

export async function getImage(imageArray: ImageContainer[]): Promise<string> {
    const storage = getStorage()
    const flattenedArray = [...imageArray]

    const sampleIndex = getArrayIndex(flattenedArray.length)
    console.log(sampleIndex)
    const imageIndex = getArrayIndex(flattenedArray[sampleIndex].images.length)
    const reference = ref(storage, flattenedArray[sampleIndex].location + "/" + flattenedArray[sampleIndex].images[imageIndex].name)
    const url = await getDownloadURL(reference);

    return url;
}

export async function getImageDimensions(url: string): Promise<ImageDimensions> {
    const metadata = await getMeta(url)

    return {
        width: metadata.width,
        height: metadata.height
    }
}

function getArrayIndex(itemsInArray: number) {
    return Math.floor(Math.random() * itemsInArray);
}

function getMeta(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
    });
}




