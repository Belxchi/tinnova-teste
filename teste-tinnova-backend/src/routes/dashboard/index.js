const express = require("express");
const router = express.Router();
const sequelize = require("../../database");
const { Sequelize } = require("sequelize");
const Produtor = require("../../models/produtor");

// Rota do Dashboard
router.get("/", async (req, res) => {
  try {
    // Calculando o total de fazendas
    const totalFazendas = await Produtor.count();

    // Calculando o total de hectares
    const totalHectares = await Produtor.sum("areaTotal");

    // Fazendas por estado
    const fazendasPorEstado = (
      await Produtor.findAll({
        attributes: [
          ["estado", "nome"],
          [Sequelize.fn("COUNT", Sequelize.col("estado")), "valor"],
        ],
        group: ["estado"],
        raw: true,
      })
    ).map((estado) => ({
      ...estado,
      valor: parseInt(estado.valor, 10),
    }));

    // Fazendas por cultura
    const fazendasPorCulturaRaw = await sequelize.query(
      "SELECT UNNEST(cultura) as nome, COUNT(*) as valor FROM produtores GROUP BY UNNEST(cultura)",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const fazendasPorCultura = fazendasPorCulturaRaw.map((cultura) => ({
      nome: cultura.nome,
      valor: parseInt(cultura.valor, 10),
    }));

    // Uso do solo
    const usoSolo = [
      {
        nome: "Agricultavel",
        valor: await Produtor.sum("areaAgricultavel"),
      },
      {
        nome: "Vegetação",
        valor: await Produtor.sum("areaVegetacao"),
      },
    ];

    // Enviando a resposta
    res.json({
      totalFazendas,
      totalHectares,
      fazendasPorEstado,
      fazendasPorCultura,
      usoSolo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
