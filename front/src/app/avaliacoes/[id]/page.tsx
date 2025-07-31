"use client";

import { ChevronLeft } from "lucide-react";
import AvaliacaoCard from "@/app/components/avaliacaoCard";
import AvaliacaoFormModal, {
  Avaliacao,
} from "@/app/components/AvaliacaoFormModal";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";

export default function Avaliacoes() {
  const router = useRouter();
  const params = useParams();
  const albumId = params.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAvaliacao, setEditingAvaliacao] = useState<Avaliacao | null>(
    null
  );

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState<string | null>(null);

  useEffect(() => {
    if (albumId) {
      fetchAvaliacoes();
    }
  }, [albumId]);

  const fetchAvaliacoes = async () => {
    setLoadingReviews(true);
    setErrorReviews(null);
    try {
      const response = await api.get(`/albums/${albumId}/reviews`);
      setAvaliacoes(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar avaliações:", err);
      setErrorReviews(
        "Não foi possível carregar as avaliações. Tente novamente mais tarde."
      );
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleOpenModal = () => {
    setEditingAvaliacao(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAvaliacao(null);
  };

  const handleAvaliacaoCreated = () => {
    fetchAvaliacoes();
    handleCloseModal();
  };

  const handleAvaliacaoUpdated = () => {
    fetchAvaliacoes();
    handleCloseModal();
  };

  const handleEditAvaliacao = (avaliacao: Avaliacao) => {
    setEditingAvaliacao(avaliacao);
    setIsModalOpen(true);
  };

  const handleDeleteAvaliacao = async (avaliacaoId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta avaliação?")) {
      return;
    }
    try {
      await api.delete(`/albums/${albumId}/reviews/${avaliacaoId}`);
      fetchAvaliacoes();
    } catch (err) {
      console.error("Erro ao excluir avaliação:", err);
      setErrorReviews("Não foi possível excluir a avaliação.");
    }
  };

  return (
    <main className="flex-grow bg-white text-black border-b-2 border-slate-200">
      <section>
        <div className="container mx-auto flex flex-col gap-6 p-4">
          <header className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="text-xl text-[#8c52ff] hover:text-purple-800 transition-colors hover:cursor-pointer"
            >
              <ChevronLeft className="inline-block" size={32} />
              Voltar para álbum
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-purple-600 hover:bg-purple-800 hover:cursor-pointer transition-colors text-white text-lg font-bold whitespace-nowrap rounded-4xl px-4 py-2"
            >
              + Avaliar
            </button>
          </header>

          {/* Mensagens de feedback */}
          {loadingReviews && (
            <p className="text-center text-black">Carregando avaliações...</p>
          )}
          {errorReviews && (
            <p className="col-span-2 text-red-500 text-sm text-center">
              {errorReviews}
            </p>
          )}
          {!loadingReviews && avaliacoes.length === 0 && (
            <p className="text-center text-black">
              Nenhuma avaliação encontrada para este álbum.
            </p>
          )}

          {/* Cards de avaliações */}
          <div className="flex flex-col gap-6 flex-wrap justify-center w-[80%] mx-auto">
            {avaliacoes.map((avaliacao) => (
              <AvaliacaoCard
                key={avaliacao.id}
                avaliacao={avaliacao}
                onEdit={handleEditAvaliacao}
                onDelete={handleDeleteAvaliacao}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {albumId && (
        <AvaliacaoFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAvaliacaoCreated={handleAvaliacaoCreated}
          onAvaliacaoUpdated={handleAvaliacaoUpdated}
          editingAvaliacao={editingAvaliacao}
          albumId={albumId}
        />
      )}
    </main>
  );
}
