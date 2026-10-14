"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import type { Weight } from "@/lib/types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function WeightsPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [weights, setWeights] = useState<Weight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newWeight, setNewWeight] = useState("");
  const [newDate, setNewDate] = useState(today());
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState("");
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  useEffect(() => {
    if (!token) return;
    void loadWeights(token);
  }, [token]);

  async function loadWeights(currentToken: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Weight[]>("/weights", currentToken);
      setWeights(data);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "몸무게 기록을 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSubmitting(true);
    try {
      await api.post(
        "/weights",
        { weight: Number(newWeight), recordedAt: newDate },
        token,
      );
      setNewWeight("");
      await loadWeights(token);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "몸무게 기록 등록에 실패했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(w: Weight) {
    setEditingId(w.id);
    setEditWeight(String(w.weight));
    setEditDate(w.recordedAt);
  }

  async function handleUpdate(id: number) {
    if (!token) return;
    setError(null);
    try {
      await api.patch(
        `/weights/${id}`,
        { weight: Number(editWeight), recordedAt: editDate },
        token,
      );
      setEditingId(null);
      await loadWeights(token);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "몸무게 기록 수정에 실패했습니다.",
      );
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    if (!confirm("이 몸무게 기록을 삭제할까요?")) return;
    setError(null);
    try {
      await api.delete(`/weights/${id}`, token);
      await loadWeights(token);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "몸무게 기록 삭제에 실패했습니다.",
      );
    }
  }

  if (authLoading || !token) {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">몸무게 기록</h1>

      <form
        onSubmit={handleCreate}
        className="mb-8 flex flex-wrap items-end gap-3"
      >
        <label className="flex flex-col gap-1 text-sm">
          몸무게 (kg)
          <input
            type="number"
            step="0.1"
            min="0"
            required
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="w-28 rounded border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-black"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          날짜
          <input
            type="date"
            required
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-black"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-zinc-500">불러오는 중...</p>
      ) : weights.length === 0 ? (
        <p className="text-sm text-zinc-500">등록된 몸무게 기록이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {weights.map((w) => (
            <li
              key={w.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded border border-black/10 px-4 py-3 dark:border-white/10"
            >
              {editingId === w.id ? (
                <>
                  <div className="flex flex-1 flex-wrap gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="w-24 rounded border border-black/10 px-2 py-1 dark:border-white/20 dark:bg-black"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="rounded border border-black/10 px-2 py-1 dark:border-white/20 dark:bg-black"
                    />
                  </div>
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleUpdate(w.id)}
                      className="underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-zinc-500 underline"
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="font-medium">
                      {Number(w.weight).toFixed(1)}kg
                    </span>{" "}
                    <span className="text-sm text-zinc-500">
                      {w.recordedAt}
                    </span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <button onClick={() => startEdit(w)} className="underline">
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="text-red-600 underline"
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
