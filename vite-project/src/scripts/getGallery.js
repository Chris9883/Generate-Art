import { Alchemy, Network } from "alchemy-sdk";
import { contractAddress } from "../constants/contract";

const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const settings = {
  apiKey: apiKey,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

export default async function getGallery(setImages1, setImages2) {
  try {
    let data = await alchemy.nft.getNftsForContract(contractAddress);
    let images1 = [];
    let images2 = [];
    let emptyArray = [0, 0, 0, 0, 0, 0, 0];
    for (let i in data.nfts.reverse()) {
      if (data.nfts[i].media[0]?.gateway) {
        if (i % 2 == 0) {
          images1.push(data.nfts[i].media[0].gateway);
        } else {
          images2.push(data.nfts[i].media[0].gateway);
        }
      }
    }
    if (images1 != [] && images2 != []) {
      while (images1.length < 40) {
        images1 = images1.concat(images1);
        images2 = images2.concat(images2);
      }
    }
    images1 = emptyArray.concat(images1);
    images2 = emptyArray.concat(images2);
    setImages1(images1);
    setImages2(images2);
  } catch (e) {
    if (e.message.includes("server")) {
      console.error("Alchemy Server error: can not fetch NFTs for gallery.");
    } else {
      console.error(e);
    }
  }
}
