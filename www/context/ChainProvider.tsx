'use client'

import React from 'react'
import { ChainContext } from './chain-context'
import {ethers} from 'ethers'


const ChainProvider = ({children}) => {
    const [signer, setSigner] = React.useState(null);
    const [provider, setProvider] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [chainId, setChainId] = React.useState(8545);

    const connectWallet = async () => {
        console.log("Connect Wallet");
        if(typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const chainId = (await provider.getNetwork()).chainId;
            setSigner(signer);
            setProvider(provider);
            setAddress(address);
            setChainId(chainId);
        }    
    }
    const value ={
        signer,
        provider,
        address,
        chainId,
        connectWallet
    }

  return (
    <ChainContext.Provider value={value}>
        {children}
    </ChainContext.Provider>
  )
}

export default ChainProvider