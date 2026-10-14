"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError } from "@/lib/api";
import type { ChatMessage } from "@/lib/types";

export default function ChatPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token || !input.trim()) return;

    const userMessage: ChatMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setSubmitting(true);

    try {
      const data = await api.post<{ reply: string }>(
        "/ai/chat",
        { message: userMessage.text },
        token,
      );
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "채팅 응답을 받지 못했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || !token) {
    return null;
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
      <h1 className="mb-2 text-2xl font-semibold">LLM 채팅</h1>
      <p className="mb-6 text-sm text-zinc-500">
        각 메시지는 이전 대화 내용을 기억하지 않고 독립적으로 처리됩니다.
      </p>

      <div className="mb-4 flex flex-1 flex-col gap-3">
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500">대화를 시작해보세요.</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "self-end rounded bg-foreground px-4 py-2 text-background"
                  : "self-start rounded border border-black/10 px-4 py-2 dark:border-white/10"
              }
            >
              {m.text}
            </div>
          ))
        )}
        {submitting && (
          <p className="self-start text-sm text-zinc-500">
            AI가 응답을 작성하고 있습니다...
          </p>
        )}
      </div>

      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          required
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-black"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
        >
          전송
        </button>
      </form>
    </main>
  );
}
