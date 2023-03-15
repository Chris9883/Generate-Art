# Generate Art

Final project submission for Alchemy University

## Description

Generate Art is a web application that allows users to get AI-generated images based on a text prompt by DALL-E. The user can then mint the best picture as a NFT.

## Usage

To use the application, follow these steps:

1. Open the demo version in your browser.
2. Enter a prompt in the input field and click on the "Generate" button.
3. Wait for the AI to generate pictures based on your prompt.
4. Scroll through the generated pictures and choose the one you like the most.
5. Connect your web3 wallet
6. Add a name, description and traits that describe your image best
7. Click on the "Mint NFT" button to mint the selected picture as a NFT.

## Project Layout

This repo contains a hardhat project folder and a frontend folder.

The smart contract implements the ERC721 token standard and makes use of OpenZeppelin's extensions ERC721URIStorage and ERC721Burnable as well as Ownable for access control.

The frontend application is built with Vite and Bootstrap.  
It makes use of the [OpenAI API](https://platform.openai.com/docs/introduction) for generating images with DALL-E.  
Before minting, the image and metadata are uploaded to [Pinata](https://www.pinata.cloud/).  
The app uses [Rainbowkit](https://www.rainbowkit.com/) and [wagmi hooks](https://wagmi.sh/) for wallet interactions and the [Alchemy SDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart) to fetch and display recently minted images.

## Run locally

In order to deploy or test the smart contract, navigate into the hardhat diractory `cd hardhat` and install dependencies with `npm install`.

- to compile run `npx hardhat compile`
- run test cases with `npx hardhat test`
- adapt your `.env` and `hardhat.config.js` files
- to deploy run `npx hardhat run scripts/deploy.js --network <network_name>`

To run the front-end application, navigate into the vite-project directory `cd vite-project`and install dependencies with `npm install`.  
Run the development server `npm run dev`and open [https://localhost:5173](https://localhost:5173) to view the app in the browser
