import { ApolloServer, gql } from 'apollo-server';
const { DateTimeResolver } = require('graphql-scalars');

const typeDefs = gql`
  scalar DateTime

  type Layer {
    id: ID!
    name: String!
    visible: Boolean!
    color: String
    lastModified: DateTime
  }

  type Query {
    layers(visible: Boolean, search: String): [Layer!]!
  }

  type Mutation {
    toggleLayerVisibility(id: ID!): Layer
  }
`;

const layers = [
  { id: '1', name: 'Layer 1', visible: true, color: 'red', lastModified: new Date() },
  { id: '2', name: 'Layer 2', visible: false, color: 'blue', lastModified: new Date() },
];

const resolvers = {
  Query: {
    layers: (_: any, args: any) => {
      let result = layers;
      if (args.visible !== undefined) {
        result = result.filter(layer => layer.visible === args.visible);
      }
      if (args.search) {
        result = result.filter(layer => layer.name.toLowerCase().includes(args.search.toLowerCase()));
      }
      return result;
    },
  },
  Mutation: {
    toggleLayerVisibility: (_: any, { id }: { id: string }) => {
      const layer = layers.find(layer => layer.id === id);
      if (layer) {
        layer.visible = !layer.visible;
        layer.lastModified = new Date();
      }
      return layer;
    },
  },
  DateTime: DateTimeResolver
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
