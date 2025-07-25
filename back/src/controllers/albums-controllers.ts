import { Request, Response } from "express"
class AlbumsController {

create(req: Request, res: Response) {
    return res.json({ message: "create" });
  }

}

export { AlbumsController }