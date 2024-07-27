import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect, useRef } from 'react';

const Swap = (props) => {

    // const swaptokens=async()=>{
    //     const wallet =await connectwallet();
    //     const contractIns =await connectContract();
    //     try{
    //       const amountInEther = "3"; // The Ether amount you want to convert
      
    //       let provider = new ethers.providers.Web3Provider(window.ethereum);
    //       const signer = provider.getSigner();
    //       let nestle_contract = new ethers.Contract(nestle_contractAddress, nestle_abi, signer);
    //       const amountToApprove = ethers.utils.parseEther('2'); // 1 token in wei (adjust as needed)
      
    //       let approveToken=await nestle_contract.approve(contAddress,amountToApprove)
    //       const approveReceipt = await approveToken.wait();
    //       console.log('approveToken',approveToken);
    //       console.log('approveReceipt',approveReceipt);
      
    //       let check_allownce=await nestle_contract.allowance(wallet,contAddress)
    //       const allowanceInEther =await ethers.utils.formatEther(check_allownce);
    //       console.log('check_allownce',Number(check_allownce));
    //       console.log('allowanceInEther',allowanceInEther);
      
    //       const balance = await nestle_contract.balanceOf(wallet);
    //       console.log("Balance is: ", ethers.utils.formatEther(balance));
      
    //       let transferFrom=await contractIns.transfertoken(nestle_contractAddress,mcd_contractAddress,'2')
    //       const txtfrom = await transferFrom.wait();
    //       console.log('txtfrom',txtfrom);
          
          
    //     }
    //     catch(e){
    //       console.log('error',e);
    //     }
    //   }
    const [token,setToken]=useState("")
    const [mcdswap, setMcdswap] = useState(false);
    const [nstswap, setNstswap] = useState(false);
    const submit = (e)=>{

        e.preventDefault();
        console.log(token);
        if(!token){
            alert("Title or Description cannot be blank");
        }
        else{
            mcdswap && props.swapmcdtokens(token);
            nstswap && props.swapnsttokens(token);

        }
    }


    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <button onClick={() => {setMcdswap(true); setNstswap(false);}}>Swap Mcdonald</button>
                </div>
                <div className="col-lg-6 col-md-12">
                    <button onClick={() => { setNstswap(true); setMcdswap(false); }}>Swap Nestle</button>

                </div>
            </div>

{mcdswap || nstswap ? 
<>

            <div className="mb-3">
                <label htmlFor="number" className="form-label">Token to donate</label>
                <input type="number" className="form-control" value={token} id="number" onChange={(e)=>setToken(e.target.value)}/>
            </div>
    
        <button  className="btn btn-primary" onClick={submit}>Swap {mcdswap? 'Mcdonald'  : 'nestle'} tokens</button>
        
        {/* <button  className="btn btn-primary" onClick={submit}>Swap nestle tokens</button> */}
    
</>
    :""   
}
           
        </>
    );
  };
  
  export default Swap;