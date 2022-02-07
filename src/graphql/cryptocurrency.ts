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
      description {
        en
        ja
        vi
      }
      hashing_algorithm
      block_time_in_minutes
      market_data {
        current_price {
          usd
        }
        market_cap {
          usd
        }
        price_change_percentage_24h
        price_change_percentage_7d
        total_supply
        max_supply
        circulating_supply
        total_volume {
          usd
        }
      }
    }
  }
`;

export { CRYPTOCURRENCY };
