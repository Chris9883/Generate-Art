import { useState } from "react";
import { useAccount } from "wagmi";
import SideNav from "./SideNav";
import FeaturedText from "./FeaturedText";
import Input from "./Input";
import Output from "./Output";
import Mint from "./Mint";

function Create() {
  const { address, isConnected } = useAccount();
  //type: textToImage (standard), edit, variate
  const [type, setType] = useState("textToImage");
  const [prompt, setPrompt] = useState("");
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("1024x1024");
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);
  const [selected, setSelected] = useState(0);
  const [mintingStage, setMintingStage] = useState("notMetadataEntered"); // multichain: useState("notChainSelected")

  // <SideNav type={type} setType={setType} />
  //
  return (
    <section
      className="create-section bg-light d-flex flex-column align-items-center"
      id="create"
    >
      <div className="row1 row gx-0 col-sm-12 col-md-12 col-xxl-10 px-xxl-5 d-flex">
        <Input
          type={type}
          amount={amount}
          setAmount={setAmount}
          prompt={prompt}
          setPrompt={setPrompt}
          size={size}
          setSize={setSize}
          setData={setData}
          setSubmitted={setSubmitted}
          setSelected={setSelected}
          setDataReceived={setDataReceived}
          pending={pending}
          setPending={setPending}
          setMintingStage={setMintingStage}
        />
        <FeaturedText type={type} />
      </div>
      <div className="row2 row gx-0 mb-xxl-5 mb-lg-0 col-12 col-xxl-10 px-xxl-5 justify-content-center">
        <Output
          data={data}
          submitted={submitted}
          amount={amount}
          selected={selected}
          setSelected={setSelected}
          dataReceived={dataReceived}
        />

        <Mint
          data={data}
          selected={selected}
          address={address}
          isConnected={isConnected}
          pending={pending}
          setPending={setPending}
          mintingStage={mintingStage}
          setMintingStage={setMintingStage}
        />
      </div>
    </section>
  );
}

export default Create;
