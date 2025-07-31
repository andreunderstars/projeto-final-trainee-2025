"use client";

import { useState, useEffect, useCallback } from "react";
import AlbumCard from "../components/albumCard";
import AlbumFormModal from "../components/AlbumFormModal";
import api from "@/utils/api";

interface Avaliacao {
  id: number;
  title: string;
  date: string;
  score: number;
  comment?: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  gender: string;
  releaseYear: number;
  imageUrl?: string | null;
  avaliacoes?: Avaliacao[];
  createdAt: string;
  updatedAt?: string;
}

export default function Albuns() {
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [errorAlbums, setErrorAlbums] = useState<string | null>(null);

  const fetchAlbums = useCallback(async () => {
    setLoadingAlbums(true);
    setErrorAlbums(null);
    try {
      const response = await api.get<Album[]>("/albums");
      setAlbums(response.data);
    } catch (err) {
      console.error("Erro ao buscar álbuns:", err);
      setErrorAlbums("Erro ao carregar os álbuns. Tente novamente mais tarde.");
    } finally {
      setLoadingAlbums(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const handleOpenCreateModal = () => {
    setEditingAlbum(null);
    setIsAlbumModalOpen(true);
  };

  const handleOpenEditModal = (albumToEdit: Album) => {
    setEditingAlbum(albumToEdit);
    setIsAlbumModalOpen(true);
  };

  const handleAlbumCreated = () => {
    console.log("Frontend: Novo álbum criado. Recarregando lista...");
    fetchAlbums();
    setIsAlbumModalOpen(false);
    setEditingAlbum(null);
  };

  const handleAlbumUpdated = () => {
    console.log("Frontend: Álbum atualizado. Recarregando lista...");
    fetchAlbums();
    setIsAlbumModalOpen(false);
    setEditingAlbum(null);
  };

  const handleDeleteAlbum = async (albumId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este álbum?")) {
      try {
        setLoadingAlbums(true);
        await api.delete(`/albums/${albumId}`);
        console.log(`Frontend: Álbum ${albumId} excluído com sucesso.`);
        fetchAlbums();
      } catch (err) {
        console.error(`Frontend: Erro ao excluir álbum ${albumId}:`, err);
        setErrorAlbums("Erro ao excluir álbum. Tente novamente.");
      } finally {
        setLoadingAlbums(false);
      }
    }
  };

  return (
    <main className="flex-grow bg-white text-black border-b-2 border-slate-200">
      <section>
        <div className="container mx-auto flex flex-col gap-6 p-4">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Todos os Álbuns</h2>
            <button
              onClick={handleOpenCreateModal}
              className="bg-purple-600 hover:bg-purple-800 hover:cursor-pointer transition-colors text-white text-lg font-bold whitespace-nowrap rounded-4xl px-4 py-2"
            >
              + Novo álbum
            </button>
          </header>

          {loadingAlbums && (
            <p className="text-center text-gray-600">Carregando álbuns...</p>
          )}
          {errorAlbums && (
            <p className="text-center text-red-500">{errorAlbums}</p>
          )}

          {!loadingAlbums && albums.length === 0 && !errorAlbums && (
            <p className="text-center text-gray-600">
              Nenhum álbum encontrado. Crie o primeiro!
            </p>
          )}

          <div className="flex gap-6 flex-wrap justify-center">
            {!loadingAlbums &&
              albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteAlbum}
                />
              ))}
          </div>
        </div>
      </section>

      <AlbumFormModal
        isOpen={isAlbumModalOpen}
        onClose={() => {
          setIsAlbumModalOpen(false);
          setEditingAlbum(null);
        }}
        onAlbumCreated={handleAlbumCreated}
        onAlbumUpdated={handleAlbumUpdated}
        editingAlbum={editingAlbum}
      />
    </main>
  );
}
