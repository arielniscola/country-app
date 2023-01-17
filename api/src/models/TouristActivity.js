const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('TouristActivity', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.INTEGER
        },
        duration:{
            type: DataTypes.FLOAT
        },
        seasons:{
            type: DataTypes.ARRAY(DataTypes.STRING)     
        },
        img:{
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
};