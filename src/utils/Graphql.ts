import fetch from 'node-fetch'

function buildQuery(obj: any) {
  if (typeof obj === 'string') {
    return obj;
  }
  // TODO: build query from object
  return '';
}

export function graphql(obj: any) {
  return fetch(process.env.GRAPHQL_URL, {
      method: 'POST',
      body: JSON.stringify({ query: buildQuery(obj) }),
      headers: {
        apiKey: process.env.GRAPHQL_API_KEY
      }
    }
  );
}
