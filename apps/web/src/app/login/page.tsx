"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@example.com");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="mx-auto max-w-md rounded-xl border border-cyan-400/30 bg-zinc-900/70 p-6">
      <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          await signIn("credentials", { email, password: "demo", callbackUrl: "/app/dashboard" });
          setSubmitting(false);
        }}
      >
        <input
          className="w-full rounded bg-zinc-800 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={submitting || !email.trim()}
          className="w-full rounded bg-cyan-300 px-3 py-2 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
