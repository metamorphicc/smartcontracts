// scripts/deploy.js
const { ethers } = require("hardhat")

async function main() {
  // Получаем контракт для деплоя
  const Counter = await ethers.getContractFactory("Counter");

  // Деплоим его
  const counter = await Counter.deploy();

  // Ждем, пока он действительно будет задеплоен в сеть
  await counter.waitForDeployment();

  // Получаем адрес задеплоенного контракта
  const contractAddress = await counter.getAddress();
  console.log("Контракт задеплоен по адресу:", contractAddress);
}

// Обработка ошибок
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});