import { ThirdwebSDK } from "@thirdweb-dev/sdk"

import dotenv from "dotenv";
dotenv.config();

(async () => {
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai", {
        clientId: "YOUR_CLIENT_ID", // Use client id if using on the client side, get it from dashboard settings
        secretKey: "YOUR_SECRET_KEY", // Use secret key if using on the server, get it from dashboard settings
    });

    const packAddress = "0xF27E16Cca993cB2cD7F3eF52154d83e3393F5D7f";
    const cardAddress = "0x240A03E1f172e3737c41130Cc16c26B302966472";

    const pack = sdk.getContract(packAddress, "pack");

    const card = sdk.getContract(cardAddress, "edition");
    await (await card).setApprovalForAll(packAddress, true);
    console.log("Approved card contract to transfer cards to pack contract");

    const packImage = "ipfs://Qmez8XSMArn9GBtMmVRaJPvuKZfoeBpDnXWCJEr5g3aM11/trio.jpg";

    console.log("Creating pack");
    const createPacks = (await pack).create({
        packMetadata: {
            name: "Pack 1",
            description: "A new card pack",
            image: packImage,
        },
        erc1155Rewards: [
            {
                contractAddress: cardAddress,
                tokenId: 1,
                quantityPerReward: 1,
                totalRewards: 25,
            },
            {
                contractAddress: cardAddress,
                tokenId: 2,
                quantityPerReward: 1,
                totalRewards: 20,
            },
            {
                contractAddress: cardAddress,
                tokenId: 3,
                quantityPerReward: 1,
                totalRewards: 5,
            },
            {
                contractAddress: cardAddress,
                tokenId: 4,
                quantityPerReward: 1,
                totalRewards: 25,
            },
            {
                contractAddress: cardAddress,
                tokenId: 5,
                quantityPerReward: 1,
                totalRewards: 20,
            },
        ],
        rewardsPerPack: 1,
    });

    console.log("Packs created");
})();