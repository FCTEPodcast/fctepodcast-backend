import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractedErrors: any[] = [];
  errors.array().map((error) => {
    extractedErrors.push(error.msg);
  });

  res.status(422).json({
    title: "Erro de validação",
    color: "danger",
    errors: extractedErrors,
  });
};
