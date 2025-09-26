// scripts/read-balance.ts
import { createPublicClient, http, formatEther } from 'viem';
import { arbitrum, mainnet, ronin } from 'viem/chains';
import { config } from 'dotenv';
import '../abi.js';
import abi from "../abis/abi.json"

const client = createPublicClient({
  chain: arbitrum,
  transport: http("https://arb-mainnet.g.alchemy.com/v2/FibUNQuBmHPDB5RMhl6z5") 
  
});


async function main() {

  const balance = await client.getBalance({
    address: '0x3003760202C0367c60391c12CF7045eD4Ec617Fd' 
  });
  const something = await client.getChainId()
  console.log(`Баланс: ${formatEther(balance)} RONIN`, `chainId: ${something}`);
  
}

main()
    .then(() => process.exit(0)) 
    .catch((error) => {
        console.log(error);
    }); 