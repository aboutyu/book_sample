"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import type { CalorieEstimate } from "@/lib/types";

export default function CaloriesPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [foodName, setFoodName] = useState("");
  const [result, setResult] = useState<CalorieEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setResult(null);
    setSubmitting(true);
    try {
      const data = await api.post<CalorieEstimate>(
        "/ai/estimate-calories",
        { foodName },
        token,
      );
      setResult(data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "칼로리 추정에 실패했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || !token) {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="mb-2 text-2xl font-semibold">AI 음식 칼로리 추정</h1>
      <p className="mb-6 text-sm text-zinc-500">
        AI가 추정한 값이며, 실제 영양정보와 다를 수 있습니다.
      </p>

      <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          required
          placeholder="예: 김치찌개 1인분"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="min-w-64 flex-1 rounded border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-black"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
        >
          {submitting ? "추정 중..." : "칼로리 추정"}
        </button>
      </form>

      {submitting && (
        <p className="text-sm text-zinc-500">
          AI 서버에 요청 중입니다. 처음 실행하는 경우 최대 1분 정도 걸릴 수
          있습니다.
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result && (
        <div className="rounded border border-black/10 px-4 py-4 dark:border-white/10">
          <p className="text-lg font-medium">{result.foodName}</p>
          <p className="text-2xl font-semibold">
            {result.estimatedCalories} {result.unit}
          </p>
          <p className="mt-2 text-sm text-zinc-500">{result.note}</p>
        </div>
      )}
    </main>
  );
}
