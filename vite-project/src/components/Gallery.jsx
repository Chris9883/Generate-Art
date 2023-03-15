import getGallery from "../scripts/getGallery";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  function onPageLoad(e) {
    e.preventDefault;
    console.log("pageloaded");
    getGallery(setImages1, setImages2);
  }
  window.addEventListener("load", onPageLoad);

  let imageContainers1 = images1.map((image, i) => {
    if (image == 0) {
      return <img src={image} className="gallery-img img-hidden" key={i} />;
    } else {
      return <img src={image} className="gallery-img" key={i} />;
    }
  });
  let imageContainers2 = images2.map((image, i) => {
    if (image == 0) {
      return <img src={image} className="gallery-img img-hidden" key={i} />;
    } else {
      return <img src={image} className="gallery-img" key={i} />;
    }
  });

  return (
    <header className="gallery" id="gallery">
      <div className=" d-flex flex-column w-100 h-100 align-items-center justify-content-center">
        <div className="img-gallery gallery-1 d-flex w-100">
          {imageContainers1}
        </div>

        <div className="container px-4 px-lg-5 d-flex justify-content-center">
          <div className="text-center">
            <h1 className="mx-auto my-0 text-uppercase">generate art</h1>
            <h2 className="text-white-50 mx-auto mt-2 mb-5">
              Create original images from text with DALL-E 2 and mint your best
              picture as a NFT!
            </h2>
            <a className="btn btn-primary" href="#about">
              Get Started
            </a>
          </div>
        </div>
        <div className="img-gallery gallery-2 d-flex w-100">
          {imageContainers2}
        </div>
      </div>
    </header>
  );
}
