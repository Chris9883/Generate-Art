export default function Gallery() {
  return (
    <header className="gallery" id="gallery">
      <div className=" d-flex flex-column w-100 h-100 align-items-center justify-content-center">
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
      </div>
    </header>
  );
}
