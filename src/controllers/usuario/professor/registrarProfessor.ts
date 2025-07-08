import { Request, Response } from "express";
import { AppDataSource } from "../../../config/typeorm/DataSource";
import bcrypt from "bcryptjs";

export const registrarProfessor = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({
      title: "Erro de validação",
      color: "danger",
      errors: ["Todos os campos são obrigatórios."],
    });
    return;
  }

  try {
    const professoresRepo = AppDataSource.getRepository("Professor");

    // Verifica se o professor já existe
    if (await professoresRepo.findOneBy({ email })) {
      res.status(400).json({
        title: "Erro de validação",
        color: "danger",
        errors: ["Já existe um professor cadastrado com este email."],
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    const novoProfessor = professoresRepo.create({
      nome,
      email,
      senha: hashedSenha,
    });

    await professoresRepo.save(novoProfessor);
    res.status(201).json({
      title: "Professor registrado com sucesso",
      color: "success",
      data: {
        id: novoProfessor.id,
        nome: novoProfessor.nome,
        email: novoProfessor.email,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar professor:", error);
    res.status(500).json({
      title: "Erro interno do servidor",
      color: "danger",
      errors: ["Ocorreu um erro ao registrar o professor."],
    });
  }
};
