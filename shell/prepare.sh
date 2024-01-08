#!/usr/bin/env bash

mkdir -p build
mkdir -p dist
wget -nc https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_15.ptau -P ./build

circom circuits/Verifier.circom --r1cs -o ./dist
circom circuits/Verifier.circom --wasm -o ./build

npx snarkjs groth16 setup dist/Verifier.r1cs build/powersOfTau28_hez_final_15.ptau build/Verifier.zkey
npx snarkjs zkey export verificationkey build/Verifier.zkey build/Verifier_vkey.json
npx snarkjs zkey export solidityverifier build/Verifier.zkey contracts/Verifier.sol

sed -i -e 's/pragma solidity \>=0.7.0 <0.9.0/pragma solidity 0.8.17/g' contracts/Verifier.sol

npx wasm2js build/Verifier_js/Verifier.wasm -o src/Verifier.js