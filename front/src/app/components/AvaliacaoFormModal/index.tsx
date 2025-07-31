"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/utils/api";

export interface Avaliacao {
  id?: string;
  albumId: string;
  title: string;
  comment: string;
  score: number;
  date: string;
}

interface AvaliacaoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAvaliacaoCreated: () => void;
  onAvaliacaoUpdated: () => void;
  editingAvaliacao?: Avaliacao | null;
  albumId: string;
}

export default function AvaliacaoFormModal({
  isOpen,
  onClose,
  onAvaliacaoCreated,
  onAvaliacaoUpdated,
  editingAvaliacao,
  albumId,
}: AvaliacaoFormModalProps) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [score, setScore] = useState<number>(0);
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const inputStyle = "p-2 border border-zinc-200 rounded-md text-black";

  useEffect(() => {
    if (isOpen) {
      if (editingAvaliacao) {
        setTitle(editingAvaliacao.title);
        setComment(editingAvaliacao.comment);
        setScore(editingAvaliacao.score);
        setDate(editingAvaliacao.date);
      } else {
        setTitle("");
        setComment("");
        setScore(0);
        setDate(new Date().toISOString().split("T")[0]);
      }
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, editingAvaliacao]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    const trimmedTitle = title.trim();
    const trimmedComment = comment.trim();
    const parsedScore = parseInt(score.toString());

    if (
      !trimmedTitle ||
      !trimmedComment ||
      !date ||
      isNaN(parsedScore) ||
      parsedScore < 0 ||
      parsedScore > 10
    ) {
      setError(
        "Por favor, preencha todos os campos obrigatórios e forneça uma nota entre 0 e 10."
      );
      setLoading(false);
      return;
    }

    const avaliacaoData: Avaliacao = {
      albumId: albumId,
      title: trimmedTitle,
      comment: trimmedComment,
      score: parsedScore,
      date: date,
    };

    try {
      let response;
      if (editingAvaliacao) {
        console.log(
          "Frontend: Tentando editar avaliação com ID:",
          editingAvaliacao.id,
          "e dados:",
          avaliacaoData
        );
        response = await api.put(
          `/albums/${albumId}/reviews/${editingAvaliacao.id}`,
          avaliacaoData
        );
        setSuccess("Avaliação editada com sucesso!");
        onAvaliacaoUpdated();
      } else {
        console.log(
          "Frontend: Tentando criar avaliação com dados:",
          avaliacaoData
        );
        response = await api.post(`/albums/${albumId}/reviews`, avaliacaoData);
        setSuccess("Avaliação criada com sucesso!");
        onAvaliacaoCreated();
      }

      console.log(
        `${editingAvaliacao ? "Avaliação atualizada" : "Avaliação criada"}:`,
        response.data
      );

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Frontend: Erro ao submeter avaliação:", err);

      if (err.response) {
        const backendErrorMessage =
          err.response.data.message ||
          err.response.data.error ||
          "Erro desconhecido do servidor.";
        setError(`Erro: ${backendErrorMessage}`);
      } else {
        setError("Ocorreu um erro inesperado na requisição.");
      }
    } finally {
      setLoading(false);
    }
  };

  const dialogTitle = editingAvaliacao ? "Editar Avaliação" : "Nova Avaliação";
  const submitButtonText = loading
    ? editingAvaliacao
      ? "Atualizando..."
      : "Criando..."
    : editingAvaliacao
    ? "Salvar Alterações"
    : "Criar Avaliação";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-black">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[auto_1fr] gap-4 w-full items-center"
        >
          {/* Título*/}
          <label className="text-xl text-black" htmlFor="reviewTitle">
            Título
          </label>
          <input
            className={inputStyle}
            type="text"
            id="reviewTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Comentário */}
          <label className="text-xl text-black" htmlFor="comment">
            Comentário
          </label>
          <textarea
            className={`${inputStyle} h-24`}
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          {/* Nota */}
          <label className="text-xl text-black" htmlFor="score">
            Nota (0-10)
          </label>
          <input
            className={inputStyle}
            type="number"
            id="score"
            value={score === 0 ? "" : score}
            onChange={(e) => setScore(parseInt(e.target.value) || 0)}
            min="0"
            max="10"
            required
          />

          {/* Data */}
          <label className="text-xl text-black" htmlFor="date">
            Data
          </label>
          <input
            className={inputStyle}
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Mensagens de feedback */}
          {error && (
            <p className="col-span-2 text-red-500 text-sm text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="col-span-2 text-green-500 text-sm text-center">
              {success}
            </p>
          )}

          {/* Botões */}
          <div className="col-span-2 flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-zinc-300 rounded-md hover:bg-purple-100 transition-colors px-4 py-2 cursor-pointer text-black"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-purple-500 text-white border border-zinc-300 rounded-md hover:bg-purple-800 transition-colors px-4 py-2 cursor-pointer"
              disabled={loading}
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
