const FeaturedText = ({ type }) => {
  //enable tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  return (
    <div className="featured-container col-md-5 col-xl-5 d-flex align-items-center">
      <div className="featured-text text-center text-lg-left col-8">
        {type == "textToImage" ? (
          <p className="text-white-50 mb-0">
            <a
              href="https://docs.google.com/document/d/11WlzjBT0xRpQhP9tFMtxzd0q6ANIdHPUBkMV-YB043U/edit"
              target="_blank"
              data-toggle="tooltip"
              data-placement="top"
              title="DALL·E 2 Prompt Engineering Guide"
            >
              Tips and tricks
            </a>{" "}
            on how to finetune your prompts to get the best results.
          </p>
        ) : type === "variate" ? (
          <p className="text-white-50 mb-0">
            To create a variation of an existing image, upload a png in 1:1
            ratio. <br />
            Max filesize: 4MB
          </p>
        ) : (
          type == "edit" && (
            <p className="text-white-50 mb-0">
              To edit an image, you need to upload both an image and a mask (Max
              filesize: 4MB) <br />
              You can generate a mask by removing part of the image in Figma,
              Gimp or Photoshop.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedText;
