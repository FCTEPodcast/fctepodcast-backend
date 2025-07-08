import express from "express";
import professorRouter from "./professor/professorRouter";

const usuarioRouter = express.Router();

usuarioRouter.use("/professor", professorRouter);

export default usuarioRouter;
