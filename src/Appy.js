// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers"; // Ensure proper import of ethers
// import "./App.css";

// const contractAddress = 0xac0ee857926b09cd08158540915e06d1dbc73999;
// const contractABI = [
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "recordId",
//         type: "uint256",
//       },
//     ],
//     name: "BrandVerified",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_customer",
//         type: "address",
//       },
//       {
//         internalType: "string",
//         name: "_serviceDetails",
//         type: "string",
//       },
//       {
//         internalType: "string[5]",
//         name: "_parts",
//         type: "string[5]",
//       },
//     ],
//     name: "initiateService",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_serviceCenter",
//         type: "address",
//       },
//     ],
//     name: "registerServiceCenter",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_serviceCenter",
//         type: "address",
//       },
//     ],
//     name: "removeServiceCenter",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "serviceCenter",
//         type: "address",
//       },
//     ],
//     name: "ServiceCenterRegistered",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "serviceCenter",
//         type: "address",
//       },
//     ],
//     name: "ServiceCenterRemoved",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "recordId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "customer",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "serviceCenter",
//         type: "address",
//       },
//     ],
//     name: "ServiceRecorded",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "recordId",
//         type: "uint256",
//       },
//     ],
//     name: "UserVerified",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_recordId",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes",
//         name: "_signature",
//         type: "bytes",
//       },
//     ],
//     name: "verifyByBrand",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_recordId",
//         type: "uint256",
//       },
//       {
//         internalType: "bytes",
//         name: "_signature",
//         type: "bytes",
//       },
//     ],
//     name: "verifyByUser",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "brand",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getUnverifiedRecords",
//     outputs: [
//       {
//         internalType: "uint256[]",
//         name: "",
//         type: "uint256[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "recordCount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "records",
//     outputs: [
//       {
//         internalType: "address",
//         name: "customer",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "serviceCenter",
//         type: "address",
//       },
//       {
//         internalType: "string",
//         name: "serviceDetails",
//         type: "string",
//       },
//       {
//         internalType: "bool",
//         name: "verifiedByBrand",
//         type: "bool",
//       },
//       {
//         internalType: "bool",
//         name: "verifiedByUser",
//         type: "bool",
//       },
//       {
//         internalType: "bool",
//         name: "completed",
//         type: "bool",
//       },
//       {
//         internalType: "bytes",
//         name: "brandSignature",
//         type: "bytes",
//       },
//       {
//         internalType: "bytes",
//         name: "customerSignature",
//         type: "bytes",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "serviceCenters",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_recordId",
//         type: "uint256",
//       },
//       {
//         internalType: "string",
//         name: "_partId",
//         type: "string",
//       },
//     ],
//     name: "verifyPartsAuthenticity",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

// function App() {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState("");
//   const [parts, setParts] = useState(["", "", "", "", ""]);
//   const [recordId, setRecordId] = useState("");
//   const [signature, setSignature] = useState("");
//   const [loading, setLoading] = useState(false);

//   const connectWallet = async () => {
//     try {
//       setLoading(true);
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         const newProvider = new ethers.providers.Web3Provider(window.ethereum);
//         const newSigner = newProvider.getSigner();
//         const address = await newSigner.getAddress();
//         setWalletAddress(address);
//         setProvider(newProvider);
//         setSigner(newSigner);
//         const newContract = new ethers.Contract(
//           contractAddress,
//           contractABI,
//           newSigner
//         );
//         setContract(newContract);
//         setLoading(false);
//       } else {
//         alert("MetaMask is required.");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//       setLoading(false);
//     }
//   };

//   const initiateService = async () => {
//     if (!serviceDetails || !parts) return;
//     setLoading(true);
//     try {
//       const tx = await contract.initiateService(
//         walletAddress,
//         serviceDetails,
//         parts
//       );
//       await tx.wait();
//       alert("Service initiated successfully!");
//       setLoading(false);
//     } catch (error) {
//       console.error("Error initiating service:", error);
//       setLoading(false);
//     }
//   };

//   const verifyRecord = async () => {
//     if (!recordId || !signature) return;
//     setLoading(true);
//     try {
//       const tx = await contract.verifyByBrand(recordId, signature);
//       await tx.wait();
//       alert("Record verified by brand!");
//       setLoading(false);
//     } catch (error) {
//       console.error("Error verifying record:", error);
//       setLoading(false);
//     }
//   };

