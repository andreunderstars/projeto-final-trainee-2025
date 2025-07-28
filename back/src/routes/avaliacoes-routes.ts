import { Router } from "express"
import { AvaliacoesController } from "../controllers/avaliacoes-controllers"

const avaliacoesRoutes = Router({ mergeParams: true })

const avaliacoesController = new AvaliacoesController()

avaliacoesRoutes.post("/", avaliacoesController.create)
avaliacoesRoutes.get("/", avaliacoesController.index)

export { avaliacoesRoutes }