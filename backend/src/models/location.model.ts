import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Location extends Model {
    public id!: number;
    public name!: string;
    public type!: string;
    public dimension!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Location.init(
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
        type: {
            type: DataTypes.STRING(100),
        },
        dimension: {
            type: DataTypes.STRING(100),
        },
    },
    {
        sequelize,
        tableName: 'locations',
        underscored: true,
    }
);

export default Location;
