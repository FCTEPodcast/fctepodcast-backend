import express from "express";
import alunoRegistroValidations from "../../../middlewares/validations/usuario/aluno/alunoRegistroValidations";
import { validate } from "../../../middlewares/validate/validate";
import { registrarAluno } from "../../../controllers/usuario/aluno/registrarAluno";

const alunoRouter = express.Router();

alunoRouter.post(
  "/registrar",
  alunoRegistroValidations(),
  validate,
  registrarAluno
);

export default alunoRouter;
