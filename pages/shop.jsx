import { useContract, useDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../const/constants";
import styles from "../styles/Home.module.css";
import { PackNFTCard } from "../components/PackNFTCard";

export default function Shop() {
    const {
        contract: marketplace,
        isLoading: loadingMarketplace,
    } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const {
        data: directListings,
        isLoading: loadingDirectListings,
    } = useDirectListings(
        marketplace
    );
    console.log("DirectPack", directListings);

    return (
        <div className={styles.container}>
            <h1>Shop Packs</h1>
            <div className={styles.grid}>
                {!loadingDirectListings ? (
                    directListings?.map((listing, index) => (
                        <div key={index}>
                            <PackNFTCard
                                contractAddress={listing.assetContractAddress}
                                tokenId={listing.tokenId}
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
};