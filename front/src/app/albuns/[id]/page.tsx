import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AlbumPage() {
  return (
    <main className="flex-grow py-8 bg-white">
      <div className="container mx-auto">
        <Link
          className="flex text-purple-500 hover:text-purple-800 mb-6 "
          href="/albuns"
        >
          <ChevronLeft />
          Voltar para os álbuns
        </Link>

        <section className="rounded-lg overflow-hidden shadow-md">
          {/* Imagem da Capa do Álbum */}
          <div className="relative h-96 w-full">
            <Image
              src="/bg-secao-inicial.png"
              alt="Capa do álbum"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>

        {/* Conteúdo */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            {/* Card com infos do álbum */}
            <div className="bg-purple-50 p-6 rounded-2xl flex flex-col items-start">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black">
                    Título do Álbum
                  </h2>
                  <p className="text-gray-500 text-2xl">Nome do Artista</p>
                </div>

                <div className="text-right">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black">
                    {/* Exemplo de Nota */}
                    Nota:<span className="ml-1">8.7</span>
                  </p>
                  <p className="text-gray-500 text-2xl">Gênero</p>
                </div>
              </div>
            </div>

            {/* Card do botão de Avaliações*/}
            <div className="bg-purple-50 p-4 rounded-2xl">
              <button className="bg-purple-600 text-white font-extrabold py-6 px-8 rounded-lg hover:bg-purple-700 transition text-4xl w-full">
                Avaliações
              </button>
            </div>
          </div>

          {/* Card de Músicas */}
          <div className="bg-purple-50 p-6 rounded-2xl">
            <ul className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <li
                  key={num}
                  className="flex items-center gap-3 text-gray-600 text-xl"
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-purple-500 text-white rounded-full text-sm font-bold">
                    {num}
                  </span>
                  Nome da música
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
