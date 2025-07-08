import { Request, Response } from "express";

export const registrarAluno = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;
};
