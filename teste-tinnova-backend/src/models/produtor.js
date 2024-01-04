const { Sequelize, DataTypes, Model } = require("sequelize");
const { cpf, cnpj } = require('cpf-cnpj-validator');
const sequelize = require("../database");

class Produtor extends Model {}

Produtor.init(
  {
    cpfCnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isValid(value) {
          if (!cpf.isValid(value) && !cnpj.isValid(value)) {
            throw new Error('CPF ou CNPJ inválido.');
          }
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeFazenda: {
      type: DataTypes.STRING,
    },
    cidade: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
    },
    areaTotal: {
      type: DataTypes.FLOAT,
    },
    areaAgricultavel: {
      type: DataTypes.FLOAT,
    },
    areaVegetacao: {
      type: DataTypes.FLOAT,
    },
    cultura: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Este campo será um array de strings
    },
  },
  {
    sequelize,
    modelName: "Produtor",
    tableName: "produtores",
    timestamps: false,
    hooks: {
      beforeValidate: (produtor, options) => {
        if (parseFloat(produtor.areaAgricultavel) + parseFloat(produtor.areaVegetacao) > parseFloat(produtor.areaTotal)) {
          throw new Error('A soma das áreas agricultável e de vegetação não pode exceder a área total.');
        }
      }
    }
  }
);

module.exports = Produtor;
