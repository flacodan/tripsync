import { DataTypes, Model } from "sequelize";
import connectToDB from "../server/db.js";
import util from "util";

const dbURI = "postgresql:///tripsync";
console.log("db is: " + dbURI);

export const db = await connectToDB(dbURI);

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    // category_id as foreign key from Category

    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    modelName: "user",
    sequelize: db,
    timestamps: false,
  }
);

export class Trip extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Trip.init(
  {
    trip_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trip_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    trip_start: {
      type: DataTypes.DATEONLY,
    },
    trip_code: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    trip_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: "trip",
    sequelize: db,
    updatedAt: false,
  }
);

//TABLE RELATIONSHIPS
Trip.hasMany(User, { foreignKey: "category_id" });
User.belongsTo(Trip, { foreignKey: "category_id" });
