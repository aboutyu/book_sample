"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(email, password);
      router.push("/weights");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "회원가입에 실패했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          이메일
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-black"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          비밀번호 (8자 이상)
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-black"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
        >
          {submitting ? "가입 중..." : "회원가입"}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-500">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="underline">
          로그인
        </Link>
      </p>
    </main>
  );
}
