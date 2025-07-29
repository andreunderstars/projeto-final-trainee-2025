import { Router } from "express"
import { albumsRoutes } from "./albums-routes"
import { avaliacoesRoutes } from "./avaliacoes-routes"

const routes = Router()

routes.use("/albums", albumsRoutes)
routes.use("/albums/:albumId/avaliacoes", avaliacoesRoutes)

export { routes }