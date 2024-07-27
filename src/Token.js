import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect, useRef } from 'react';
import { ethers } from 'https://unpkg.com/ethers@5.2/dist/ethers.esm.min.js';
import {abis,customTokenabi} from './abis_constant'

const Token=({connectwallet,connectContract})=>{
    const [wallet,connect_wallet]=useState("");
    const [contract,connect_contract]=useState("");
    const [token1,changetoken1]=useState("");
    const [token2,changetoken2]=useState("");
    // const [token1mint,mint1]=useState("");
    // const [token2mint,mint2]=useState("");
    const [amount,setAmount]=useState("");
    const [sender,setSender]=useState("");
    const [reciever,setReciever]=useState("");
    const submit =async(e)=>{
        e.preventDefault();
        let wallet_c= await connectwallet();
        let connect_c= await connectContract();
        console.log('connect',wallet_c);
        console.log('contract',connect_c);
        connect_wallet(wallet_c)
        connect_contract(connect_c)
    }
    // const minttoken1=async()=>{
    //     console.log(wallet);
    //     console.log('connectContract',connectContract);
        

    //     let taddress=await contract.getTokenAddress(token1)
    //     mint1(taddress)
    //     console.log('taddress2',taddress);
    // }
    // const minttoken2=async()=>{
    //     console.log('token2',token2);
    //     let taddress=await contract.getTokenAddress(token2)
    //     mint2(taddress)
    //     console.log('taddress2',taddress);
    // }

    const swaptoken = async(e)=>{
        e.preventDefault();
        if(sender=="" || reciever=="" || amount==""){
            alert('Please fill all fields')
            return
        }
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log('sender',sender);
        let senderAddress=await contract.getTokenAddress(sender)
        let recieverAddress=await contract.getTokenAddress(reciever)

        let sendercontract = new ethers.Contract(senderAddress, customTokenabi, signer);
        const amountToApprove = ethers.utils.parseEther(amount);
        console.log('sendercontract',sendercontract);

        let approveToken=await sendercontract.approve(contract['address'],amountToApprove)
        const approveReceipt = await approveToken.wait();
        console.log('approveToken',approveToken);
        console.log('approveReceipt',approveReceipt);
        
        let check_allownce=await sendercontract.allowance(wallet,contract['address'])
        const allowanceInEther =await ethers.utils.formatEther(check_allownce);
        console.log('check_allownce',Number(check_allownce));
        console.log('allowanceInEther',allowanceInEther);

        const balance = await sendercontract.balanceOf(wallet);
        console.log("Balance is: ", ethers.utils.formatEther(balance));


        let transferFrom=await contract.transfertoken(senderAddress,recieverAddress,amount)
        const txtfrom = await transferFrom.wait();
        console.log('txtfrom',txtfrom);

    }
    const tokens = [
        "Tether USD", "BNB", "stETH", "TRON", 
        "Uniswap", "AMOY", "SHIBA INU", "Matic Token", "USD Coin"
      ];
    return (
        <>
            {wallet!="" ?
            <>

                {/* <div className='row'>
                    <div className='col-6'>
                        <input type="text" className="form-control" value={token1} onChange={(e)=>changetoken1(e.target.value)} placeholder="Enter 1st Token Name"/>
                        <br/>
                        <button className="btn btn-success" onClick={minttoken1}>Mint token1</button>
                    </div>
                    <div className='col-6'>
                        <input type="text" className="form-control" value={token2} onChange={(e)=>changetoken2(e.target.value)} placeholder="Enter 2nd Token Name"/>
                        <br/>
                        <button className="btn btn-success" onClick={minttoken2}>Mint token2</button>
                    </div>
                </div> */}

                {/* {token1mint!="" ?<h1>{token1mint}</h1>:""}
                {token2mint!="" ?<h1>{token2mint}</h1>:""}
                {token1mint!="" && token2mint!="" ?
                    <> */}
                     <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="number" className="form-label">Sender</label>
                                    <select className="form-select" value={sender} onChange={(e)=>setSender(e.target.value)}>
                                        <option value="">Select Token</option>
                                        {tokens.map(token => (
                                        <option key={token} value={token} disabled={token === reciever}>
                                            {token}
                                        </option>
                                        ))}
                                    </select>
                                        
                                    {/* <input type="text" className="form-control" value={sender} id="number" onChange={(e)=>setSender(e.target.value)}/> */}
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="number" className="form-label">Reciever</label>
                                    <select className="form-select" value={reciever} onChange={(e)=>setReciever(e.target.value)}>
                                    <option value="">Select Token</option>
                                        {tokens.map(token => (
                                        <option key={token} value={token} disabled={token === sender}>
                                            {token}
                                        </option>
                                        ))}
                                    </select>
                                    {/* <input type="text" className="form-control" value={reciever} id="number" onChange={(e)=>setReciever(e.target.value)}/> */}
                                </div>
                            </div>
                        </div>
                    </div>

                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Token to donate</label>
                            <input type="number" className="form-control" value={amount} id="number" onChange={(e)=>setAmount(e.target.value)}/>
                        </div>
                        <button  className="btn btn-primary" onClick={swaptoken}>Swap tokens</button>
                    {/* </>
                :
                ""
                } */}
            </>  
                :
                <>

                <button  className="btn btn-primary" onClick={submit}>Connect wallet</button>
                <h1>Wallet not connected</h1>
                </>  
                
            }
        </>
    )

}
export default Token;