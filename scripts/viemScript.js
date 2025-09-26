// scripts/read-balance.ts
import { createPublicClient, http, formatEther, createWalletClient, parseEther } from 'viem';
import { arbitrum, mainnet, ronin, sepolia, hardhat } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import abi from "../abis/abi.json"

const transport = http("http://127.0.0.1:8545/")
const accountPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"

const privateKey = privateKeyToAccount(accountPrivateKey)



async function main() {
    const client = createPublicClient({
      chain: hardhat,
      transport
    })

    const clientWallet = createWalletClient({
      account: privateKey,
      chain: hardhat,
      transport
    })

    // const owner = await client.readContract({
    //   address: contractAddress,
    //   abi,
    //   functionName: "owner"
    // })

    // const showPrice = await client.readContract({
    //   address: contractAddress,
    //   abi,
    //   functionName: "defaultPrice"
    // }) 
    // await console.log(`Default price now: ${showPrice}`);
    

    // const setPrice = await clientWallet.writeContract({
    //   address: contractAddress,
    //   abi,
    //   functionName: "setterPrice",
    //   args: [parseEther("0.08")]
    // })

    // const result = await client.waitForTransactionReceipt({hash: setPrice})
    // console.log(`current status: `, result.status);
    // console.log(`Owner name: ${owner}, default price of buying domen number: ${formatEther(showPrice)}`);
    const showPrice = await client.readContract({
      address: contractAddress,
      abi,
      functionName: "defaultPrice"
    });
    
    console.log(`Старая цена: ${formatEther(showPrice)} ETH`);
    
    const txHash = await clientWallet.writeContract({
      address: contractAddress,
      abi,
      functionName: "setterPrice",
      args: [parseEther("0.005")]
    });
    
    console.log("Транзакция отправлена:", txHash);
    
    const receipt = await client.waitForTransactionReceipt({ hash: txHash });
    console.log("Статус транзакции:", receipt.status);
    
    const newPrice = await client.readContract({
      address: contractAddress,
      abi,
      functionName: "defaultPrice"
    });
    
    console.log(`Новая цена: ${formatEther(newPrice)} ETH`); 

}


main()
    .then(() => process.exit(0)) 
    .catch((error) => {
        console.log(error);
    }); 