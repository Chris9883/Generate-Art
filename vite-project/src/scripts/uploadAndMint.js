import uploadImagePinata from "./uploadImagePinata";
import uploadMetadataPinata from "./uploadMetadataPinata";

export default async function uploadAndMint(
  setMintingStage,
  base64Image,
  setImageLink,
  name,
  description,
  address,
  traitTypes,
  traitValues,
  setMetadataLink,
  setTokenURI
) {
  setMintingStage("uploadingMetadata");

  uploadImagePinata(base64Image, setMintingStage, setImageLink).then(
    (imageCID) => {
      let imageURI = `ipfs://${imageCID}`;
      uploadMetadataPinata(
        setMintingStage,
        setMetadataLink,
        name,
        description,
        imageURI,
        address,
        traitTypes,
        traitValues
      ).then((metadataCID) => {
        let tokenURI = `ipfs://${metadataCID}`;
        setTokenURI(tokenURI);
        setMintingStage("readyForMint");
      });
    }
  );
}
