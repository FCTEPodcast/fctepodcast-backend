import express from "express";
import professorRegistroValidations from "../../../middlewares/validations/usuario/professor/professorRegistroValidations";
import { validate } from "../../../middlewares/validate/validate";
import { registrarProfessor } from "../../../controllers/usuario/professor/registrarProfessor";

const professorRouter = express.Router();

professorRouter.post(
  "/registrar",
  professorRegistroValidations(),
  validate,
  registrarProfessor
);

export default professorRouter;
