import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white text-black py-4 border-b border-slate-200 drop-shadow-lg">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <div className="relative w-[150px] h-[50px]">
          <Image
            src={"/logo-colecao-virtual.png"}
            fill
            alt="logo do site"
          ></Image>
        </div>

        <nav className="flex gap-6 text-lg font-semibold">
          <Link
            className="hover text-purple-600 transition-colors"
            href="/inicio"
          >
            Sobre
          </Link>

          <Link
            className="hover text-purple-600 transition-colors"
            href="/albuns"
          >
            Álbuns
          </Link>
        </nav>
      </div>
    </header>
  );
}
