import { gql } from '@apollo/client';

const EXCHANGES = gql`
  query ($sortBy: ExchangeSortByInput) {
    exchanges(sortBy: $sortBy) {
      id
      name
      trade_volume_24h_btc_normalized
      centralized
      country
      image
      url
    }
  }
`;

export { EXCHANGES };
