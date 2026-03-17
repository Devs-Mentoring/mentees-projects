import React, { MutableRefObject, useCallback, useRef, useState } from "react";
import { GameScreenshotResultsType } from "../../globals/types/rawgTypes";
import { Button, Image } from "react-bootstrap";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "react-bootstrap-icons";
import ModalImageGallery from "../ModalImageGallery/ModalImageGallery";
import "./style.scss";

type PropTypes = {
  images: GameScreenshotResultsType;
};

function ImageCarousel(props: PropTypes) {
  const { images } = props;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const scrollWrapperRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const openGalleryHandle = useCallback((index: number) => {
    setGalleryOpen(true);
    setImageIndex(index);
  }, []);

  const scroll = (offset: number) => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollLeft += offset;
    }
  };

  const resetGallery = useCallback(() => {
    setGalleryOpen(false);
    setImageIndex(0);
  }, []);

  return (
    <>
      <div className="img-gallery">
        <Button onClick={() => scroll(-500)} className="img-gallery_btn-left">
          <ChevronLeftIcon />
        </Button>

        <div className="img-gallery_wrapper" ref={scrollWrapperRef}>
          {images.results.map((result, index) => (
            <div
              key={result.id}
              className="img-gallery_img-wrapper"
              onClick={() => openGalleryHandle(index)}
            >
              <Image src={result.image} className="img-gallery_img" />
            </div>
          ))}
        </div>

        <Button onClick={() => scroll(500)} className="img-gallery_btn-right">
          <ChevronRightIcon />
        </Button>
      </div>
      <ModalImageGallery
        images={images}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        modalOpen={galleryOpen}
        resetGallery={resetGallery}
      />
    </>
  );
}

export default ImageCarousel;
