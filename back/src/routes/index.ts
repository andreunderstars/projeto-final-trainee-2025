import { Router } from "express"
import { albumsRoutes } from "./albums-routes"
import { avaliacoesRoutes } from "./avaliacoes-routes"

const routes = Router()

routes.use("/api/albums", albumsRoutes)

export { routes }