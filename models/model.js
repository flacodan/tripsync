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
      type: DataTypes.STRING(80),
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
      type: DataTypes.STRING(80),
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

export class To_do extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

To_do.init(
  {
    to_do_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    to_do_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    to_do_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: "to_do",
    sequelize: db,
    timestamps: false,
  }
);

export class Pin extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Pin.init(
  {
    pin_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pin_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    pin_long: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    pin_lat: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    is_pin_note: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "pin",
    sequelize: db,
    timestamps: false,
  }
);

export class Note extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Note.init(
  {
    note_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note_text: {
      type: DataTypes.STRING,
    },
    pin_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "note",
    sequelize: db,
    timestamps: false,
  }
);

//TABLE RELATIONSHIPS
User.hasMany(To_do, { foreignKey: "user_id" });
To_do.belongsTo(User, { foreignKey: "user_id" });

Trip.hasMany(Pin, { foreignKey: "trip_id" });
Pin.belongsTo(Trip, { foreignKey: "trip_id" });

Trip.hasMany(To_do, { foreignKey: "trip_id" });
To_do.belongsTo(Trip, { foreignKey: "trip_id" });

Trip.hasMany(Note, { foreignKey: "trip_id" });
Note.belongsTo(Trip, { foreignKey: "trip_id" });

User.belongsToMany(Trip, { through: "TripUser" });
Trip.belongsToMany(User, { through: "TripUser" });
//This (above) will automatically create a TripUser table with foreign keys to Trip and User.
