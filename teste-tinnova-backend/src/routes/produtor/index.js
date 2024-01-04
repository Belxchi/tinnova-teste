const express = require("express");
const router = express.Router();
const Produtor = require("../../models/produtor");

// Buscar todos os produtores
router.get("/", async (req, res) => {
  try {
    const produtores = await Produtor.findAll();
    res.json(produtores);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para buscar um único produtor
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const produtor = await Produtor.findByPk(id);

    if (!produtor) {
      return res.status(404).send("Produtor não encontrado.");
    }

    res.json(produtor);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Criar novo produtor
router.post("/", async (req, res) => {
  try {
    // Aqui você cria um novo produtor usando os dados recebidos no corpo da requisição
    const novoProdutor = await Produtor.create(req.body);
    res.status(201).json(novoProdutor);
  } catch (error) {
    // Em caso de erro, envie uma resposta de erro
    res.status(500).send(error.message);
  }
});

// Rota para excluir um produtor
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const produtor = await Produtor.findByPk(id);

    if (!produtor) {
      return res.status(404).send("Produtor não encontrado.");
    }

    await produtor.destroy();
    res.send("Produtor excluído com sucesso.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para atualizar um produtor
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const produtor = await Produtor.findByPk(id);

    if (!produtor) {
      return res.status(404).send("Produtor não encontrado.");
    }

    // Atualizar o produtor com os dados recebidos no corpo da requisição
    await produtor.update(req.body);
    res.send("Produtor atualizado com sucesso.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
