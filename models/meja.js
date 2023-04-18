'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey: `id_meja`, as: "transaksi"
      })
    }
  }
  meja.init({
    nomor_meja: DataTypes.STRING,
    status_meja: DataTypes.ENUM('kosong','tidak_kosong')
  }, {
    sequelize,
    modelName: 'meja',
  });
  return meja;
};