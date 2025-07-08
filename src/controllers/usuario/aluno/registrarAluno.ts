import { Request, Response } from "express";
import { AppDataSource } from "../../../config/typeorm/DataSource";
import bcrypt from "bcryptjs";

export const registrarAluno = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({
      title: "Dados inválidos",
      message: "Todos os campos são obrigatórios.",
      color: "danger",
    });
    return;
  }

  try {
    const alunoRepo = AppDataSource.getRepository("Aluno");
    if (await alunoRepo.findOne({ where: { email } })) {
      res.status(400).json({
        title: "Email já cadastrado",
        message: "Já existe um aluno cadastrado com este email.",
        color: "danger",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    const novoAluno = alunoRepo.create({
      nome,
      email,
      senha: hashedSenha,
    });

    await alunoRepo.save(novoAluno);

    res.status(201).json({
      title: "Aluno registrado com sucesso",
      message: "O aluno foi registrado com sucesso.",
      color: "success",
      data: {
        id: novoAluno.id,
        nome: novoAluno.nome,
        email: novoAluno.email,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar aluno:", error);
    res.status(500).json({
      title: "Erro interno",
      message: "Ocorreu um erro ao registrar o aluno.",
      color: "danger",
    });
    return;
  }
};
