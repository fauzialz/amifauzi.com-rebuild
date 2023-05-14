/* 
All of the code in this component are copied and modified from:
https://github.com/neptunian/react-photo-gallery
*/

import { useLayoutEffect, useRef, useState } from "react";
import { computeRowLayout } from "./Utils/compute-layout";
import { findIdealNodeSearch } from "./Utils/findIdealNodeSearch";

export interface IPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface GalleryProps {
  photos: IPhoto[];
  onClick: (index: number) => void;
}

const Gallery = ({ photos, onClick }: GalleryProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const galleryEl = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let animationFrameID: number | null = null;
    const observer = new ResizeObserver((entries) => {
      // only do something if width changes
      const newWidth = entries[0].contentRect.width;
      if (containerWidth !== newWidth) {
        // put in an animation frame to stop "benign errors" from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        animationFrameID = window.requestAnimationFrame(() => {
          setContainerWidth(Math.floor(newWidth));
        });
      }
    });

    if (galleryEl.current) {
      observer.observe(galleryEl.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameID) {
        window.cancelAnimationFrame(animationFrameID);
      }
    };
  });

  if (!containerWidth) return <div ref={galleryEl}>&nbsp;</div>;

  const width = containerWidth - 1;
  const targetRowHeight = 300;
  let limitNodeSearch = 2;
  if (containerWidth >= 450) {
    limitNodeSearch = findIdealNodeSearch({ containerWidth, targetRowHeight });
  }
  const thumbs: IPhoto[] = computeRowLayout({
    containerWidth: width,
    limitNodeSearch,
    targetRowHeight,
    margin: 2,
    photos,
  });

  return (
    <div ref={galleryEl} className="flex flex-wrap">
      {thumbs.map((thumb, index) => {
        return (
          <img
            key={index}
            src={thumb.src}
            alt={thumb.alt}
            width={thumb.width}
            height={thumb.height}
            onClick={() => onClick(index)}
            className="m-0.5 cursor-pointer"
          />
        );
      })}
    </div>
  );
};

export default Gallery;
