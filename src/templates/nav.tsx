// import { i18 } from '../utils/I18';
import { Fragment, useEffect, useState } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { disconnect, connect, init } from '../redux/actions/nearAccountActions';
import 'regenerator-runtime/runtime';
import { getBalance, initContract, signIn } from '../utils/NearAPI';

// import { initContract, signIn, signOut } from '../utils/NearAPI';

const navigation = [
  { name: 'Cryptocurrencies', href: '/cryptocurrencies' },
  { name: 'Exchanges', href: '/exchanges' },
  { name: 'Marketplace', href: '/where-to-buy' },
  { name: 'About', href: '/about' },
];

export default function Nav() {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [nearConfig, setNearConfig] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      const data = await initContract();
      dispatch(init(data.contract));
      // setContract(data.contract);
      setCurrentUser(data.currentUser);
      dispatch(connect(data.currentUser));
      setNearConfig(data.nearConfig);
      setWallet(data.walletConnection);
      if (data.currentUser) {
        const b = await getBalance(data.walletConnection);
        setBalance(b);
      }
    }
    fetchData();
  }, []);
  return (
    <Popover>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <img
                    alt="cmf-logo"
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  />
                </a>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            {currentUser && `${currentUser.accountId}: ${balance}`}
          </div>
          <div
            id="connect-wallet"
            className="font-medium text-indigo-600 hover:text-indigo-500 text-left"
          >
            {currentUser ? (
              <button onClick={() => dispatch(disconnect(wallet))}>
                Disconnect
              </button>
            ) : (
              <button onClick={() => signIn(wallet, nearConfig)}>
                Connect Wallet
              </button>
            )}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="#"
              className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
            >
              Log in
            </a>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
