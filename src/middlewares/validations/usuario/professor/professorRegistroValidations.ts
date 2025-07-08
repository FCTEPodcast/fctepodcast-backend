import { body } from "express-validator";

const professorRegistroValidations = () => {
  return [
    body("nome")
      .notEmpty()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter pelo menos 3 caracteres."),
    body("email")
      .notEmpty()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("O email deve ser válido.")
      .matches(/^[a-zA-Z0-9._%+-]+@(unb\.br)$/)
      .withMessage("O email deve ser institucional (unb.br)."),
    body("senha")
      .notEmpty()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres."),
  ];
};

export default professorRegistroValidations;
