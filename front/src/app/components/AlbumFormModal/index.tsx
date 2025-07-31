"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import api from "@/utils/api";
import { Album } from "@/app/albuns/page";

interface AlbumFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAlbumCreated: () => void;
  onAlbumUpdated: () => void;
  editingAlbum?: Album | null;
}

export default function AlbumFormModal({
  isOpen,
  onClose,
  onAlbumCreated,
  onAlbumUpdated,
  editingAlbum,
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

  useEffect(() => {
    if (isOpen && editingAlbum) {
      setTitle(editingAlbum.title);
      setArtist(editingAlbum.artist);
      setGender(editingAlbum.gender);
      setReleaseYear(editingAlbum.releaseYear.toString());
      setImageUrl(editingAlbum.imageUrl || "");
      setError(null);
      setSuccess(null);
    } else if (isOpen && !editingAlbum) {
      setTitle("");
      setArtist("");
      setGender("");
      setReleaseYear("");
      setImageUrl("");
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, editingAlbum]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    const trimmedTitle = title.trim();
    const trimmedArtist = artist.trim();
    const trimmedGender = gender.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (
      !trimmedTitle ||
      !trimmedArtist ||
      !trimmedGender ||
      !releaseYear.trim()
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    const parsedReleaseYear = parseInt(releaseYear);
    if (isNaN(parsedReleaseYear)) {
      setError("O Ano de lançamento deve ser um número válido.");
      setLoading(false);
      return;
    }

    const albumData = {
      title: trimmedTitle,
      artist: trimmedArtist,
      gender: trimmedGender,
      releaseYear: parsedReleaseYear,
      imageUrl: trimmedImageUrl === "" ? null : trimmedImageUrl,
    };

    try {
      let response;
      if (editingAlbum) {
        {
          /* Modo Edição*/
        }
        console.log(
          "Frontend: Tentando ATUALIZAR álbum com ID:",
          editingAlbum.id,
          "e dados:",
          albumData
        );
        response = await api.put(`/albums/${editingAlbum.id}`, albumData);
        setSuccess("Álbum atualizado com sucesso!");
        onAlbumUpdated();
      } else {
        {
          /* Modo Criação */
        }
        console.log("Frontend: Tentando CRIAR álbum com dados:", albumData);
        response = await api.post("/albums", albumData);
        setSuccess("Álbum criado com sucesso!");
        onAlbumCreated();
      }

      console.log(
        `${editingAlbum ? "Álbum atualizado" : "Álbum criado"}:`,
        response.data
      );

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Frontend: Erro ao submeter álbum:", err);

      if (err.response) {
        const backendErrorMessage =
          err.response.data.message ||
          err.response.data.error ||
          "Erro desconhecido do servidor.";
        setError(`Erro: ${backendErrorMessage}`);
      } else {
        setError("Ocorreu um erro inesperado na requisição.");
      }
    } finally {
      setLoading(false);
    }
  };

  const dialogTitle = editingAlbum ? "Editar Álbum" : "Novo Álbum";
  const submitButtonText = loading
    ? editingAlbum
      ? "Atualizando..."
      : "Criando..."
    : editingAlbum
    ? "Salvar Alterações"
    : "Criar Álbum";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-black">
            {dialogTitle}
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
            {" "}
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
            {" "}
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
            {" "}
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
              {submitButtonText}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
