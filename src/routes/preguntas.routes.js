import { Router } from "express";
import { ConsultarPreguntas } from "../controllers/preguntas.controller";

const router = Router();

//!faltan todos estos xDDDD
router.get("/api/ConsultarPreguntas", ConsultarPreguntas);

export default router;