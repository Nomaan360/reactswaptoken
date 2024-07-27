import logo from './logo.svg';
import './App.css';
import {abis,contAddress,nestle_abi,nestle_contractAddress,mcd_contractAddress,mcd_abi} from './abis_constant'
import { ethers } from 'https://unpkg.com/ethers@5.2/dist/ethers.esm.min.js';
import Header from './Header.js';
import Swap from './Swap.js';
import Home from './Home.js';
import Token from './Token.js';
import Form2 from './Form2.js';
import Form3 from './Form3.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect, useRef } from 'react';


let tokenC_contract='0x7e18a8C2828BEF88D876CD9dDcBFFacC5EB6CED6'
let tokenD_contract='0x28e7E1bf3B6b90789a92229a0a0ecF470364c354'
function App() {
  const [wallet,connected]=useState(false);

  const connectContract=async()=>{

      let contractAddress = contAddress;
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let abi =abis
      console.log('provider',provider);
      const signer = provider.getSigner();
      console.log('signer',signer);
      let contract = new ethers.Contract(contractAddress, abi, signer);
      console.log('contract',contract);
      
      return contract;
  }
  
 
  
  


  const connectwallet = async () => {
      try {
          if (!window.ethereum) {
              return console.log("INSTALL METAMASk");
          }
          // const { ethers } = require('ethers');
          console.log('tryty',ethers);
          const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          const firstAccount = accounts[0];
          let addr= document.getElementById('addr')
          addr.innerText=firstAccount 
        console.log(addr);
          console.log('s',firstAccount);
          console.log('abis',abis);
          let contract= connectContract()
          console.log('contract',contract);
          connected(true)
          return firstAccount;
      } catch (error) {
          console.log(error);
      }
  }
const fetchBAL=async()=>{
  let walletAddr= await connectwallet()
  console.log('walletAddr',walletAddr);
  const contractIns =await connectContract();
console.log('contractIns',contractIns);
  let bal=await contractIns.getBalance('AMOY',walletAddr)
  let tsupply=await contractIns.getTotalSupply('AMOY')
  let tname=await contractIns.getName('AMOY')
  let taddress=await contractIns.getTokenAddress('AMOY')
  let cbal=await contractIns.getEthBalance()
  let camt=await ethers.utils.formatEther(cbal)
  let tamt=await ethers.utils.formatEther(bal)

  console.log('bal',bal);
  console.log('total supply',tsupply);
  console.log('token name',tname);
  console.log('token address',taddress);
  console.log('token amt',tamt);
  console.log('contract bal',camt);
  let token_addr= document.getElementById('token_addr')
  token_addr.innerText=taddress 
  let balance =  await contractIns.getContractBalance("0x3A8fd8628d260f9D8619732F2227ecc5aA067157");
  let amt=await ethers.utils.formatEther(balance)
  console.log("before contract amt ===",amt);


}
let ethtotoken=async()=>{
  const contractIns =await connectContract();
  try{
    const amountInEther = "1"; // The Ether amount you want to convert
    const amountInWei = ethers.utils.parseEther(amountInEther);
    let swapethtkn=await contractIns.swapEthToToken('AMOY', { value: amountInWei })
    const txReceipt = await swapethtkn.wait();
    console.log('swapethtkn',swapethtkn);
    console.log('txReceipt',txReceipt);

  }
  catch(e){
    console.log('error',e);
  }
  
}

let conttotoken=async()=>{
  const contractIns =await connectContract();
  const wallet =await connectwallet();
  try{
    let taddress=await contractIns.getTokenAddress('AMOY')
    console.log('taddress',taddress);

    const amountToApprove = ethers.utils.parseEther('2'); // 1 token in wei (adjust as needed)
    let approveToken=await taddress.approve(contAddress,amountToApprove)
    const approveReceipt = await approveToken.wait();
    console.log('approveToken',approveToken);
    console.log('approveReceipt',approveReceipt);

    let check_allownce=await contractIns.allowance(wallet,contAddress)
    const allowanceInEther =await ethers.utils.formatEther(check_allownce);
    console.log('check_allownce',Number(check_allownce));
    console.log('allowanceInEther',allowanceInEther);

  }
  catch(e){
    console.log('error',e);
  }
}

const swapnsttokens=async(token)=>{
  const wallet =await connectwallet();
  const contractIns =await connectContract();
  try{
    if(token>4){
      alert('Amount should be less than 5')
      return
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let nestle_contract = new ethers.Contract(nestle_contractAddress, nestle_abi, signer);
    const amountToApprove = ethers.utils.parseEther(token); // 1 token in wei (adjust as needed)

    let approveToken=await nestle_contract.approve(contAddress,amountToApprove)
    const approveReceipt = await approveToken.wait();
    console.log('approveToken',approveToken);
    console.log('approveReceipt',approveReceipt);

    let check_allownce=await nestle_contract.allowance(wallet,contAddress)
    const allowanceInEther =await ethers.utils.formatEther(check_allownce);
    console.log('check_allownce',Number(check_allownce));
    console.log('allowanceInEther',allowanceInEther);

    const balance = await nestle_contract.balanceOf(wallet);
    console.log("Balance is: ", ethers.utils.formatEther(balance));

    let transferFrom=await contractIns.transfertoken(nestle_contractAddress,mcd_contractAddress,token)
    const txtfrom = await transferFrom.wait();
    console.log('txtfrom',txtfrom);
    
    
  }
  catch(e){
    console.log('error',e);
  }
}
const swapmcdtokens=async(token)=>{
  const wallet =await connectwallet();
  const contractIns =await connectContract();
  try{
    if(token>4){
      alert('Amount should be less than 5')
      return
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let nestle_contract = new ethers.Contract(mcd_contractAddress, mcd_abi, signer);
    const amountToApprove = ethers.utils.parseEther(token); // 1 token in wei (adjust as needed)

    let approveToken=await nestle_contract.approve(contAddress,amountToApprove)
    const approveReceipt = await approveToken.wait();
    console.log('approveToken',approveToken);
    console.log('approveReceipt',approveReceipt);

    let check_allownce=await nestle_contract.allowance(wallet,contAddress)
    const allowanceInEther =await ethers.utils.formatEther(check_allownce);
    console.log('check_allownce',Number(check_allownce));
    console.log('allowanceInEther',allowanceInEther);

    const balance = await nestle_contract.balanceOf(wallet);
    console.log("Balance is: ", ethers.utils.formatEther(balance));

    let transferFrom=await contractIns.transfertoken(mcd_contractAddress,nestle_contractAddress,token)
    const txtfrom = await transferFrom.wait();
    console.log('txtfrom',txtfrom);
    
    
  }
  catch(e){
    console.log('error',e);
  }
}






  return (
    <div className="App">
      {/* <button onClick={connectwallet}>Connect Wallet</button>
      <br/> */}
    <BrowserRouter>
      <Routes>
        <Route  element={<Header connectwallet={connectwallet} wallet={wallet}/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/form2" element={<Form2/>} />
          <Route path="/form3" element={<Form3/>} />
          <Route path="swap" element={<Swap swapnsttokens={swapnsttokens} swapmcdtokens={swapmcdtokens}/>} />
          <Route path="tokens" element={<Token connectwallet={connectwallet} connectContract={connectContract}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
   
     
{/* 
      <button onClick={fetchBAL}>Fetch bal</button>
      <br/>
      <button onClick={ethtotoken}>Transact eth to token</button>
      <br/>
      <button onClick={conttotoken}>Transact contract to token</button>
      <br/>
      <button onClick={swaptokens}>Swap tokens</button>
      <br/>
      <h5 id="addr"></h5>
      <h5 id="token_addr"></h5> */}
    </div>
  );
}

export default App;
