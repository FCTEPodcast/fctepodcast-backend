import express from "express";
import professorRouter from "./professor/professorRouter";
import alunoRouter from "./aluno/alunoRouter";

const usuarioRouter = express.Router();

usuarioRouter.use("/professor", professorRouter);
usuarioRouter.use("/aluno", alunoRouter);

export default usuarioRouter;
