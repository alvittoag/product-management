import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://humble-elk-44.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "QnUHrCcmfHT00IxJ7jEpalq5FDE7mceZjw5Ik7I4qfl0XjrtFBwog5MVa5etN8F4",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://humble-elk-44.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "QnUHrCcmfHT00IxJ7jEpalq5FDE7mceZjw5Ik7I4qfl0XjrtFBwog5MVa5etN8F4",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
