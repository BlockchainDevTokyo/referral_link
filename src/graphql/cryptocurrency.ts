import { gql } from '@apollo/client';

const CRYPTOCURRENCY = gql`
  query ($sortBy: CryptocurrencySortByInput) {
    cryptocurrencies(sortBy: $sortBy) {
      id
      name
      symbol
      market_cap_rank
      image {
        thumb
      }
      market_data {
        current_price {
          usd
        }
      }
    }
  }
`;

export { CRYPTOCURRENCY };
