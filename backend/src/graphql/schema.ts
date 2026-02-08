export const typeDefs = `#graphql
  type Location {
    id: Int
    name: String
    type: String
    dimension: String
  }

  type Episode {
    id: Int
    name: String
    air_date: String
    episode_code: String
  }

  type Character {
    id: Int
    name: String
    status: String
    active: Boolean
    species: String
    type: String
    gender: String
    image: String
    origin: Location
    location: Location
    episodes: [Episode]
    created: String
  }

  input CharacterFilters {
    name: String
    status: String
    active: Boolean
    species: String
    gender: String
    origin: String
  }

  type Query {
    characters(filter: CharacterFilters): [Character]
    character(id: Int!): Character
    locations: [Location]
    location(id: Int!): Location
    episodes: [Episode]
    episode(id: Int!): Episode
  }

  type Mutation {
    updateCharacterStatus(characterId: Int!, status: Boolean!): Character
  }
`;
