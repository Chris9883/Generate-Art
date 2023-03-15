import Modal from "./Modal";

const Output = ({
  data,
  submitted,
  amount,
  selected,
  setSelected,
  dataReceived,
}) => {
  let imgContainersEmpty = [];
  for (let i = 0; i < amount; i++) {
    imgContainersEmpty.push(
      <div className="img-container placeholder-glow" key={i}>
        <div className="output-image placeholder bg-light"></div>
      </div>
    );
  }

  let imgContainersFilled = [];
  for (let i = 0; i < data.length; i++) {
    imgContainersFilled.push(
      <div
        className="img-container selectable"
        key={i}
        onClick={() => setSelected(i)}
        checked={selected == i}
      >
        <img
          className="img-fluid output-image"
          src={data[i]}
          alt={`dall-e output ${i}`}
        />
      </div>
    );
  }

  if (!dataReceived && !submitted) {
    return (
      <div className="col-xl-7 col-md-7 output-container p-5 d-flex flex-column align-items-center"></div>
    );
  } else if (!dataReceived && submitted && amount == 1) {
    return (
      <div className="col-xl-7 col-md-7 output-container p-5 d-flex flex-column align-items-center">
        <div className="selected-img-container placeholder-glow">
          <img className="selected-img placeholder bg-light" />
        </div>
      </div>
    );
  } else if (!dataReceived && submitted) {
    return (
      <div className="col-xl-7 col-md-7 output-container p-5 d-flex flex-column align-items-center">
        <div className="selected-img-container placeholder-glow">
          <img className="selected-img placeholder bg-light" />
        </div>
        <div className="all-images-container mt-4 d-flex justify-content-center align-items-center">
          {imgContainersEmpty}
        </div>
      </div>
    );
  } else if (dataReceived && data.length == 1) {
    return (
      <div className="col-xl-7 col-md-7 output-container p-5 d-flex flex-column align-items-center">
        <div className="selected-img-container zoomable">
          <img
            className="img-fluid selected-img"
            data-toggle="modal"
            data-target="#fullsizeModal"
            src={data[0]}
            alt={`dall-e output 0`}
            onClick={(e) => e.preventDefault()}
          />
          <Modal data={data} selected={selected} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-xl-7 col-md-7 output-container p-5 d-flex flex-column align-items-center">
        <div className="selected-img-container zoomable">
          <img
            className="img-fluid selected-img"
            src={data[selected]}
            alt={`dall-e output 0`}
            onClick={(e) => e.preventDefault()}
            data-toggle="modal"
            data-target="#fullsizeModal"
          />
          <Modal data={data} selected={selected} />
        </div>
        <div className="all-images-container mt-4 d-flex justify-content-center align-items-center">
          {imgContainersFilled}
        </div>
      </div>
    );
  }
};

export default Output;
