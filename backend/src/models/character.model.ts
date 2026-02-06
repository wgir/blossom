import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Location from './location.model';

class Character extends Model {
    public id!: number;
    public name!: string;
    public status!: string;
    public species!: string;
    public type!: string;
    public gender!: string;
    public image!: string;
    public originId!: number;
    public locationId!: number;
    public created!: Date;
}

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
        },
        species: {
            type: DataTypes.STRING(100),
        },
        type: {
            type: DataTypes.STRING(100),
        },
        gender: {
            type: DataTypes.STRING(50),
        },
        image: {
            type: DataTypes.TEXT,
        },
        originId: {
            type: DataTypes.INTEGER,
            field: 'origin_id',
            references: {
                model: 'locations',
                key: 'id',
            },
        },
        locationId: {
            type: DataTypes.INTEGER,
            field: 'location_id',
            references: {
                model: 'locations',
                key: 'id',
            },
        },
        created: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: 'characters',
        underscored: true,
        timestamps: false, // Requirement shows 'created', which I'll map.
    }
);

export default Character;
