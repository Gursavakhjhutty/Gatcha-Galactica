# GalacticGacha NFT Project

GalacticGacha is a blockchain-based collectible NFT project where users can mint unique celestial objects - either stars or exoplanets. Each mint randomly selects between a star or an exoplanet, creating a unique NFT with specific metadata and characteristics.

## Quick Disclaimer

-The project is runnable but will not give a token with exoplanet data or Star data as the json files for both datasets are too big to upload to github.

## Features

- Random minting system that chooses between stars and exoplanets
- ERC721 standard NFT implementation
- Metadata storage for celestial object characteristics
- Web3-enabled React frontend interface
- MetaMask wallet integration

## Technical Stack

- Solidity (Smart Contract)
- React (Frontend)
- ethers.js (Web3 Integration)
- OpenZeppelin (Smart Contract Libraries)
- MetaMask (Wallet Connection)

## Prerequisites

- Node.js and npm installed
- MetaMask browser extension
- Basic understanding of Ethereum and smart contracts

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Gursavakhjhutty/Gatcha-Galactica
cd galactic-gacha
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Smart Contract Deployment

1. Compile the smart contract:
```bash
npx hardhat compile
```

2. Deploy to your chosen network:
```bash
npx hardhat run scripts/deploy.js --network [network-name]
```

## Frontend Setup

1. Update the contract address in `src/App.js` with your deployed contract address

2. Start the development server:
```bash
npm start
```

3. Access the application at `http://localhost:3000`

## Project Structure

```
galactic-gacha/
├── contracts/
│   └── GalacticGacha.sol
├── src/
│   ├── App.js
│   ├── exoplanet_data.json
│   └── star_data.json
├── public/
└── package.json
```

## Usage

1. Connect your MetaMask wallet to the application
2. Click the "Mint Celestial Token" button
3. Confirm the transaction in MetaMask
4. Your NFT will be minted with random celestial object data

## Smart Contract Functions

- `mint(address to, string memory metadataURI, string memory exoplanetId, string memory starId, string memory additionalDetails)`
- `burn(uint256 tokenId)`
- `getTokenMetadata(uint256 tokenId)`

## Data Structure

### Star Data Format
```json
{
  "id": "string",
  "name": "string",
  "type": "string",
  // Additional star properties
}
```

### Exoplanet Data Format
```json
{
  "id": "string",
  "name": "string",
  "discoveryYear": "number",
  // Additional exoplanet properties
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Safety Notes

- Always verify transaction details before confirming
- Keep your private keys secure
- Test thoroughly on testnet before mainnet deployment
- Review gas costs before transactions

## Support

For support, please open an issue in the GitHub repository.
