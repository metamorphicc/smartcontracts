// debug-contract.js
import { readFileSync } from 'fs';
import path from 'path';

const contractPath = path.join(__dirname, '../artifacts/contracts/Demo.sol/Demo.json');
console.log('Существует ли файл?', readFileSync(contractPath, 'utf8') ? 'Да' : 'Нет');

const contractData = JSON.parse(readFileSync(contractPath, 'utf8'));
console.log('Есть ли ABI?', contractData.abi ? 'Да' : 'Нет');
console.log('Есть ли bytecode?', contractData.bytecode ? 'Да' : 'Нет');
console.log('ABI тип:', typeof contractData.abi);
console.log('Bytecode тип:', typeof contractData.bytecode);
console.log('Первый элемент ABI:', contractData.abi[0]);