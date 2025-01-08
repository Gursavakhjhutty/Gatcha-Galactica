import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import exoplanetData from './exoplanet_data.json';
import starData from './star_data.json';
import GalacticGacha from './GalacticGacha.json';

const GalacticGachaApp = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenCounter, setTokenCounter] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Connect to the Ethereum network
          const browserProvider = new BrowserProvider(window.ethereum);
          setProvider(browserProvider);

          // Get the contract instance
          const signer = await browserProvider.getSigner();
          const contractInstance = new Contract(
            '0x5fbdb2315678afecb367f032d93f642f64180aa3', // Contract address
            GalacticGacha.abi,
            signer
          );
          setContract(contractInstance);

          // Fetch the token counter
          const counter = await contractInstance.tokenCounter();
          setTokenCounter(Number(counter));
        } catch (error) {
          console.error("Failed to connect wallet", error);
        }
      } else {
        console.error("Ethereum wallet not found");
      }
    };

    initializeApp();
  }, []);

  const handleMint = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }

    try {
      // Randomly choose between star and exoplanet (50/50 chance)
      const isStar = Math.random() < 0.5;

      let selectedData, dataType, metadataId;

      if (isStar) {
        // Choose a random star
        const randomStarIndex = Math.floor(Math.random() * starData.length);
        selectedData = starData[randomStarIndex];
        dataType = 'star';
        metadataId = selectedData.id;
      } else {
        // Choose a random exoplanet
        const randomExoplanetIndex = Math.floor(Math.random() * exoplanetData.length);
        selectedData = exoplanetData[randomExoplanetIndex];
        dataType = 'exoplanet';
        metadataId = selectedData.id;
      }

      // Construct the metadata URI
      const metadataURI = `https://api.galacticgacha.com/metadata/${dataType}/${metadataId}`;

      // Prepare additional details
      const additionalDetails = JSON.stringify({
        type: dataType,
        originalData: selectedData
      });

      // Get signer address
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      // Call the mint function on the contract
      const tx = await contract.mint(
        signerAddress, // Recipient address (using connected wallet)
        metadataURI,
        dataType === 'exoplanet' ? metadataId : 'N/A', // exoplanet ID
        dataType === 'star' ? metadataId : 'N/A', // star ID
        additionalDetails
      );
      await tx.wait();

      // Update the token counter
      const counter = await contract.tokenCounter();
      setTokenCounter(Number(counter));

      console.log(`Minted a new ${dataType} token!`, selectedData);
    } catch (error) {
      console.error("Error minting token:", error);
    }
  };

  return (
    <div>
      <h1>Galactic Gacha</h1>
      <p>Total Tokens: {tokenCounter}</p>
      <button onClick={handleMint}>Mint Celestial Token</button>
    </div>
  );
};

export default GalacticGachaApp;