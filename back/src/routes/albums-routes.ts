import { Router } from "express"
import { AlbumsController } from "../controllers/albums-controllers"

const albumsRoutes = Router()

const albumsController = new AlbumsController()

albumsRoutes.post("/", albumsController.create)
albumsRoutes.get("/", albumsController.index)
albumsRoutes.put("/:id", albumsController.update)


export { albumsRoutes }