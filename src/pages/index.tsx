import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="CoinMarketFi" description="s" />}>
      <h1 className="font-bold text-2xl">Crypto All in one</h1>
      <p>
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        We want to make it easier for you to buy cryptocurrency — including
        Bitcoin and Ethereum — no matter where you live in the world! Learn from
        us as we walk you through some of the topics that beginners will need to
        understand to get started.
        <span role="img" aria-label="zap">
          ⚡️
        </span>{' '}
      </p>
      <h2 className="font-semibold text-lg">CoinMarketFi Features</h2>
      <ul>
        <li>
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          Keep track of{' '}
          <a href="https://coinmarketfi.com" rel="nofollow">
            Cryptocurrencies
          </a>{' '}
        </li>
        <li>
          <span role="img" aria-label="art">
            🎨
          </span>{' '}
          Keep track of{' '}
          <a href="https://coinmarketfi.com" rel="nofollow">
            Exchanges
          </a>
        </li>
      </ul>
      <h2 className="font-semibold text-lg">Our Philosophy</h2>
      <ul>
        <li>Valuable information to users</li>
      </ul>
    </Main>
  );
};

export default Index;