//   const verifyParts = async () => {
//     if (!recordId || !signature) return;
//     setLoading(true);
//     try {
//       const tx = await contract.verifyPartsAuthenticity(recordId, signature);
//       await tx.wait();
//       alert("Parts authenticity verified!");
//       setLoading(false);
//     } catch (error) {
//       console.error("Error verifying parts:", error);
//       setLoading(false);
//     }
//   };

//   const verifyByUser = async () => {
//     if (!recordId || !signature) return;
//     setLoading(true);
//     try {
//       const tx = await contract.verifyByUser(recordId, signature);
//       await tx.wait();
//       alert("Record verified by user!");
//       setLoading(false);
//     } catch (error) {
//       console.error("Error verifying record by user:", error);
//       setLoading(false);
//     }
//   };

//   const getRecord = async (recordId) => {
//     if (!recordId || !contract) return;
//     const record = await contract.records(recordId);
//     console.log("Record Data: ", record);
//   };

//   useEffect(() => {
//     if (window.ethereum && !walletAddress) {
//       connectWallet();
//     }
//   }, [walletAddress]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-blue-600 text-white p-4">
//         <h1 className="text-center text-2xl font-bold">
//           Vehicle Service Record DApp
//         </h1>
//       </header>

//       <main className="p-6">
//         {loading && (
//           <div className="text-center text-lg text-yellow-600">
//             Processing... Please wait.
//           </div>
//         )}
//         {walletAddress ? (
//           <p className="text-center text-lg">
//             Connected Wallet Address: {walletAddress}
//           </p>
//         ) : (
//           <button
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//             onClick={connectWallet}
//           >
//             Connect Wallet
//           </button>
//         )}

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">Initiate Service</h2>
//           <input
//             type="text"
//             value={serviceDetails}
//             onChange={(e) => setServiceDetails(e.target.value)}
//             placeholder="Service details"
//             className="border p-2 w-full mb-4"
//           />
//           {parts.map((part, index) => (
//             <input
//               key={index}
//               type="text"
//               value={part}
//               onChange={(e) => {
//                 const newParts = [...parts];
//                 newParts[index] = e.target.value;
//                 setParts(newParts);
//               }}
//               placeholder={`Part ${index + 1}`}
//               className="border p-2 w-full mb-2"
//             />
//           ))}
//           <button
//             className="bg-blue-500 text-white py-2 px-4 rounded mt-2 w-full"
//             onClick={initiateService}
//           >
//             Initiate Service
//           </button>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">Verify Record by Brand</h2>
//           <input
//             type="number"
//             value={recordId || ""}
//             onChange={(e) => setRecordId(e.target.value)}
//             placeholder="Record ID"
//             className="border p-2 w-full mb-4"
//           />
//           <input
//             type="text"
//             value={signature}
//             onChange={(e) => setSignature(e.target.value)}
//             placeholder="Signature"
//             className="border p-2 w-full mb-4"
//           />
//           <button
//             className="bg-yellow-500 text-white py-2 px-4 rounded mt-2 w-full"
//             onClick={verifyRecord}
//           >
//             Verify Record by Brand
//           </button>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Verify Parts Authenticity
//           </h2>
//           <input
//             type="number"
//             value={recordId || ""}
//             onChange={(e) => setRecordId(e.target.value)}
//             placeholder="Record ID"
//             className="border p-2 w-full mb-4"
//           />
//           <input
//             type="text"
//             value={signature}
//             onChange={(e) => setSignature(e.target.value)}
//             placeholder="Signature"
//             className="border p-2 w-full mb-4"
//           />
//           <button
//             className="bg-green-500 text-white py-2 px-4 rounded mt-2 w-full"
//             onClick={verifyParts}
//           >
//             Verify Parts Authenticity
//           </button>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">Verify Record by User</h2>
//           <input
//             type="number"
//             value={recordId || ""}
//             onChange={(e) => setRecordId(e.target.value)}
//             placeholder="Record ID"
//             className="border p-2 w-full mb-4"
//           />
//           <input
//             type="text"
//             value={signature}
//             onChange={(e) => setSignature(e.target.value)}
//             placeholder="Signature"
//             className="border p-2 w-full mb-4"
//           />
//           <button
//             className="bg-red-500 text-white py-2 px-4 rounded mt-2 w-full"
//             onClick={verifyByUser}
//           >
//             Verify Record by User
//           </button>
//         </div>

//         <div className="mt-6">
//           <button
//             className="bg-gray-500 text-white py-2 px-4 rounded mt-2 w-full"
//             onClick={() => getRecord(recordId)}
//           >
//             Get Record Data
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
