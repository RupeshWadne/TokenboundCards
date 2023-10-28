import {
    ThirdwebSDKProvider,
    useAddress,
    useBalance,
    Web3Button,
  } from "@thirdweb-dev/react";
  import React from "react";
  import { activeChain, tokenAddress, TWApiKey } from "../../const/constants";
  import style from "../../styles/Token.module.css";
 
  
  // ThirdwebSDKProvider is a wrapper component that provides the smart wallet signer and active chain to the Thirdweb SDK.
  const SmartWalletConnected = ({ signer }) => {
    return (
      <ThirdwebSDKProvider
        signer={signer}
        activeChain={activeChain}
        clientId={TWApiKey}
      >
        <ShowAccount />
      </ThirdwebSDKProvider>
    );
  };
  
  // This is the main component that shows the user's token bound smart wallet.
  const ShowAccount = () => {
    const address = useAddress();
    const { data: tokenBalance, isLoading: loadingBalance } =
      useBalance(tokenAddress);
  
    return (
      <div className={style.walletContainer}>
        <h2>This is Your Token Bound Smart Wallet!</h2>
        <p>{address}</p>
        {address ? (
          loadingBalance ? (
            <h2>Loading Balance...</h2>
          ) : (
            <div className={style.pricingContainer}>
              <h2>Balance: {tokenBalance?.displayValue}</h2>
              
            </div>
          )
        ) : null}
      </div>
    );
  };
  
  export default SmartWalletConnected;