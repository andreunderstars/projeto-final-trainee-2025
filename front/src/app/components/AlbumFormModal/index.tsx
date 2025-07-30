"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import api from "@/utils/api";

interface AlbumFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAlbumCreated: () => void;
}

export default function AlbumFormModal({
  isOpen,
  onClose,
  onAlbumCreated,
}: AlbumFormModalProps) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [gender, setGender] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const inputStyle = "p-2 border border-zinc-200 rounded-md text-black";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    const parsedReleaseYear = parseInt(releaseYear);
    if (isNaN(parsedReleaseYear)) {
      setError("O Ano de lançamento deve ser um número válido.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/albums", {
        title,
        artist,
        gender,
        releaseYear: parsedReleaseYear,
        imageUrl: imageUrl.trim() === "" ? null : imageUrl,
      });

      setSuccess("Álbum criado com sucesso!");
      console.log("Álbum criado:", response.data);

      setTitle("");
      setArtist("");
      setGender("");
      setReleaseYear("");
      setImageUrl("");

      onAlbumCreated();
    } catch (err) {
      console.error("Erro ao criar álbum:", err);
      // Verifica se o erro é uma resposta do Axios
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-black">
            Novo álbum
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[auto_1fr] gap-4 w-full items-center"
        >
          {/* Título */}
          <label className="text-xl text-black" htmlFor="title">
            Título
          </label>
          <input
            className={inputStyle}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Artista */}
          <label className="text-xl text-black" htmlFor="artist">
            Artista
          </label>
          <input
            className={inputStyle}
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />

          {/* Gênero */}
          <label className="text-xl text-black" htmlFor="gender">
            Gênero
          </label>
          <input
            className={inputStyle}
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />

          {/* Ano lançamento */}
          <label className="text-xl text-black" htmlFor="releaseYear">
            Lançamento
          </label>
          <input
            className={inputStyle}
            type="number"
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Ex: 2025"
            required
          />

          {/* URL da capa */}
          <label className="text-xl text-black" htmlFor="imageUrl">
            URL da capa
          </label>
          <input
            className={inputStyle}
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/capa.png"
          />

          {/* Mensagens de feedback */}
          {error && (
            <p className="col-span-2 text-red-500 text-sm text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="col-span-2 text-green-500 text-sm text-center">
              {success}
            </p>
          )}

          {/* Botões */}
          <div className="col-span-2 flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-zinc-300 rounded-md hover:bg-purple-100 transition-colors px-4 py-2 cursor-pointer text-black"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-purple-500 text-white border border-zinc-300 rounded-md hover:bg-purple-800 transition-colors px-4 py-2 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Álbum"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
