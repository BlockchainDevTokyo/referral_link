import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import {
  initContract,
  signIn,
  signOut,
  referLink,
  getBalance,
} from '../utils/NearAPI';

const About = () => {
  const [contract, setContract] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [nearConfig, setNearConfig] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await initContract();
      setContract(data.contract);
      setCurrentUser(data.currentUser);
      setNearConfig(data.nearConfig);
      setWallet(data.walletConnection);
      if (data.currentUser) {
        const b = await getBalance(data.walletConnection);
        setBalance(b);
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    fetchData();
  }, []);
  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <p>
        {currentUser ? (
          <p>
            Currently signed in as:{' '}
            <code>
              {currentUser.accountId} ({balance}){' '}
            </code>
          </p>
        ) : (
          <p>Please login to continue.</p>
        )}
      </p>
      {currentUser ? (
        <button onClick={() => signOut(wallet)}>Log out</button>
      ) : (
        <button onClick={() => signIn(wallet, nearConfig)}>Log in</button>
      )}
      <p>
        {currentUser ? (
          <button
            onClick={async () => {
              setDisabled(true);
              await referLink(contract, currentUser, 'test.net', 1);
              const b = await getBalance(wallet);
              setBalance(b);

              setDisabled(false);
            }}
            disabled={disabled}
          >
            Refer Link
          </button>
        ) : (
          <p>Please login to continue.</p>
        )}
      </p>
    </Main>
  );
};

export default About;
