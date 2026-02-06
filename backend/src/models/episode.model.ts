import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Episode extends Model {
    public id!: number;
    public name!: string;
    public airDate!: string;
    public episodeCode!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Episode.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        airDate: {
            type: DataTypes.STRING(100),
            field: 'air_date',
        },
        episodeCode: {
            type: DataTypes.STRING(20),
            field: 'episode_code',
        },
    },
    {
        sequelize,
        tableName: 'episodes',
        underscored: true,
    }
);

export default Episode;
