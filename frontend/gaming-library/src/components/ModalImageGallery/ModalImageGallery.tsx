import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Button, Carousel, Image, Modal } from "react-bootstrap";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "react-bootstrap-icons";

import { GameScreenshotResultsType } from "../../globals/types/rawgTypes";
import "./style.scss";
import "../ImageCarousel/style.scss";

type PropTypes = {
  images: GameScreenshotResultsType;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
  modalOpen: boolean;
  resetGallery: () => void;
};

const step = 300;

function ModalImageGallery(props: PropTypes) {
  const { images, modalOpen, imageIndex, setImageIndex, resetGallery } = props;
  const scrollWrapperRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const handleButtonClick = useCallback(
    (value: number) => {
      if (images.results) {
        setImageIndex((prevState) => prevState + value);
      }
    },
    [images, imageIndex],
  );

  const leftBtnCondition = images.results && imageIndex > 0;
  const rightBtnCondition =
    images.results && imageIndex !== images.results.length - 1;

  useEffect(() => {
    if (images.results && scrollWrapperRef.current) {
      if (imageIndex === 0) {
        scrollWrapperRef.current.scrollLeft = 0;
      } else {
        scrollWrapperRef.current.scrollLeft = imageIndex * step;
      }
    }
  }, [imageIndex]);

  return (
    <Modal show={modalOpen} onHide={resetGallery} fullscreen>
      <Modal.Header closeButton closeVariant="white" />
      <Modal.Body>
        <Carousel
          fade
          activeIndex={imageIndex}
          interval={null}
          onSelect={(newIndex: number) => setImageIndex(newIndex)}
          controls={false}
          className="modal_gallery-wrapper"
        >
          {" "}
          {images.results.map((item) => {
            return (
              <Carousel.Item key={`carouselItem${item.id}`}>
                <div className="modal_gallery-img">
                  <Image className="modal_gallery-img" src={item.image} />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="img-gallery">
          {leftBtnCondition && (
            <Button
              onClick={() => handleButtonClick(-1)}
              className="img-gallery_btn-left"
            >
              <ChevronLeftIcon />
            </Button>
          )}

          <div className="img-gallery_wrapper" ref={scrollWrapperRef}>
            {images.results.map((result, index) => (
              <div
                key={result.id}
                className={`${
                  imageIndex === index ? " image_selected" : ""
                } img-gallery_img-wrapper`}
                onClick={() => setImageIndex(index)}
              >
                <Image src={result.image} className="img-gallery_img" />
              </div>
            ))}
          </div>

          {rightBtnCondition && (
            <Button
              onClick={() => handleButtonClick(1)}
              className="img-gallery_btn-right"
            >
              <ChevronRightIcon />
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalImageGallery;
