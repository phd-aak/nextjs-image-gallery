import { getPlaiceholder } from "plaiceholder";
import type { Photo, ImagesResults } from "@/models/Images";

async function genBase64(imgUrl:string) {
    try {
        const res = await fetch(imgUrl)
        if (!res.ok) {
            throw new Error("Failed to get image data")
        }
        const buffer = await res.arrayBuffer()
        const {base64}  = await getPlaiceholder(Buffer.from(buffer))

        return base64
        
    } catch (error) {
        if (error instanceof Error) console.log(error.stack)
    }
}

export default async function addBlurredDataUrl(images:ImagesResults): Promise<Photo[]> {
    const base64Promises = images.photos.map(photo => genBase64(photo.src.large))
    const results = await Promise.all(base64Promises)
    const photosWithBlur: Photo[] = images.photos.map((photo, i) => {
        photo.blurredDataUrl = results[i]
        return photo
    })
    return photosWithBlur
}