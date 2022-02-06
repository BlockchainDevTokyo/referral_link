import { gql } from '@apollo/client';

const CRYPTOCURRENCY = gql`
  query ($sortBy: CryptocurrencySortByInput) {
    cryptocurrencies(sortBy: $sortBy) {
      id
      name
    }
  }
`;

export { CRYPTOCURRENCY };
