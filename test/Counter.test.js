import dotenv from 'dotenv';
import { hardhat } from 'viem/chains';
import { createPublicClient, http, formatEther, createWalletClient, parseEther, walletActions } from 'viem';
import { expect } from 'chai';
import { deployContract } from 'viem/zksync';
import artifacts from '../artifacts/contracts/Counter.sol/Counter.json';
import { privateKeyToAccount } from 'viem/accounts';
dotenv.config({path: ".env"})

describe("Counter", function() {
    let client;
    let deployed;
    async function deploy(){
        client = createPublicClient({
            chain: hardhat,
            transport: http(process.env.TRANSPORT) 
        })
        const clientWallet = createWalletClient({
            account: privateKeyToAccount(process.env.PRIVATEKEY),
            chain: hardhat,
            transport: http(process.env.TRANSPORT) 
        })

        deployed = await deployContract(clientWallet, {
            abi: artifacts.abi,
            bytecode: artifacts.bytecode,
            args: [process.env.OWNER]
        })
        console.log("Контракт задеплоен по адресу:", deployed.address);
        return { deployed }

    }        
    it("should owner", async function() {
        await deploy();

        const value = await client.readContract({
            address: deployed.address,
            abi: artifacts.abi,
            functionName: "defaultPrice"
        });

        expect(value).to.equal(parseEther("0.001"));

        console.log(value)
    })

})