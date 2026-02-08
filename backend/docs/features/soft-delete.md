# Feature Plan: Add `active` Field to Character

## Goal
Add a new boolean field `active` to the `Character` model and expose a GraphQL mutation to update it.

---

## 1. Database Layer

### 1.1 Migration: Add `active` Column

- Add a new column `active` to the `characters` table
- Type: BOOLEAN
- Default value: `true` (active)
- Not nullable

#### Migration Example (Sequelize)

```ts
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("characters", "active", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("characters", "active");
  }
};

## 2. Graphql endpoint

### 2.1 Mutation: `updateCharacteractive`

- Add a new mutation `updateCharacteractive`
- Input: `characterId` (Int), `active` (Boolean)
- Output: `Character` object
- Returns the updated character

#### Mutation Example

```graphql
mutation UpdateCharacteractive($characterId: Int!, $active: Boolean!) {
  updateCharacteractive(characterId: $characterId, active: $active) {
    id
    name
    active
  }
}
```

### 2.2 Update Query: `characters`

- Add `active` field to `Character` type
- Add `active` filter to `characters` query

#### Updated Type

```graphql
type Character {
  id: Int!
  name: String!
  active: Boolean!
  species: String!
  gender: String!
  origin: Location!
  episode: [Episode!]!
}
```

#### Updated Query

```graphql
query Characters($filter: CharacterFilter) {
  characters(filter: $filter) {
    id
    name
    active
    species
    gender
    origin {
      name
    }
    episode {
      name
    }
  }
}
```

## 3. Service Layer

### 3.1 Update Service Method

- Add `updateCharacteractive` method to `CharacterService`
- Updates the character active in the database
- Returns the updated character

#### Method Signature

```ts
async updateCharacteractive(characterId: number, active: boolean): Promise<Character>
```

## 4. Repository Layer

### 4.1 Update Repository Method

- Add `updateCharacteractive` method to `CharacterRepository`
- Updates the character active in the database
- Returns the updated character

#### Method Signature

```ts
async updateCharacteractive(characterId: number, active: boolean): Promise<Character>
```

## 5. Testing

### 5.1 Unit Tests

- Test `updateCharacteractive` mutation
- Test `active` field in `Character` type
- Test `active` filter in `characters` query

### 5.2 Integration Tests

- Test updating character active via GraphQL
- Test that inactive characters don't appear in search results
- Test that active characters appear in search results

## 6. Implementation Steps

1. Create migration to add `active` column
2. Run migration
3. Update `Character` model
4. Update `CharacterRepository`
5. Update `CharacterService`
6. Update `CharacterResolver`
7. Update `CharacterType`
8. Update `CharacterFilter`
9. Add tests
10. Verify all tests pass

## 7. Acceptance Criteria

- [ ] `active` column exists in `characters` table
- [ ] `updateCharacteractive` mutation works correctly
- [ ] `active` field is returned in `Character` type
- [ ] `active` filter works correctly in `characters` query
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors

## 8. Notes

- The `active` field should be `true` for active characters and `false` for inactive characters
- The `updateCharacteractive` mutation should return the updated character
- The `characters` query should filter by `active` when provided
- The `active` field should be included in the `Character` type
- The `CharacterFilter` should include `active` as an optional field

## 9. Rollback Plan

If something goes wrong:

1. Revert the migration (run `npm run migrate:undo`)
2. Remove the `active` field from `Character` model
3. Remove the `updateCharacteractive` mutation
4. Remove the `active` field from `Character` type
5. Remove the `active` filter from `CharacterFilter`
6. Remove the `updateCharacteractive` method from `CharacterService`
7. Remove the `updateCharacteractive` method from `CharacterRepository`
8. Remove the tests

## 10. Additional Information

- The `active` field should be `boolean` type
- The `active` field should have a default value of `true`
- The `active` field should not be nullable
- The `updateCharacteractive` mutation should return the updated character
- The `characters` query should filter by `active` when provided
- The `active` field should be included in the `Character` type
- The `CharacterFilter` should include `active` as an optional field

## 11. Example Usage

### Update character active

```graphql
mutation UpdateCharacteractive($characterId: Int!, $active: Boolean!) {
  updateCharacteractive(characterId: $characterId, active: $active) {
    id
    name
    active
  }
}
```

### Query with active filter

```graphql
query Characters($filter: CharacterFilter) {
  characters(filter: $filter) {
    id
    name
    active
    species
    gender
    origin {
      name
    }
    episode {
      name
    }
  }
}
```

## 12. Expected Changes

### Files to Modify

- `src/migrations/YYYYMMDDHHMMSS-add-active-to-characters.js` - Migration file
- `src/models/character.model.ts` - Character model
- `src/repositories/character.repository.ts` - Character repository
- `src/services/character.service.ts` - Character service
- `src/resolvers/character.resolver.ts` - Character resolver
- `src/types/character.type.ts` - Character type
- `src/types/character-filter.type.ts` - Character filter type
- `src/tests/character.test.ts` - Character tests

### Database Changes

- Add `active` column to `characters` table
- Type: BOOLEAN
- Default value: `true`
- Not nullable

### GraphQL Changes

- Add `active` field to `Character` type
- Add `active` filter to `CharacterFilter` type
- Add `updateCharacteractive` mutation

### Service Changes

- Add `updateCharacteractive` method to `CharacterService`

### Repository Changes

- Add `updateCharacteractive` method to `CharacterRepository`

### Test Changes

- Add tests for `updateCharacteractive` mutation
- Add tests for `active` field
- Add tests for `active` filter

