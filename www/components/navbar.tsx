'use client'
import { useContext } from "react";
import { Button } from "./ui/button";
import { ChainContext } from "@/context/chain-context";

export default function Navbar() {
    const { connectWallet, address } = useContext(ChainContext);
  return (
    <>
      {/* Navbar container with flex to ensure content is spaced between the logo and button */}
      <div className='flex justify-between items-center px-4 py-2'>
        {/* Logo on the left */}
        <div className='flex-shrink-0'>
          <a href='#'>
            <img
              alt='Your Company'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              className='h-8 w-auto'
            />
          </a>
        </div>

        {/* New Project button aligned to the right */}
        <div className='ml-auto'>
          {' '}
          {/* ml-auto pushes the button to the right */}
          {!address && (
            <Button
              onClick={connectWallet}
              className='bg-white text-gray-900 py-3 px-6 shadow-lg mt-8'
            >
              Connect to Wallet
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
