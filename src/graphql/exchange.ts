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

const EXCHANGE_BY_EID = gql`
  query ($eid: String) {
    exchange(query: { id: $eid }) {
      id
      name
      image
      slack_url
      other_url_1
      other_url_2
      reddit_url
      description
      country
      facebook_url
      trade_volume_24h_btc
      trade_volume_24h_btc_normalized
      url
      year_established
      trust_score
      trust_score_rank
      tickers {
        base
        bid_ask_spread_percentage
        coin_id
        is_anomaly
        is_stale
        last
        last_fetch_at
        last_traded_at
        target
        target_coin_id
        timestamp
        token_info_url
        trade_url
        trust_score
        volume
      }
    }
  }
`;

export { EXCHANGES, EXCHANGE_BY_EID };
