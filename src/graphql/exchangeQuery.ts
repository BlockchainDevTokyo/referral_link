import { gql } from '@apollo/client';

const EXCHANGES = gql`
  query exchanges {
    exchanges {
      name
      id
      country
      image
      url
    }
  }
`;

export { EXCHANGES };
