"use client";

import { SquarePen, Trash2 } from "lucide-react";
import { Avaliacao } from "@/app/components/AvaliacaoFormModal";

interface AvaliacaoCardProps {
  avaliacao: Avaliacao;
  onEdit: (avaliacao: Avaliacao) => void;
  onDelete: (avaliacaoId: string) => void;
}

export default function AvaliacaoCard({
  avaliacao,
  onEdit,
  onDelete,
}: AvaliacaoCardProps) {
  return (
    <div className="bg-[#f9f4fa] shadow-md rounded-4xl py-4 px-6 flex justify-between items-center flex-col sm:flex-row">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold">
          {avaliacao.title}
          <small className="text-gray-500 text-lg font-normal">
            {" "}
            | Data: {avaliacao.date}
          </small>
        </h3>
        <p className="text-gray-600">{avaliacao.comment}</p>{" "}
      </div>

      <div className="flex items-center gap-8 mt-4 sm:mt-0">
        {" "}
        <span className="bg-white font-bold p-6 text-2xl rounded-xl">
          {avaliacao.score}/10
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(avaliacao)}
            className="bg-white p-2 rounded-lg hover:cursor-pointer hover:bg-[#f0f0f0] transition-all"
          >
            <SquarePen color="#803cf3" />
          </button>

          <button
            onClick={() => onDelete(avaliacao.id!)}
            className="bg-white p-2 rounded-lg hover:cursor-pointer hover:bg-[#f0f0f0] transition-all"
          >
            <Trash2 color="#803cf3" />
          </button>
        </div>
      </div>
    </div>
  );
}
