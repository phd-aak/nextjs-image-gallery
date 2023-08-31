import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import { link } from "fs";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrl from "@/lib/getBase64";
import getPrevNextPage from "@/lib/getPreNextPages";
import Footer from "./Footer";
type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({ topic = "curated", page }: Props) {
  let url;
  if (topic === "curated" && page) {
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (topic === "curated") {
    url = `https://api.pexels.com/v1/curated`;
  } else if (!page) {
    url = `https://api.pexels.com/v1/search?query=${topic}`;
  } else {
    url = `https://api.pexels.com/v1/search?query=${topic}?page=${page}`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);
  if (!images || images.per_page === 0)
    return <h1 className="m-4 text-2xl font-bold">No Images</h1>;

  const photosWithBlur = await addBlurredDataUrl(images);

  const { prevPage, nextPage } = getPrevNextPage(images);

  const footerProps = { topic, page, nextPage, prevPage };
  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photosWithBlur.map((photo) => (
          <ImgContainer key={photo.id} photo={photo} />
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
