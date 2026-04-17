"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="mx-auto mt-24 max-w-xl rounded-xl border border-red-400/40 bg-red-500/10 p-6 text-red-100">
          <h1 className="mb-3 text-2xl font-bold">System Fault</h1>
          <p className="mb-4">The companion console hit an unrecoverable state.</p>
          <button
            className="rounded bg-red-400 px-3 py-2 font-semibold text-black"
            onClick={() => reset()}
          >
            Retry Boot
          </button>
        </div>
      </body>
    </html>
  );
}
