import { Request, Response } from "express"
import { z } from "zod"

class AlbumsController {

create(req: Request, res: Response) {
    const bodySchema = z.object({
 title: z.string()
    .min(3, "O título é obrigatório.") 
    .max(100, "O título não pode ter mais de 100 caracteres.") 
    .trim(), 

  artist: z.string()
    .min(4, "O nome do artista é obrigatório.")
    .max(100, "O nome do artista não pode ter mais de 100 caracteres.")
    .trim(),

  gender: z.string()
    .min(3, "O gênero é obrigatório.")
    .max(50, "O gênero não pode ter mais de 50 caracteres.")
    .trim(),

  releaseYear: z.number()
    .int("O ano de lançamento deve ser um número inteiro.") 
    .min(1800, "O ano de lançamento não pode ser anterior a 1800.") 
    .max(new Date().getFullYear(), "O ano de lançamento não pode ser futuro.") 
    .positive("O ano de lançamento deve ser um número positivo."), 

  imageUrl: z.string()
  .min(5, "A URL da imagem deve ter ao menos 5 caracteres.")
  .optional(),
    })
    
const { title, artist, gender, releaseYear, imageUrl} = bodySchema.parse(req.body)

    return res.json({ message: "create" });
  }

}

export { AlbumsController }