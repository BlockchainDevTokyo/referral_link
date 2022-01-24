import Big from 'big.js';
import * as nearAPI from 'near-api-js';
import { utils } from 'near-api-js';

import { getConfig } from './NearConfig';

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

// Initializing contract
export async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV);

  // const keystore = new nearAPI.keyStores.InMemoryKeyStore();
  // const keyPair = nearAPI.KeyPair.fromString(
  //   process.env.NEXT_PUBLIC_SEND_PRIVATE_KEY || ''
  // );
  // keystore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair);

  // // Initializing connection to the NEAR TestNet
  // const near = await nearAPI.connect({
  //   keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  //   ...nearConfig,
  //   headers: {},
  // });

  const keystore = new nearAPI.keyStores.InMemoryKeyStore();
  const keyPair = nearAPI.KeyPair.fromString(
    process.env.NEXT_PUBLIC_SEND_PRIVATE_KEY || ''
  );
  keystore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair);
  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    // keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    keyStore: keystore,
    ...nearConfig,
    headers: {},
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near, null);

  const masterAccount = await new nearAPI.Account(
    near.connection,
    nearConfig.contractName
  );

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
    // currentUser = walletConnection.getAccountId();
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = new nearAPI.Contract(
    masterAccount,
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['get_link'],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ['click_link'],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      // sender: walletConnection.getAccountId(),
    }
  );

  return { contract, currentUser, nearConfig, walletConnection };
}

export function signOut(wallet: any) {
  wallet.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
}

export function signIn(wallet: any, nearConfig: any) {
  wallet.requestSignIn(nearConfig.contractName, 'Coinmarketfi Dapp');
}

export async function referLink(
  contract: any,
  currentUser: any,
  link: any,
  amount: any
) {
  await contract.click_link(
    {
      url: link,
      account_id: currentUser.accountId,
    },
    BOATLOAD_OF_GAS,
    utils.format.parseNearAmount(amount.toString())
  );
}

export async function getBalance(wallet: any) {
  const balance = (await wallet.account().state()).amount;
  return utils.format.formatNearAmount(balance);
}
