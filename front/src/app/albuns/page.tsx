"use client";

import { useState } from "react";
import AlbumCard from "../components/albumCard";
import AlbumFormModal from "../components/AlbumFormModal";

export default function Albuns() {
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

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

          {/* Cards de álbuns */}
          <div className="flex gap-6 flex-wrap justify-center">
            <AlbumCard />
            <AlbumCard />
            <AlbumCard />
          </div>
        </div>
      </section>

      <AlbumFormModal
        isOpen={isAlbumModalOpen}
        onClose={() => setIsAlbumModalOpen(false)}
        onAlbumCreated={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </main>
  );
}
