import Character from './character.model';
import Location from './location.model';
import Episode from './episode.model';
import sequelize from '../config/database';
import { DataTypes } from 'sequelize';

// Define the join table
const CharacterEpisodes = sequelize.define('character_episodes', {
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
            key: 'id',
        },
    },
    episode_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Episode,
            key: 'id',
        },
    },
}, {
    underscored: true,
    timestamps: false,
    tableName: 'character_episodes'
});

// Associations
Character.belongsTo(Location, { as: 'origin', foreignKey: 'origin_id' });
Character.belongsTo(Location, { as: 'location', foreignKey: 'location_id' });

Character.belongsToMany(Episode, {
    through: CharacterEpisodes,
    as: 'episodes',
    foreignKey: 'character_id',
    otherKey: 'episode_id'
});

Episode.belongsToMany(Character, {
    through: CharacterEpisodes,
    as: 'characters',
    foreignKey: 'episode_id',
    otherKey: 'character_id'
});

export { Character, Location, Episode, CharacterEpisodes };
