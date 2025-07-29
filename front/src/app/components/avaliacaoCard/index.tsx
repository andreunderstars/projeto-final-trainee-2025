import { SquarePen, Trash2 } from "lucide-react";

export default function AvaliacaoCard() {
  return (
    <div className="bg-[#f9f4fa] shadow-md rounded-4xl py-4 px-6 flex justify-between items-center flex-col sm:flex-row">
        <div className="flex flex-col">
      <h3 className="text-3xl font-bold">Título da Avaliação
        <small className="text-gray-500 text-lg font-normal"> | Data: XX/XX/XXXX</small>
      </h3>
        <p className="text-gray-600">Descrição da avaliação...</p>
      </div>

<div className="flex items-center gap-8">
      <span className="bg-white font-bold p-6 text-2xl rounded-xl">
        Nota
      </span>
<div className="flex gap-2">
    <button className="bg-white p-2 rounded-lg hover:cursor-pointer hover:bg-[#f0f0f0] transition-all">
        <SquarePen color="#803cf3"/>
    </button>

    <button className="bg-white p-2 rounded-lg hover:cursor-pointer hover:bg-[#f0f0f0] transition-all">
        <Trash2 color="#803cf3" />
    </button>
</div>
</div>
    </div>
  );
}
