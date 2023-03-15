import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import MintingWalletInteraction from "./MintingWalletInteraction.jsx";
import uploadAndMint from "../scripts/uploadAndMint.js";

const Mint = ({
  data,
  selected,
  address,
  isConnected,
  setPending,
  mintingStage, //mintingstage: notChainSelected || notMetadataEntered || submitted ||
  // uploadingImage || uploadingMetadata || uploadFailed || readyForMint || signTx || prepareFailed ||minting || txFailed || completed
  setMintingStage,
}) => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { chain } = useNetwork();

  // metadata
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amountCustomTraits, setAmountCustomTraits] = useState(1);
  const [traitTypes, setTraitTypes] = useState([]);
  const [traitValues, setTraitValues] = useState([]);

  // display link for user to show progress
  const [imageLink, setImageLink] = useState();
  const [metadataLink, setMetadataLink] = useState();
  const [tokenURI, setTokenURI] = useState();
  const [txHash, setTxHash] = useState();
  const [tokenId, setTokenId] = useState();

  //enable tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // set custom traits
  let inputCustomTraits = [];
  let placeholderType = [
    "e.g. style",
    "e.g. character",
    "e.g. personality",
    "e.g. accessory",
    "e.g. background-color",
  ];
  let placeholderValue = ["Photography", "Cute Puppy", "angry", "Hat", "blue"];
  for (let i = 0; i < amountCustomTraits; i++) {
    inputCustomTraits.push(
      <div
        className="trait-container d-flex"
        id={`trait-${i}`}
        key={`trait-${i}`}
      >
        <input
          type="text"
          className="form-control trait-type"
          aria-describedby="trait type"
          placeholder={`${placeholderType[i % 5]}`}
          value={traitTypes[i]}
          onChange={(e) => {
            e.preventDefault();
            setTraitTypes((traitTypes) => {
              const updated = [...traitTypes];
              updated[i] = e.target.value;
              return updated;
            });
          }}
        />
        <input
          type="text"
          className="form-control trait-value mx-3"
          aria-describedby="trait value"
          placeholder={`${placeholderValue[i % 5]}`}
          value={traitValues[i]}
          onChange={(e) => {
            e.preventDefault();
            setTraitValues((traitValues) => {
              const updated = [...traitValues];
              updated[i] = e.target.value;
              return updated;
            });
          }}
        />
        {i == 0 && (
          <div>
            <button
              className="btn btn-primary add-button-container p-2"
              onClick={(e) => {
                e.preventDefault();
                setAmountCustomTraits(
                  (amountCustomTraits) => amountCustomTraits + 1
                );
              }}
              data-toggle="tooltip"
              data-placement="top"
              title="Add more"
            >
              <i className="fab fa-solid fa-plus"></i>
            </button>
          </div>
        )}
      </div>
    );
  }

  // reset metadata when user generates new image
  useEffect(() => {
    if (mintingStage == "notChainSelected") {
      setName("");
      setDescription("");
      setAmountCustomTraits(1);
      setTraitTypes([]);
      setTraitValues([]);
    }
  }, [mintingStage]);

  async function submit() {
    //reset tx hash and token id, token uri, metadat uri etc.
    setTxHash();
    setTokenId();
    setTokenURI();
    setMetadataLink();
    setImageLink();
    if (!isConnected) {
      alert("Please connect a wallet to proceed.");
    } else if (!data[selected]) {
      alert("no image selected");
    } else {
      setPending(true);
      await uploadAndMint(
        setMintingStage,
        data[selected],
        setImageLink,
        name,
        description,
        address,
        traitTypes,
        traitValues,
        setMetadataLink,
        setTokenURI
      );
    }
  }

  return (
    <div className="col-sm-12 col-xl-5 col-md-5 mint-section d-flex flex-column align-content-center">
      {!isConnected ? (
        <div className="d-flex flex-column h-100 justify-content-center">
          <div className="mint-content col-10 text-center">
            <h4 className="text-white-50">Mint</h4>
            <div>
              <p className="mb-0 text-white text-center max-width">
                After selecting your favorite image, you can mint your NFT in
                four easy steps
              </p>
            </div>

            <p className="mb-0 text-white-50 font-weight-bold mt-3">
              1. Connect your wallet
            </p>
            <p className="mb-0 text-white-50">
              2. Connect to your preffered chain
            </p>
            <p className="mb-0 text-white-50">3. Edit Metadata</p>
            <p className="mb-0 text-white-50">4. Mint your NFT</p>
            <div className="connect-button-contaier pt-4 d-flex justify-content-center align-items-center">
              {openConnectModal && (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="btn btn-primary connect-button"
                >
                  Connect Wallet
                </button>
              )}{" "}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div className="mint-header col-12 d-flex justify-content-between p-2">
            <div className="mint-navigation d-flex ">
              <p
                className="mb-0 text-white-50 hoverable"
                onClick={(e) => {
                  e.preventDefault();
                  openAccountModal();
                }}
              >
                1. Connect your wallet
              </p>
              {mintingStage == "notChainSelected" ? (
                <p className="mb-0 text-white-50 font-weight-bold">
                  2. Select chain
                </p>
              ) : (
                <p
                  className="mb-0 text-white-50 hoverable"
                  onClick={(e) => {
                    e.preventDefault();
                    openChainModal();
                  }}
                >
                  2. Select chain
                </p>
              )}
              {mintingStage == "notMetadataEntered" ? (
                <p className="mb-0 text-white-50 font-weight-bold">
                  3. Edit Metadata
                </p>
              ) : (
                <p
                  className="mb-0 text-white-50 hoverable"
                  onClick={(e) => {
                    e.preventDefault();
                    setMintingStage("notMetadataEntered");
                  }}
                >
                  3. Edit Metadata
                </p>
              )}
              {mintingStage == "notChainSelected" ||
              mintingStage == "notMetadataEntered" ? (
                <p className="mb-0 text-white-50 ">4. Mint your NFT</p>
              ) : (
                <p className="mb-0 text-white-50 font-weight-bold">
                  4. Mint your NFT
                </p>
              )}
            </div>
            <div className="account-status">
              <ConnectButton accountStatus="address" chainStatus="none" />
            </div>
          </div>
          <div className="mint-content col-10 text-center">
            {mintingStage == "notChainSelected" && (
              <>
                <p className="text-white mt-5">
                  You are connected to {chain.name}.
                </p>
                <p className="text-white">
                  Do you want to mint on a different chain?
                </p>
                <button
                  onClick={openChainModal}
                  type="button"
                  className="btn btn-primary network-button mt-2"
                >
                  Switch network
                </button>
                <div
                  className="ok-button-container py-5"
                  onClick={() => {
                    setMintingStage("notMetadataEntered");
                  }}
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Proceed"
                >
                  <i className="fab fa-solid fa-check"></i>
                </div>
              </>
            )}
            {mintingStage == "notMetadataEntered" && (
              <>
                <form className="metadata-form mt-3">
                  <div className="form-group">
                    <label htmlFor="img-name" className="text-white">
                      Name{" "}
                      <em className="text-small text-white-50">(required)</em>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="img-name"
                      aria-describedby="image name"
                      value={name}
                      onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="img-description" className="text-white">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="img-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="img-name" className="text-white">
                      Custom traits
                    </label>
                    {inputCustomTraits}
                  </div>
                </form>
                <div
                  className="ok-button-container py-3"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!data[selected]) {
                      alert("No image selected");
                    } else if (name == "") {
                      alert("Please enter a name for your image");
                    } else {
                      e.preventDefault();
                      submit();
                      setMintingStage("submitted");
                    }
                  }}
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Submit"
                >
                  <i className="fab fa-solid fa-check"></i>
                </div>
              </>
            )}
            {mintingStage != "notChainSelected" &&
              mintingStage != "notMetadataEntered" && (
                <>
                  <div className="display-mint-status mt-5">
                    {mintingStage == "submitted" && (
                      <h4 className="text-white">Submitted ...</h4>
                    )}
                    {mintingStage == "uploadingImage" && (
                      <h4 className="text-white">
                        Uploading image to decentralized storage ...
                      </h4>
                    )}
                    {mintingStage == "uploadingMetadata" && (
                      <h4 className="text-white">
                        Uploading metadata to decentralized storage ...
                      </h4>
                    )}
                    {mintingStage == "uploadFailed" && (
                      <h4>Error while uploading to decentralized storage.</h4>
                    )}
                    {mintingStage == "readyForMint" && (
                      <h4 className="text-white">Preparing transaction ...</h4>
                    )}
                    {mintingStage == "signTx" && (
                      <h4 className="text-white">Please sign transaction!</h4>
                    )}
                    {mintingStage == "prepareFailed" && (
                      <h4 className="text-white">
                        There was an error while preparing your transaction.
                      </h4>
                    )}
                    {mintingStage == "minting" && (
                      <h4 className="text-white">Minting ...</h4>
                    )}
                    {mintingStage == "completed" && (
                      <h4 className="text-white">Success! 🎉</h4>
                    )}
                    {mintingStage == "txFailed" && (
                      <h4 className="text-white">
                        Transaction failed. Try again?
                      </h4>
                    )}
                  </div>
                  <div className="minting-info d-flex flex-column gap-2 pt-3">
                    {imageLink && (
                      <a href={imageLink} target="_blank">
                        View Image
                        <i class="fab fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                    {metadataLink && (
                      <a href={metadataLink} target="_blank">
                        View Metadata
                        <i class="fab fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                    {txHash && (
                      <a
                        href={`https://goerli.etherscan.io/tx/${txHash.replace(
                          /['"]+/g,
                          ""
                        )}`}
                        target="_blank"
                      >
                        View Transaction{" "}
                        <i class="fab fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                    {tokenId && (
                      <a
                        href={`https://testnet.rarible.com/token/0x1352756518108BAB84e87547e538c9382944551B:${tokenId}`}
                        target="_blank"
                      >
                        View NFT on Rarible{" "}
                        <i class="fab fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                  </div>
                  <div className="minting-cta">
                    {(mintingStage == "uploadFailed" ||
                      mintingStage == "prepareFailed") && (
                      <button
                        className="btn btn-primary try-again-button"
                        onClick={submit}
                      >
                        Try again
                      </button>
                    )}
                    {(mintingStage == "readyForMint" ||
                      mintingStage == "minting" ||
                      mintingStage == "signTx" ||
                      mintingStage == "txFailed") && (
                      <MintingWalletInteraction
                        chainId={chain.id}
                        mintingStage={mintingStage}
                        setMintingStage={setMintingStage}
                        tokenURI={tokenURI}
                        setTxHash={setTxHash}
                        setTokenId={setTokenId}
                        setPending={setPending}
                      />
                    )}
                  </div>
                </>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mint;
