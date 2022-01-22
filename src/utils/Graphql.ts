import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

function buildQuery(obj: any) {
  if (typeof obj === 'string') {
    return obj;
  }
  // TODO: build query from object
  return '';
}

export function graphql(obj: any) {
  const requestInfo: string = process.env.GRAPHQL_URL || 'localhost:3000';
  const apiKey = process.env.GRAPHQL_API_KEY || '';
  return fetch(requestInfo, {
    method: 'POST',
    body: JSON.stringify({ query: buildQuery(obj) }),
    headers: {
      apiKey,
    },
  });
}
