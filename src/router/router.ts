import express from "express";
import usuarioRouter from "./usuario/usuarioRouter";

const router = express.Router();

router.use("/usuario", usuarioRouter);

export default router;
