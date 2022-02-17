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

const CRYPTOCURRENCY_BY_CID = gql`
  query ($cid: String) {
    cryptocurrency(query: { id: $cid }) {
      block_time_in_minutes
      community_score
      country_origin
      createdAt
      description {
        en
        ja
        vi
        zh
        zhTw
      }
      developer_score
      hashing_algorithm
      id
      image {
        large
        small
        thumb
      }
      last_updated
      liquidity_score
      market_cap_rank
      name
      symbol
      market_data {
        current_price {
          usd
        }
        fully_diluted_valuation {
          usd
        }
        circulating_supply
        fdv_to_tvl_ratio
        last_updated
        market_cap_change_24h
        market_cap_change_percentage_24h
        market_cap_rank
        max_supply
        mcap_to_tvl_ratio
        price_change_24h
        price_change_percentage_14d
        price_change_percentage_1y
        price_change_percentage_200d
        price_change_percentage_24h
        price_change_percentage_30d
        price_change_percentage_60d
        price_change_percentage_7d
        total_supply
      }
    }
  }
`;

export { CRYPTOCURRENCY, CRYPTOCURRENCY_BY_CID };
