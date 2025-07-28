import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"

class AvaliacoesController {
 
async create(req: Request, res: Response) {
 
 const albumIdParamSchema = z.string().transform((val) => {
        const num = parseInt(val, 10);
        return isNaN(num) ? undefined : num;
      })
      .refine((val) => val !== undefined, {
        message: "ID do álbum inválido. Deve ser um número inteiro.",
      });
 
    const bodySchema = z.object({
        title: z.string().max(100).trim(),
        date: z.string().max(10).trim(),
        score: z.number().min(0).max(10, "A nota deve ser entre 0 e 10."),
        comment: z.string().max(1500).trim(),
    })

     const parsedAlbumId = albumIdParamSchema.safeParse(req.params.albumId);

      const albumId = parsedAlbumId.data;

    const { title, date, score, comment } = bodySchema.parse(req.body)

      const avaliacao = await prisma.avaliacao.create({
        data: {
            title,
            date,
            score,
            comment,
            album: {
            connect: {
              id: albumId, 
            },
        },
    }
      })
      return res.status(201).json(avaliacao);
}
  }


export { AvaliacoesController }