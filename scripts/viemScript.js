import dotenv from 'dotenv';
import { createPublicClient, http, formatEther, createWalletClient, parseEther, hexToBigInt } from 'viem';
import { arbitrum, mainnet, ronin, sepolia, hardhat } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import artifact from "../artifacts/contracts/Counter.sol/Counter.json" 
import hre from 'hardhat';
import { getContract } from 'viem';


const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")

dotenv.config();

console.log("PRIVATEKEY:", process.env.PRIVATEKEY);

const client = createPublicClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545/")
  })

  const walletClient = createWalletClient({
    account,
    chain: hardhat,
    transport: http("http://127.0.0.1:8545/")
  })


async function main() {

  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode,
    args: [process.env.OWNER]
  }) 

  const waitfor = await client.waitForTransactionReceipt({hash: hash})
  const address = waitfor.contractAddress
  console.log(waitfor.contractAddress)
  console.log(`compiling and deploy is success`)

  const hashProxy = getContract({
     address: address,
     abi: artifact.abi,
     client: walletClient
  });

  const owner = await hashProxy.read.owner();
  console.log("owner:", owner);

  const price = await hashProxy.read.defaultPrice();
  console.log("price (wei):", price.toString());
  console.log("price (ETH):", Number(price) / 1e18);

  const showAddress = await hashProxy.write.showAddress(["artem"]);
  const hash2 = client.waitForTransactionReceipt({hash: showAddress});
  console.log(`address: ${hash2}`);
  
}


main()
    .then(() => process.exit(0)) 
    .catch((error) => {
        console.log(error);
    }); 