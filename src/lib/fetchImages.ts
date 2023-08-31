import {ImagesSchema} from "@/models/Images"
import type { ImagesResults } from "@/models/Images"   

import env from "./env" 

export default async function fetchImages(url:string): Promise<ImagesResults | undefined> {
try {
    const res =await fetch(url, {headers:{
        Authorization: env.PEXELS_API_KEY
    }})
    if (!res.ok) {
        throw new Error("Getting Images Error!")
    }
    const imageResults: ImagesResults = await res.json()

    const parsedImages = ImagesSchema.parse(imageResults)

    if (parsedImages.total_results === 0) {
        return undefined
    }

    return parsedImages
} catch (e) {
    if (e instanceof Error) console.log(e.stack)
}
    
}