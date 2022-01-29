import Link from 'next/link';

// import { i18 } from '../utils/I18';

export default function Nav() {
  return (
    <ul className="flex flex-wrap text-xl">
      <li className="mr-6">
        <Link href="/">
          <a className="text-gray-700 border-none hover:text-gray-900">
            {/* {i18('home', 'Home')} */}
            {'Home'}
          </a>
        </Link>
      </li>
      <li className="mr-6">
        <a
          className="text-gray-700 border-none hover:text-gray-900"
          href="/cryptocurrencies/"
        >
          {'Cryptocurrencies'}
          {/* {i18('cryptocurrencies', 'Cryptocurrencies')} */}
        </a>
      </li>
      <li className="mr-6">
        <div className="dropdown relative">
          <Link href="/exchanges/">
            <a className="text-gray-700 hover:text-gray-900">
              {'Exchanges'}
              {/* {i18('exchanges', 'Exchanges')} */}
            </a>
          </Link>
          <div className="dropdown-content w-max bg-gray-100 rounded-md shadow-xl">
            <Link href="/dex/">
              <a className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 hover:border-none">
                {'DEX'}
                {/* {i18('dex', 'DEX')} */}
              </a>
            </Link>
            <Link href="/cex/">
              <a className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 hover:border-none">
                {'CEX'}
                {/* {i18('cex', 'CEX')} */}
              </a>
            </Link>
            <Link href="/where-to-buy/">
              <a className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 hover:border-none">
                {'Where to buy'}
                {/* {i18('where-to-buy', 'Where to buy')} */}
              </a>
            </Link>
          </div>
        </div>
      </li>
    </ul>
  );
}
