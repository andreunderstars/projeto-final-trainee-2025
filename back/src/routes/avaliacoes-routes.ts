import { Router } from "express"
import { AvaliacoesController } from "../controllers/avaliacoes-controllers"

const avaliacoesRoutes = Router()

const avaliacoesController = new AvaliacoesController()

export { avaliacoesRoutes }