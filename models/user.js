import { DataTypes } from "sequelize";
import { Joi } from "sequelize-joi";
import PostgresSequelize from "../connector/postgres/index.js";

const Model = PostgresSequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    schema: Joi.string().required().min(3).max(50),
    get() {
      const rawValue = this.getDataValue("username");

      return rawValue ? rawValue.toUpperCase() : null;
    },
  },
  password: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 21,
  },
  wittCodeRocks: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Model.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

Model.sync()

  // .then(() => {
  //   return Model.create({
  //     password: "123123",
  //     username: "quan tri",
  //     age: 35,
  //     wittCodeRocks: false,
  //   });
  // })
  // .then(() => {
  //   return Model.findAll({ attributes: { exclude: ["createAt", "updateAt"] } });
  // })
  // .then((data) => {
  //   data.forEach((el) => console.log(el.toJSON()));
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  .then(() => {
    return Model.findAll({
      attributes: ["user_id", ["username", "myName"], ["age", "myAge"]],
      order: [["user_id", "DESC"]],
    });
  })
  .then((data) => {
    data.forEach((x) => console.log(x.toJSON()));
  });

/**
 * trong hàm sync() có 2 object quan trọng
 *
 * - sync() : tạo table nếu nó chưa tồn tại, không làm gì nếu table đã tồn tại rồi
 * - sync( { force:true } ) : tạo table, xóa table trước đó nếu nó tồn tại r
 * - sync( { alter:true } ) : khi sync kiểu này, vd table muôn thêm field mới, thì nó sẽ tạo column mới mà k xóa table cũ
 */

export default Model;
