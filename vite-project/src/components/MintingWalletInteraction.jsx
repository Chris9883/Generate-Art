import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { useEffect } from "react";
import { abi, contractAddress } from "../constants/contract.js";

const MintingWalletInteraction = ({
  chainId,
  mintingStage,
  setMintingStage,
  tokenURI,
  setTxHash,
  setTokenId,
  setPending,
}) => {
  let txHash;
  // prepare contract interaction
  const { config, isSuccess } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "safeMint",
    args: [tokenURI.toString()],
    chainId: chainId,
    // set mint fee (optional):
    /*overrides: {
      from: address,
      value: ethers.utils.parseEther('0.01'),
    },
    */
    onError(error) {
      console.error(error);
      setMintingStage("prepareFailed");
    },
    onSuccess() {
      setMintingStage("signTx");
    },
  });
  const { writeAsync } = useContractWrite({
    ...config,
    onSuccess(data) {
      txHash = data.hash;
      setTxHash(JSON.stringify(data.hash));
      setMintingStage("minting");
    },
    onError(error) {
      console.error(error);
      setMintingStage("signTx"); // this is the case when user rejects tx
    },
  });

  // user prompted to sign transaction as soon as write is available
  // can redo this step manually by pressing button
  async function write() {
    const tx = await writeAsync?.();
    const txReceipt = await tx.wait();
    if (txReceipt.status == 1) {
      setPending(false);
      setMintingStage("completed");
      let tokenId = parseInt(txReceipt.logs[0].topics[3]);
      console.log("tokenId", tokenId);
      setTokenId(tokenId);
    } else {
      setPending(false);
      setMintingStage("txFailed");
    }
  }

  useEffect(() => {
    if (writeAsync) {
      write();
    }
  }, []);

  return (
    <>
      {mintingStage == "signTx" ? (
        <button
          className="btn btn-primary sign-button mt-3"
          onClick={async (e) => {
            e.preventDefault();
            write();
          }}
        >
          Sign
        </button>
      ) : (
        <div className="empty-div"></div>
      )}
    </>
  );
};

export default MintingWalletInteraction;
