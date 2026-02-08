import { gql } from '@apollo/client';

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacterStatus($characterId: Int!, $status: Boolean!) {
    updateCharacterStatus(characterId: $characterId, status: $status) {
      id
      active
    }
  }
`;
