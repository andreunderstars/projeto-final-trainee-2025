import { Router } from "express"
import { AlbumsController } from "../controllers/albums-controllers"
import { avaliacoesRoutes } from "./avaliacoes-routes"

const albumsRoutes = Router()

const albumsController = new AlbumsController()

albumsRoutes.post("/", albumsController.create)
albumsRoutes.get("/", albumsController.index)
albumsRoutes.put("/:id", albumsController.update)
albumsRoutes.delete("/:id", albumsController.delete)
albumsRoutes.get("/:id", albumsController.show)

albumsRoutes.use("/:albumId/reviews", avaliacoesRoutes);

export { albumsRoutes }