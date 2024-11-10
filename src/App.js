import contractABI from "./contractABI.json";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"; // Ensure proper import of ethers
import "./App.css";

const contractAddress = "0xac0ee857926b09cd08158540915e06d1dbc73999";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [serviceDetails, setServiceDetails] = useState("");
  const [parts, setParts] = useState(["", "", "", "", ""]);
  const [recordId, setRecordId] = useState("");
  const [signature, setSignature] = useState("");
  const [serviceCenterAddress, setServiceCenterAddress] = useState("");
  const [unverifiedRecords, setUnverifiedRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newSigner = newProvider.getSigner();
        const address = await newSigner.getAddress();
        setWalletAddress(address);
        setProvider(newProvider);
        setSigner(newSigner);
        const newContract = new ethers.Contract(
          contractAddress,
          contractABI,
          newSigner
        );
        setContract(newContract);
        setLoading(false);
      } else {
        alert("MetaMask is required.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setLoading(false);
    }
  };

  const initiateService = async () => {
    if (!serviceDetails || !parts) return;
    setLoading(true);
    try {
      const tx = await contract.initiateService(
        walletAddress,
        serviceDetails,
        parts
      );
      await tx.wait();
      alert("Service initiated successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error initiating service:", error);
      setLoading(false);
    }
  };

  const registerServiceCenter = async () => {
    if (
      !serviceCenterAddress ||
      !ethers.utils.isAddress(serviceCenterAddress)
    ) {
      alert("Please enter a valid Ethereum address.");
      return;
    }
    setLoading(true);
    try {
      const tx = await contract.registerServiceCenter(serviceCenterAddress);
      await tx.wait();
      alert("Service Center Registered!");
      setLoading(false);
    } catch (error) {
      console.error("Error registering service center:", error);
      setLoading(false);
    }
  };

  const verifyRecord = async () => {
    if (!recordId || !signature) return;
    setLoading(true);
    try {
      const tx = await contract.verifyByBrand(recordId, signature);
      await tx.wait();
      alert("Record verified by brand!");
      setLoading(false);
    } catch (error) {
      console.error("Error verifying record by brand:", error);
      setLoading(false);
    }
  };

  const verifyParts = async () => {
    if (!recordId || !signature) return;
    setLoading(true);
    try {
      // Call the function directly if it doesn't send a transaction
      const result = await contract.verifyPartsAuthenticity(
        recordId,
        signature
      );

      // Process the result (assuming result indicates success or failure)
      if (result) {
        alert("Parts verified for authenticity!");
      } else {
        alert("Verification failed or returned unexpected result.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error verifying parts authenticity:", error);
      setLoading(false);
    }
  };

  const verifyByUser = async () => {
    if (!recordId || !signature) return;
    setLoading(true);
    try {
      const tx = await contract.verifyByUser(recordId, signature);
      await tx.wait();
      alert("Record verified by user!");
      setLoading(false);
    } catch (error) {
      console.error("Error verifying record by user:", error);
      setLoading(false);
    }
  };

  const getRecord = async () => {
    if (!recordId || !contract) return;
    const record = await contract.records(recordId);
    console.log("Record Data: ", record);
  };

  const getUnverifiedRecords = async () => {
    setLoading(true);
    try {
      const unverifiedRecords = await contract.getUnverifiedRecords();
      setUnverifiedRecords(unverifiedRecords);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching unverified records:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum && !walletAddress) {
      connectWallet();
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 text-white p-4 w-full text-center">
        <h1 className="text-2xl font-bold">Vehicle Service Record DApp</h1>
      </header>
      <main className="p-6 w-full max-w-xl mt-6">
        {loading && (
          <div className="text-center text-lg text-yellow-600 mb-6">
            Processing... Please wait.
          </div>
        )}
        {walletAddress ? (
          <p className="text-center text-lg mb-6">
            Connected Wallet Address: {walletAddress}
          </p>
        ) : (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-6"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Service Center Registration */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Register Service Center
            </h2>
            <input
              type="text"
              value={serviceCenterAddress}
              onChange={(e) => setServiceCenterAddress(e.target.value)}
              placeholder="Service Center Address"
              className="border p-2 w-full mb-4 text-center"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              onClick={registerServiceCenter}
            >
              Register Service Center
            </button>
          </div>

          {/* Initiate Service */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Initiate Service</h2>
            <input
              type="text"
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
              placeholder="Service Details"
              className="border p-2 w-full mb-4 text-center"
            />
            {parts.map((part, index) => (
              <input
                key={index}
                type="text"
                value={part}
                onChange={(e) => {
                  const newParts = [...parts];
                  newParts[index] = e.target.value;
                  setParts(newParts);
                }}
                placeholder={`Part ${index + 1}`}
                className="border p-2 w-full mb-2 text-center"
              />
            ))}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              onClick={initiateService}
            >
              Initiate Service
            </button>
          </div>

          {/* Unverified Records */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Unverified Records</h2>
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded w-full mb-4"
              onClick={getUnverifiedRecords}
            >
              Get Unverified Records
            </button>
            {unverifiedRecords.length > 0 ? (
              <ul className="space-y-2">
                {unverifiedRecords.map((recordId, index) => (
                  <li key={index} className="text-center">
                    <span>Record ID: {recordId.toString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600">
                No unverified records found.
              </p>
            )}
          </div>

          {/* Verify by Brand */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Verify Record by Brand
            </h2>
            <input
              type="number"
              value={recordId || ""}
              onChange={(e) => setRecordId(e.target.value)}
              placeholder="Record ID"
              className="border p-2 w-full mb-4 text-center"
            />
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Signature"
              className="border p-2 w-full mb-4 text-center"
            />
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded w-full"
              onClick={verifyRecord}
            >
              Verify Record by Brand
            </button>
          </div>

          {/* Verify Parts Authenticity */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Verify Parts Authenticity
            </h2>
            <input
              type="number"
              value={recordId || ""}
              onChange={(e) => setRecordId(e.target.value)}
              placeholder="Record ID"
              className="border p-2 w-full mb-4 text-center"
            />
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Signature"
              className="border p-2 w-full mb-4 text-center"
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
              onClick={verifyParts}
            >
              Verify Parts Authenticity
            </button>
          </div>

          {/* Verify Record by User */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Verify Record by User
            </h2>
            <input
              type="number"
              value={recordId || ""}
              onChange={(e) => setRecordId(e.target.value)}
              placeholder="Record ID"
              className="border p-2 w-full mb-4 text-center"
            />
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Signature"
              className="border p-2 w-full mb-4 text-center"
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded w-full"
              onClick={verifyByUser}
            >
              Verify Record by User
            </button>
          </div>

          {/* Get Record Data */}
          <div className="bg-white p-4 rounded shadow-md">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded w-full"
              onClick={() => getRecord(recordId)}
            >
              Get Record Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
