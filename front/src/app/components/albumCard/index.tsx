"use client";
import Link from "next/link";
import Image from "next/image";
import { SquarePen, Trash2 } from "lucide-react";
import { Album } from "@/app/albuns/page";

interface AlbumCardProps {
  album: Album;
  onEdit: (album: Album) => void;
  onDelete: (albumId: number) => void;
  showActions?: boolean;
}

export default function AlbumCard({
  album,
  onEdit,
  onDelete,
  showActions = true,
}: AlbumCardProps) {
  const displayImageUrl = album.imageUrl || "/bg-secao-inicial.png";

  return (
    <Link href={`/albuns/${album.id}`}>
      <div className="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden w-[20rem] flex flex-col h-full">
        {/* Imagem do álbum */}
        <div className="relative w-full h-32 flex-shrink-0">
          <Image
            src={displayImageUrl}
            alt={`Capa do álbum ${album.title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          {showActions && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                className="bg-gray-800 hover:scale-105 transition-all text-white rounded-lg p-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(album.id);
                }}
              >
                <Trash2 size={24} />
              </button>
              <button
                className="bg-gray-800 hover:scale-105 transition-all text-white rounded-lg p-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(album);
                }}
              >
                <SquarePen size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Detalhes do álbum */}
        <div className="py-4 px-2 flex-grow text-black">
          <h3 className="text-lg font-bold truncate">{album.title}</h3>
          <p className="text-sm text-slate-600">De: {album.artist}</p>
          <p className="text-sm text-slate-600">Gênero: {album.gender}</p>
          <p className="text-sm text-slate-600">Ano: {album.releaseYear}</p>
        </div>
      </div>
    </Link>
  );
}
