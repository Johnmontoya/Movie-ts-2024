import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    ForeignKey
} from 'sequelize';
import sequelizeConnection from '../config/database';
import User from './user';

class Payment extends Model<
    InferAttributes<Payment>,
    InferCreationAttributes<Payment>
> {
    declare id: CreationOptional<number>;
    declare checkSessionId: string;
    declare user_id: ForeignKey<User['id']>;

    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        checkSessionId: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'payments',
        sequelize: sequelizeConnection // * Conexion de mysql
    }
);

export default Payment;
