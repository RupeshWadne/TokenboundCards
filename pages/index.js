
import styles from "../styles/Home.module.css";
import NFTGrid from "../components/NFT/NFTGrid";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NFTDROP_ADDRESS } from "../const/constants";

/**
 * The home page of the application.
 */
const Home = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(NFTDROP_ADDRESS, "nft-drop");
  const { data: nfts, isLoading } = useOwnedNFTs(nftDropContract, address);

  return (
    <>
      {address ? (
        <div className={styles.container}>
          <h1>Your NFTs</h1>
          <p>
            Browse the NFTs inside your personal wallet, select one to connect a
            token bound smart wallet & view it&apos;s balance.
          </p>
          <NFTGrid
            nfts={nfts}
            isLoading={isLoading}
            emptyText={
              "Looks like you don't own any NFTs. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
            }
          />
          <div className={styles.btnContainer}>
            <Web3Button
              contractAddress={NFTDROP_ADDRESS}
              action={async (contract) => await contract?.erc721.claim(1)}
              onSuccess={() => {
                toast("NFT Claimed!", {
                  icon: "✅",
                  style: toastStyle,
                  position: "bottom-center",
                });
              }}
              onError={(e) => {
                console.log(e);
                toast(`NFT Claim Failed! Reason: ${e.message}`, {
                  icon: "❌",
                  style: toastStyle,
                  position: "bottom-center",
                });
              }}
            >
              Claim NFT
            </Web3Button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h2>Connect a personal wallet to view your owned NFTs</h2>
          <ConnectWallet />
        </div>
      )}
      </>
  );
};

export default Home;