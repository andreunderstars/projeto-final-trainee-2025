"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  avaliacoes: Avaliacao[];
  createdAt: string;
  updatedAt?: string;
}

interface AlbumPageProps {
  params: {
    id: string;
  };
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const albumId = params.id;
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Album>(`/albums/${albumId}`);
        setAlbum(response.data);
      } catch (err: any) {
        console.error(`Erro ao buscar detalhes do álbum ${albumId}:`, err);
        if (err.response) {
          if (err.response.status === 404) {
            setError("Álbum não encontrado.");
          } else {
            setError(
              `Erro ao carregar detalhes: ${
                err.response.data.error || "Erro interno do servidor."
              }`
            );
          }
        } else {
          setError("Não foi possível carregar os detalhes do álbum.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchAlbumDetails();
    }
  }, [albumId]);

  // Placeholder de imagem se não houver URL ou for nula
  const displayImageUrl = album?.imageUrl || "/bg-secao-inicial.png";

  const averageScore =
    album?.avaliacoes && album.avaliacoes.length > 0
      ? (
          album.avaliacoes.reduce((sum, av) => sum + av.score, 0) /
          album.avaliacoes.length
        ).toFixed(1)
      : "N/A";

  if (loading) {
    return (
      <main className="flex-grow py-8 bg-white text-black text-center">
        <p>Carregando detalhes do álbum...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow py-8 bg-white text-black text-center">
        <p className="text-red-500">{error}</p>
        <Link
          className="flex text-purple-500 hover:text-purple-800 mt-4 justify-center"
          href="/albuns"
        >
          <ChevronLeft /> Voltar para os álbuns
        </Link>
      </main>
    );
  }

  if (!album) {
    return (
      <main className="flex-grow py-8 bg-white text-black text-center">
        <p>Álbum não encontrado.</p>
        <Link
          className="flex text-purple-500 hover:text-purple-800 mt-4 justify-center"
          href="/albuns"
        >
          <ChevronLeft /> Voltar para os álbuns
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow py-8 bg-white text-black">
      <div className="container mx-auto px-4">
        <Link
          className="flex text-purple-500 hover:text-purple-800 mb-6 items-center"
          href="/albuns"
        >
          <ChevronLeft className="mr-1" />
          Voltar para os álbuns
        </Link>

        <section className="rounded-lg overflow-hidden shadow-md">
          {/* Imagem da Capa do Álbum */}
          <div className="relative h-96 w-full">
            <Image
              src={displayImageUrl}
              alt={`Capa do álbum ${album.title}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>

        {/* Conteúdo */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-4">
            {/* Card com infos do álbum */}
            <div className="bg-purple-50 p-6 rounded-2xl flex flex-col items-start">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black">
                    {album.title}
                  </h2>
                  <p className="text-gray-500 text-xl md:text-2xl">
                    {album.artist}
                  </p>{" "}
                </div>

                <div className="text-right">
                  <p className="text-xl md:text-2xl lg:text-3xl font-extrabold text-black">
                    {" "}
                    Nota:<span className="ml-1">{averageScore}</span>
                  </p>
                  <p className="text-gray-500 text-xl md:text-2xl">
                    {album.gender}
                  </p>{" "}
                  <p className="text-gray-500 text-xl md:text-2xl">
                    Ano: {album.releaseYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Card do botão de Avaliações*/}
            <div className="bg-purple-50 p-4 rounded-2xl">
              <Link href={`/avaliacoes/${album.id}`}>
                <button className="bg-purple-600 text-white font-extrabold py-6 px-8 rounded-lg hover:bg-purple-700 transition text-2xl md:text-3xl lg:text-4xl w-full cursor-pointer">
                  {" "}
                  {/* Ajustado tamanho do texto */}
                  Avaliações
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
