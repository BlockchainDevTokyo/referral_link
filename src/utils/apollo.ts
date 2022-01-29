import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import consola from 'consola';

let accessToken: string;

// TODO: fixed multiple load request issue
// TODO: refactoring

// Create customFetch function for handling re-authorization
// This customFetch (or any fetch you pass to the link) gets uri and options as arguments. We'll use those when we actually execute a fetch.
const customFetch = async (
  uri: RequestInfo,
  options: RequestInit | undefined
) => {
  // The apolloHttpLink expects that whatever fetch function is used, it returns a promise.
  // Here we return the initialRequest promise
  const response = await fetch(uri, options);
  const json = await response.json();
  // We should now have the JSON from the response of initialRequest
  // We check that we do and look for errors from the GraphQL server
  // If it has the error 'User is not logged in' (that's our implementation of a 401) we execute the next steps in the re-auth flow
  if (json && json.error && response.status === 401) {
    // Grab the refresh token from the store
    const refreshToken = process.env.NEXT_PUBLIC_GRAPHQL_REFRESH_TOKEN;
    // Grab the client_id from our config
    // const client_id = Config.REACT_APP_CLIENT_ID;
    // Create the address to grab a new token from
    // This endpoint may vary based on your Oauth server
    const refreshAccessToken =
      'https://realm.mongodb.com/api/client/v2.0/auth/session';

    // Execute the re-authorization request and set the promise returned to this.refreshingPromise
    const refreshTokenResponse = await fetch(refreshAccessToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    // consola.log(refreshTokenResponse);
    if (refreshTokenResponse.ok) {
      const data = await refreshTokenResponse.json();
      accessToken = data.access_token;
      // consola.log(`reset access-token ${data.access_token}`);
    }
    // If the re-authorization request fails, handle it here
    // You can log user out, or display some sort of session has ended alert
    // logUserOut()
    // }
    // Set the authorization header on the original options parameter to the new access token we got
    const newOptions = options as RequestInit;
    // NOTE: header is overriden
    newOptions.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    return fetch(uri, newOptions);
  }

  // If there were no errors in the initialRequest, we need to repackage the promise and return it as the final result.
  const result: any = {};
  result.ok = true;
  result.json = () =>
    new Promise((resolve) => {
      resolve(json);
    });
  return result;
};

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/v1/graphql',
  fetch: customFetch,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      consola.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) consola.info(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
  },
});
