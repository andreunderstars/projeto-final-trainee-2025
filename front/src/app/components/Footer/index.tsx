import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-2 flex items-center justify-center gap-1">
        <div className="text-gray-500">
          <p>Desenvolvido por</p>
        </div>

        <Link href="https://www.byronsolutions.com/" target="blank">
          <div className="relative w-[150px] h-[50px] cursor-pointer">
            <Image
              src={"/logo-byron.png"}
              fill
              alt="logo da byron"
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>
    </footer>
  );
}
