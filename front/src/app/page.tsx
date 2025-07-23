import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow">
        {/* Seção Inicial */}

        <section className="py-12 w-full bg-[url('/bg-secao-inicial.png')] bg-no-repeat bg-cover bg-center">
          <div className="container mx-auto flex flex-col gap-6 items-center py-12 px-4 sm:px-0 text-center">
            <div className=" text-white text-4xl sm:text-5xl ">
              <h2>
                Organize, avalie e reviva cada batida.
              </h2>
              <h2>
                 Sua coleção musical, do seu jeito.
              </h2>
            </div>

          <Link className="bg-purple-600 hover:bg-purple-800 transition-colors text-white text-xl md:text-2xl whitespace-nowrap rounded-4xl px-8 py-6 w-full max-w-xs sm:w-auto text-center" href="/albuns">
            Comece sua coleção
          </Link>

          </div>
        </section>
    </main>
  );
}
