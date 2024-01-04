const express = require("express");
const cors = require("cors");

const produtorRoutes = require("./routes/produtor");
const dashboardRoutes = require("./routes/dashboard");
const sequelize = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log("Banco de dados OK"));

app.use("/produtores", produtorRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
