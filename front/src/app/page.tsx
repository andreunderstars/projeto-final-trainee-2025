"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import AlbumCard from "./components/albumCard";
import { Album } from "@/app/albuns/page";

export default function Home() {
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedAlbums = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Album[]>("/albums");
        setFeaturedAlbums(response.data.slice(0, 4));
      } catch (err) {
        console.error("Erro ao buscar álbuns em destaque:", err);
        setError("Não foi possível carregar os álbuns em destaque.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedAlbums();
  }, []);

  return (
    <main className="flex-grow">
      {/* Seção Inicial */}
      <section className="py-12 w-full bg-[url('/bg-secao-inicial.png')] bg-no-repeat bg-cover bg-center">
        <div className="container mx-auto flex flex-col gap-6 items-center py-12 px-4 sm:px-0 text-center">
          <div className="text-white text-4xl sm:text-5xl ">
            <h2>Organize, avalie e reviva cada batida.</h2>
            <h2>Sua coleção musical, do seu jeito.</h2>
          </div>

          <Link
            className="bg-purple-600 hover:bg-purple-800 transition-colors text-white text-xl md:text-2xl whitespace-nowrap rounded-4xl px-8 py-6 w-full max-w-xs sm:w-auto text-center"
            href="/albuns"
          >
            Comece sua coleção
          </Link>
        </div>
      </section>

      {/* Seção Álbuns em destaque*/}
      <section className="bg-white w-full py-12">
        <div className="container mx-auto px-4 text-black">
          <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
            Álbuns em Destaque
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {loading && (
              <p className="text-center col-span-full">
                Carregando álbuns em destaque...
              </p>
            )}
            {error && (
              <p className="text-center col-span-full text-red-500">{error}</p>
            )}
            {!loading && featuredAlbums.length === 0 && !error && (
              <p className="text-center col-span-full text-gray-600">
                Nenhum álbum em destaque para mostrar.
              </p>
            )}

            {!loading &&
              featuredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onEdit={() => console.log("Edição não disponível na Home")}
                  onDelete={() =>
                    console.log("Exclusão não disponível na Home")
                  }
                  showActions={false}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
