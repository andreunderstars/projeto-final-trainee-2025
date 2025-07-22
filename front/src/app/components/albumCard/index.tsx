import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react"

export default function AlbumCard() {
return (
<Link href={`/albuns/`}>
  <div className="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden w-[15rem]">

    <div className="py-4 px-2">
    <h3 className="text-lg font-bold">Nome do àlbum</h3>
    <p className="text-sm text-slate-600">De: Artista</p>
 </div>

<div className="relative w-full h-32">
<Image src="/bg-secao-inicial.png" alt="Capa do álbum" layout="fill" objectFit="cover" />
<button className="absolute bottom-2 right-2 bg-gray-800 hover:scale-105 hover:cursor-pointer transition-all text-white rounded-lg p-1">
    <Trash2 size={24} />
</button>
</div>
 </div>
</Link>
)
}