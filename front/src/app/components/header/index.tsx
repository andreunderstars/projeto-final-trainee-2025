import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white text-black py-4 border-b border-slate-200 drop-shadow-lg">
      <div className="container mx-auto py-2 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" passHref> 
          <div className="relative w-[150px] h-[50px] cursor-pointer"> 
            <Image
              src={"/logo-colecao-virtual.png"}
              fill
              alt="logo do site"
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        <nav className="flex gap-6 text-xl">
          <Link
            className="hover:text-purple-600 transition-colors"
            href="/"
          >
            Sobre
          </Link>

          <Link
            className="hover:text-purple-600 transition-colors"
            href="/albuns"
          >
            Álbuns
          </Link>
        </nav>
      </div>
    </header>
  );
}
