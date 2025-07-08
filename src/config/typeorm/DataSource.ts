import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "../../models/usuarios/Usuario";
import { Aluno } from "../../models/usuarios/aluno/Aluno";
import { Professor } from "../../models/usuarios/professor/Professor";
import { Podcast } from "../../models/podcast/Podcast";
import { Episodio } from "../../models/episodio/Episodio";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "fctepodcast",
  synchronize: process.env.NODE_ENV !== "production",
  entities: [Usuario, Aluno, Professor, Podcast, Episodio],
  logging: false,
  migrations: [],
  subscribers: [],
});
