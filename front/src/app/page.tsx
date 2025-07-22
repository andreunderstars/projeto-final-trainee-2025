import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow">
      <div className="container mx-auto">
        {/* Seção Inicial */}

        <section className="py-12">
          <div className="container mx-auto flex flex-col gap-6 items-center py-12 px-4 sm:px-0 text-center">
            <div className="text-4xl sm:text-5xl ">
              <h2>
                Organize, avalie e reviva cada batida.
              </h2>
              <h2>
                 Sua coleção musical, do seu jeito.
              </h2>
            </div>

          <Link className="bg-purple-600 hover:bg-purple-800 transition-colors text-white text-2xl whitespace-nowrap rounded-4xl px-8 py-6 w-full max-w-xs sm:w-auto text-center" href="/albuns">
            Comece sua coleção
          </Link>

          </div>
        </section>
      </div>
    </main>
  );
}
