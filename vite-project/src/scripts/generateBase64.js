import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generateBase64(
  prompt,
  amount,
  size,
  setData,
  setDataReceived,
  setPending
) {
  try {
    const result = await openai.createImage({
      prompt,
      n: parseInt(amount),
      size: size,
      response_format: "b64_json",
      // user: "userId" (optional)
    });
    let resultArray = [];
    for (let i = 0; i < result.data.data.length; i++) {
      resultArray.push(
        `data:image/png;base64, ${result.data.data[i].b64_json}`
      );
    }
    setData(resultArray);
    setDataReceived(true);
    setPending(false);
  } catch (error) {
    setPending(false);
    if (error.response) {
      console.error(
        `${error} \nError type: ${error.response.data.error.type} \nError message: ${error.response.data.error.message}`
      );
      if (error.response.data.error.message.includes("overloaded")) {
        console.error(error);
        alert("Too many requests, please try again later");
      } else if (error.response.data.error.message.includes("server")) {
        console.error("OpenAI server error");
        alert("Server Error, please try again later");
      } else {
        console.error(error);
        alert(
          `${error} \nError type: ${error.response.data.error.type} \nError message: ${error.response.data.error.message}`
        );
      }
    } else {
      if (error.message.includes("server")) {
        alert("Server Error, please try again later");
      } else {
        console.error(error);
        alert(error);
      }
    }
  }
}
