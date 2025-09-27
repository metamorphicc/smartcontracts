import { createPublicClient, http, formatEther, createWalletClient, parseEther } from 'viem';
import { expect } from 'chai';
import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

describe("Counter", function() {
    async function deploy(){

    }

    it("should register", async function() {
        loadFixture(deploy)

    })

})