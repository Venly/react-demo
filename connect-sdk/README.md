# React Demo - ConnectSDK

An example React app using Venly's [ConnectSDK](https://www.npmjs.com/package/@venly/connect).

## Getting started

1. Register an account by following Venly's [quickstart guide](https://docs.venly.io/docs/getting-started-with-venly)

2. Follow the [authentication guide](https://docs.venly.io/docs/widget-authentication) to obtain your Client ID and setup your redirect URLs

3. Setup your environment variables in `.env.local`
- `VITE_CLIENT_ID` - your Widget Client ID
- `VITE_ENV` - environment can be either `production` or `sandbox` (defaults to `production`).

4. Run `npm install` and `npm run dev` to start local development

## Guide

#### Initialization

- Initialize `VenlyConnect` instance - [venlyConnect.ts](src/libs/venlyConnect.ts)

#### Authentication

- Check authentication on app load - [App.tsx](src/App.tsx)
- Login flow - [Login.tsx](src/pages/Login.tsx)

#### Wallets

- Get wallets - [useWallets.ts](src/hooks/useWallets.ts)
- Connect/add wallets - [WalletsTable.tsx](src/components/WalletsTable.tsx)
- Import wallets between EVM chains - [ImportWalletModal.tsx](src/modals/ImportWalletModal.tsx)
- Transfer native tokens - [SendTransactionModal.tsx](src/modals/SendTransactionModal.tsx)
- Sign message - [SignMessageModal.tsx](src/modals/SignMessageModal.tsx)
- Sign EIP712 message - [SignEip712Modal.tsx](src/modals/SignEip712Modal.tsx)
- Execute contract call - [ExecuteContractModal.tsx](src/modals/ExecuteContractModal.tsx)

#### Tokens

- Get tokens - [useTokens.ts](src/hooks/useTokens.ts)
- Transfer tokens - [TransferTokenModal.tsx](src/modals/TransferTokenModal.tsx)

#### NFTs

- Get NFTs - [useNfts.ts](src/hooks/useNfts.ts)
- Transfer NFTs - [TransferNftModal.tsx](src/modals/TransferNftModal.tsx)
