"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function Nav() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-semibold">
          풀스택 서비스
        </Link>
        {!loading && (
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {user ? (
              <>
                <Link href="/weights">몸무게</Link>
                <Link href="/foods">음식</Link>
                <Link href="/calories">칼로리 추정</Link>
                <Link href="/chat">채팅</Link>
                <span className="text-zinc-500">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-zinc-500 hover:text-black dark:hover:text-white"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/login">로그인</Link>
                <Link href="/register">회원가입</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
