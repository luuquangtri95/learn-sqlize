import { DataTypes } from "sequelize";
import { Joi } from "sequelize-joi";
import PostgresSequelize from "../connector/postgres/index.js";

const Model = PostgresSequelize.define("students", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    schema: Joi.string().required().min(4).max(20),
  },

  favorite_class: {
    type: DataTypes.STRING,
    defaultValue: "Computer Science",
  },

  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  subscribed_to_wittcode: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Model.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());

  return values;
};

Model.sync();

export default Model;
