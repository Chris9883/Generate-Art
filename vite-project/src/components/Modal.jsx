const Modal = ({ data, selected }) => {
  return (
    <>
      <div
        className="modal fade center"
        id="fullsizeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fullsizeModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.preventDefault()}
        >
          <img src={data[selected]} className="modal-image" />
          <div className="modal-content"></div>
        </div>
      </div>
    </>
  );
};

export default Modal;
