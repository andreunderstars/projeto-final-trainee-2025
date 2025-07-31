"use client";

import { useState, useEffect, useCallback } from "react";
import AlbumCard from "../components/albumCard";
import AlbumFormModal from "../components/AlbumFormModal";
import api from "@/utils/api";

interface Musica {
  id: number;
  title: string;
}

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
  imageUrl?: string;
  Musicas?: Musica[];
  avaliacoes?: Avaliacao[];
  createdAt: string;
  updatedAt?: string;
}

export default function Albuns() {
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
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

  const handleAlbumCreated = () => {
    console.log("Novo álbum criado");
    fetchAlbums();
    setIsAlbumModalOpen(false);
  };

  return (
    <main className="flex-grow bg-white text-black border-b-2 border-slate-200">
      <section>
        <div className="container mx-auto flex flex-col gap-6 p-4">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Todos os Álbuns</h2>
            <button
              onClick={() => setIsAlbumModalOpen(true)}
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
              albums.map((album) => <AlbumCard key={album.id} album={album} />)}
          </div>
        </div>
      </section>

      <AlbumFormModal
        isOpen={isAlbumModalOpen}
        onClose={() => setIsAlbumModalOpen(false)}
        onAlbumCreated={handleAlbumCreated}
      />
    </main>
  );
}
