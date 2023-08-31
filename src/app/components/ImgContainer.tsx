import type { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photo: Photo;
};

function ImgContainer({ photo }: Props) {
  const widthHeightRatio = photo.height / photo.width;
  const gallaryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(gallaryHeight / 10) + 1;
  return (
    <div
      className="w-[250px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }}
    >
      <div className="rounded-xl  overflow-hidden group">
        <Link
          target="_blank"
          href={photo.url}
          className="grid place-content-center"
        >
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="group-hover:opacity-75"
            sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
            placeholder="blur"
            blurDataURL={photo.blurredDataUrl}
          />
        </Link>
      </div>
    </div>
  );
}

export default ImgContainer;
