import { Router } from "express";
import { ConsultarPreguntas } from "../controllers/preguntas.controller";

const router = Router();

router.get("/api/ConsultarPreguntas", ConsultarPreguntas);

export default router;