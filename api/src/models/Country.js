const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: ["^[a-z]+$",'i'],
        msg: "Incorrect country name"
      }
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        isIn: ["Africa", "South America", "Europe", "North America", "Oceania", "Asia"],
        msg: "Continent not exist"
      }
    },
    subregion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.FLOAT
    },
    population:{
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  }
  );
};
