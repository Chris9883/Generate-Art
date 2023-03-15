import Variate from "./Variate";
import Edit from "./Edit";
import generateBase64 from "../scripts/generateBase64.js";
const Input = ({
  type,
  amount,
  setAmount,
  prompt,
  setPrompt,
  size,
  setSize,
  setData,
  setSubmitted,
  setSelected,
  setDataReceived,
  pending,
  setPending,
  setMintingStage,
}) => {
  function handleChange(e) {
    e.preventDefault;
    setSize(e.target.value);
  }
  return (
    <form
      className="editor bg-light col-sm-12 col-xl-7 col-md-7 d-flex flex-column p-xl-5 justify-content-center"
      onSubmit={async (e) => {
        e.preventDefault();
        setData([]);
        setPending(true);
        setDataReceived(false);
        setMintingStage("notMetadataEntered"); // multichain: setMintingStage("notChainSelected")
        if (type == "textToImage") {
          generateBase64(
            prompt,
            amount,
            size,
            setData,
            setDataReceived,
            setPending
          );
        } else {
          // edit, variate
        }
        setSubmitted(true);
        setSelected(0);
      }}
    >
      {type === "textToImage" ? (
        <div className="mb-3 pt-5 pg-md-0 prompt">
          <input
            id="prompt"
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter a detailed description"
            aria-label="Enter a detailed description"
            required
            onChange={(e) => setPrompt(e.target.value)}
          />
          {pending ? (
            <button className="btn btn-primary loading-button">
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="submit-button input-group-text btn btn-primary btn-sm"
              id="submit-btn"
              type="submit"
            >
              Generate
            </button>
          )}
        </div>
      ) : type === "variate" ? (
        <Variate />
      ) : (
        <Edit />
      )}
      <div className="settings-container" id="settings">
        <h4 className="text-black text-white px-4">Settings</h4>
        <div className="d-flex flex-column col-6 align-items-center size-container">
          <label className="text-uppercase text-white-50 m-0 text-center">
            Size (in px)
            <br />
            <div className="btn-group btn-group-toggle p-0 mt-2">
              <input
                type="radio"
                className="btn-check"
                name="size"
                id="size1"
                autoComplete="off"
                value="1024x1024"
                onChange={handleChange}
                checked={size == "1024x1024"}
              />
              <label className="btn btn-outline-primary p-2" htmlFor="size1">
                1024x1024
              </label>

              <input
                type="radio"
                className="btn-check"
                name="size"
                id="size2"
                autoComplete="off"
                value="512x512"
                onChange={handleChange}
                checked={size == "512x512"}
              />
              <label className="btn btn-outline-primary p-2" htmlFor="size2">
                512x512
              </label>
              <input
                type="radio"
                className="btn-check"
                name="size"
                id="size3"
                autoComplete="off"
                value="256x256"
                onChange={handleChange}
                checked={size == "256x256"}
              />
              <label className="btn btn-outline-primary p-2" htmlFor="size3">
                256x256
              </label>
            </div>
          </label>
        </div>
        <div className="col-3 d-flex flex-column align-items-center">
          <label className=" text-uppercase text-white-50 m-0 text-center">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            className="form-control mt-2"
            min="1"
            max="10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default Input;
