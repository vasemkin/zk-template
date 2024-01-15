# EVM zk-dApps Template

## Overview

This project is a zk-dApps template designed for use with Hardhat, an Ethereum development environment. It provides a starting point for building decentralized applications (dApps) with a focus on zero-knowledge proofs (zk-proofs).

## Features

- Smart contract development in Solidity
- Integration with Hardhat for Ethereum development
- Support for zk-proofs using Circom
- TypeScript and Shell scripts for seamless dApp development

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/vasemkin/zk-template.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. The pnpm installation should triger the preparation script. If this did not happen, run:
   ```bash
   pnpm prepare
   ```
4. Check that it works:
   ```bash
   pnpm test
   ```

## Usage

Write your circuits in `circuits/` folder and modify the `src/zk.ts` utilties according to your public signals.

## Acknowledgements

Utility functions are adapted from [tornado](https://github.com/tornadocash/tornado-core) and [zk-merkle-tree](https://github.com/TheBojda/zk-merkle-tree) repositories.
