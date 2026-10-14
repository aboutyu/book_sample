"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">하나의 서비스로 배우는 풀스택 개발</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        몸무게와 음식 기록을 관리하고, AI로 음식 칼로리를 추정해보는 예제
        서비스입니다.
      </p>

      {!loading && (
        <div className="flex flex-wrap gap-3">
          {user ? (
            <>
              <Link
                href="/weights"
                className="rounded bg-foreground px-4 py-2 text-background"
              >
                몸무게 기록 보기
              </Link>
              <Link
                href="/foods"
                className="rounded border border-black/10 px-4 py-2 dark:border-white/20"
              >
                음식 기록 보기
              </Link>
              <Link
                href="/calories"
                className="rounded border border-black/10 px-4 py-2 dark:border-white/20"
              >
                칼로리 추정
              </Link>
              <Link
                href="/chat"
                className="rounded border border-black/10 px-4 py-2 dark:border-white/20"
              >
                채팅
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded bg-foreground px-4 py-2 text-background"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="rounded border border-black/10 px-4 py-2 dark:border-white/20"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      )}
    </main>
  );
}
