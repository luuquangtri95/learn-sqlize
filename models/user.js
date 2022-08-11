import { DataTypes } from "sequelize";
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

Model.sync().then(() => {
  return Model.create({
    username: "quang tri",
    password: "123123",
    age: 35,
    wittCodeRocks: false,
  })
    .then((data) => {
      console.log(data.toJSON());
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * trong hàm sync() có 2 object quan trọng
 *
 * - sync() : tạo table nếu nó chưa tồn tại, không làm gì nếu table đã tồn tại rồi
 * - sync( { force:true } ) : tạo table, xóa table trước đó nếu nó tồn tại r
 * - sync( { alter:true } ) : khi sync kiểu này, vd table muôn thêm field mới, thì nó sẽ tạo column mới mà k xóa table cũ
 */

export default Model;
