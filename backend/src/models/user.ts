import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyCreateAssociationMixin,
    HasManyHasAssociationMixin
} from 'sequelize';
import sequelizeConnection from '../config/database';
import Payment from './payment';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: CreationOptional<string>;
    declare status: CreationOptional<number>;
    declare role: CreationOptional<number>;

    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;

    declare getPayments: HasManyGetAssociationsMixin<Payment>;
    declare addPayment: HasManyAddAssociationMixin<Payment, number>;
    declare setPayment: HasManySetAssociationsMixin<Payment, number>;
    declare removePayment: HasManyRemoveAssociationMixin<Payment, number>;
    declare hasPayments: HasManyHasAssociationMixin<Payment, number>;
    declare createPayment: HasManyCreateAssociationMixin<Payment, 'user_id'>;

    declare static associations: {
        payments: Association<User, Payment>;
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: new DataTypes.STRING(30),
            allowNull: false,
            unique: {
                name: 'Email_index_unique',
                msg: 'El email ya esta en uso'
            }
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 2
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection  // * Conexion de mysql
    }
);

export default User;
