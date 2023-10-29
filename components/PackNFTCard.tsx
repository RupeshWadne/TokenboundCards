import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../const/constants";
import { MediaRenderer, Web3Button, useAddress, useContract, useDirectListings, useNFT } from "@thirdweb-dev/react";



export const PackNFTCard = ({ contractAddress, tokenId }) => {
    const address = useAddress();
console.log(address)
    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
    const { contract: packContract } = useContract(contractAddress);
    const { data: packNFT, isLoading: loadingNFT } = useNFT(packContract, tokenId);
    console.log(packNFT)


    const { data: packListings, isLoading: loadingPackListings } = 
    useDirectListings(
        marketplace
    );
    console.log("Pack Listings: ", packListings);

    async function buyPack() {
        let txResult;

        if (packListings?.[tokenId]) {
            txResult = await marketplace?.directListings.buyFromListing(
                packListings[tokenId].id,
                1
            )
        } else {
            throw new Error("No valid listing found");
        }
            
        return txResult;
    };

    return (
        <div >
            {!loadingNFT && !loadingPackListings ? (
                <div >
                    <div>
                        <MediaRenderer
                            src={packNFT?.metadata?.image}
                            width="80%"
                            height="100%"
                        />
                    </div>
                    <div >
                        <h3>{packNFT?.metadata.name}</h3>
                        
                        <p>Cost: {packListings![tokenId].currencyValuePerToken.displayValue} {` ` + packListings![tokenId].currencyValuePerToken.symbol}</p>
                        <p>Supply: {packListings![tokenId].quantity}</p>
                        {!address ? (
                            <p>Login to buy</p>
                        ) : (
                            <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={() => buyPack()}
                            >Buy Pack</Web3Button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
};