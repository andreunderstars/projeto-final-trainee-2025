import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Seção Inicial */}

      <section className="py-12 w-full bg-[url('/bg-secao-inicial.png')] bg-no-repeat bg-cover bg-center">
        <div className="container mx-auto flex flex-col gap-6 items-center py-12 px-4 sm:px-0 text-center">
          <div className=" text-white text-4xl sm:text-5xl ">
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
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
            Álbuns em Destaque
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {/* Placeholders para os cards de álbum*/}
            <div className="bg-gray-200 rounded-lg shadow-md h-64 flex items-center justify-center">

            </div>
            <div className="bg-gray-200 rounded-lg shadow-md h-64 flex items-center justify-center">

            </div>

            <div className="bg-gray-200 rounded-lg shadow-md h-64 flex items-center justify-center">

            </div>

            <div className="bg-gray-200 rounded-lg shadow-md h-64 flex items-center justify-center">

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
