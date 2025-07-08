import express from "express";
import { configDotenv } from "dotenv";
import chalk from "chalk";
import { AppDataSource } from "./config/typeorm/DataSource";
import router from "./router/router";
import helmet from "helmet";
import cors from "cors";
configDotenv();

const app = express();
const API_PORT = process.env.API_PORT || 3000;
const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS?.split(",");

app.use(helmet({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CORS_ALLOWED_ORIGINS?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation: Origin not allowed"));
      }
    },
  })
);

// conexao com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log(
      chalk.green("Conexão com o banco de dados estabelecida com sucesso!")
    );
  })
  .catch((error) => {
    console.error(chalk.red("Erro ao conectar ao banco de dados:"), error);
  });

// rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API está funcionando corretamente",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", router);

app.listen(API_PORT, () => {
  console.clear();
  console.log(chalk.blue.bold("=============================="));
  console.log(chalk.magenta.bold(" 🎧  FCTE Podcast - API"));
  console.log(chalk.blue.bold("=============================="));
  console.log(
    `🟢 ${chalk.green("Servidor em modo:")} ${
      process.env.NODE_ENV || "desenvolvimento"
    }`
  );
  console.log(
    `🚀 ${chalk.cyan("Acessível em:")} ${chalk.underline(
      `http://localhost:${API_PORT}`
    )}`
  );
  console.log(chalk.blue.bold("=============================="));
});
