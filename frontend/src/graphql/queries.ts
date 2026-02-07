import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($filter: CharacterFilters) {
    characters(filter: $filter) {
      id
      name
      status
      species
      image
    }
  }
`;

export const GET_CHARACTER_DETAIL = gql`
  query GetCharacter($id: Int!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;
