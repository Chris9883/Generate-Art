import axios from "axios";
import FormData from "form-data";

// pinata makes content available with content url
// "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;

export default async function uploadImagePinata(
  base64Image,
  setMintingStage,
  setImageLink
) {
  const formData = new FormData();
  await fetch(base64Image)
    .then((res) => res.blob())
    .then((blob) => {
      formData.append("file", blob);
    });

  try {
    setMintingStage("uploadingImage");
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      }
    );
    setImageLink(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
    return res.data.IpfsHash;
  } catch (error) {
    setMintingStage("uploadFailed");
    if (error.message.includes("server")) {
      console.error("Pinata Server Error");
    } else {
      console.error(error);
    }
  }
}
