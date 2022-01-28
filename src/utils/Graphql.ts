import fetch from 'node-fetch';

// function buildQuery(obj: any) {
//   if (typeof obj === 'string') {
//     return obj;
//   }
//   // TODO: build query from object
//   return '';
// }

export function graphql(sql: any, args: any) {
  const requestInfo: string = process.env.GRAPHQL_URL || 'localhost:3000';
  const apiKey = process.env.GRAPHQL_API_KEY || '';
  return fetch(requestInfo, {
    method: 'POST',
    body: JSON.stringify({ query: sql, variables: args }),
    headers: {
      apiKey,
    },
  });
}
