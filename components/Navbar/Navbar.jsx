import {
    ThirdwebSDKProvider,
    useAddress,
    useBalance,
    Web3Button,
  } from "@thirdweb-dev/react";
import styles from "./Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { activeChain, TWApiKey } from "../../const/constants"
import SmartWalletConnected from "../SmartWallet/SmartWalletConnected";



const Navbar = ({ signer }) => {
    return (
      <ThirdwebSDKProvider
        signer={signer}
        activeChain={activeChain}
        clientId={TWApiKey}
      >
        <NavContainer signer={signer} />
      </ThirdwebSDKProvider>
    );
  };


 function NavContainer({signer}) {
    const address = useAddress();

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href="/">
                    <p>Gods</p>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/shop">
                        <p>Shop</p>
                    </Link>
                    
                </div>
                <div>
                    {address}
                </div>
                
            </div>
            {address ? (
                <>
                <SmartWalletConnected signer={signer} />
                
                </>
              ) : (
                <div className={styles.btnContainer}>
                  <p>Loading...</p>
                </div>
              )}
        </div>
    )
}

export default Navbar;