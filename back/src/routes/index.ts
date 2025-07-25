import { Router } from "express"
import { albumsRoutes } from "./albums-routes"

const routes = Router()

routes.use("/albums", albumsRoutes)

export { routes }